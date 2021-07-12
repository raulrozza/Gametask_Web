import React, { useCallback, useMemo } from 'react';

// Components
import { Button, Modal, Row } from 'shared/view/components';
import { Link } from 'react-router-dom';
import RankingSkeletons from 'modules/dashboard/view/pages/Dashboard/components/RankingSkeletons';

// Hooks
import { useModalController } from 'shared/view/components/Modal';
import useGetCurrentLeaderboardController from 'modules/dashboard/infra/controllers/useGetCurrentLeaderboardController';
import useResetLeaderboardsController from 'modules/dashboard/infra/controllers/useResetLeaderboardsController';

// Icons
import { FaFrown } from 'react-icons/fa';

// Styles
import {
  Container,
  EmptyLeaderboard,
  Footer,
  List,
  ListRank,
  ListTitle,
  ModalText,
  PlayerNameColumn,
  PointsLabel,
  PointsTitle,
  RankBox,
  RegistersBox,
  ResetButton,
} from './styles';

interface RankingProps {
  newRegisters: number;
}

const Ranking: React.FC<RankingProps> = ({ newRegisters }) => {
  const {
    leaderboard,
    loading,
    getLeaderboard,
  } = useGetCurrentLeaderboardController();
  const {
    loading: loadingReset,
    resetLeaderboards,
  } = useResetLeaderboardsController();
  const [open, openModal, closeModal] = useModalController();

  const handleResetLeaderboard = useCallback(async () => {
    const success = await resetLeaderboards();
    if (success) {
      closeModal();
      getLeaderboard();
    }
  }, [closeModal, getLeaderboard, resetLeaderboards]);

  const orderedPositions = useMemo(
    () => leaderboard?.position?.sort((a, b) => b.experience - a.experience),
    [leaderboard],
  );

  return (
    <Container>
      <List>
        <ListTitle>
          <PointsTitle>Pontuação</PointsTitle>

          <PlayerNameColumn>Jogador</PlayerNameColumn>

          {newRegisters > 0 && (
            <RegistersBox title="Novas requisições de pontuação.">
              {newRegisters}
            </RegistersBox>
          )}
        </ListTitle>

        {loading ? (
          <RankingSkeletons />
        ) : orderedPositions?.length ? (
          orderedPositions.map(({ player, experience }) => (
            <ListRank key={player.id}>
              <PointsLabel>{experience}</PointsLabel>

              <PlayerNameColumn>
                <RankBox color={player.rank.color} title={player.rank.name}>
                  {player.rank.tag}
                </RankBox>

                {player.user.firstname}
                {player.user.lastname ? ` ${player.user.lastname}` : ''}

                {player.currentTitle && (
                  <span className="title">, {player.currentTitle.name}</span>
                )}
              </PlayerNameColumn>
            </ListRank>
          ))
        ) : (
          <EmptyLeaderboard>
            Ninguém pontuou ainda
            <FaFrown />
          </EmptyLeaderboard>
        )}
      </List>

      <ResetButton onClick={openModal}>Resetar Pontuações</ResetButton>

      <Footer>
        <Link to="/manage-players">Gerenciar Jogadores</Link>
      </Footer>

      <Modal
        open={open}
        closeModal={closeModal}
        size="sm"
        title="Deseja Resetar as Pontuações?"
      >
        <ModalText>
          As pontuações de todos os jogadores ficarão zeradas e uma nova Tabela
          de Pontuação será criada. A experiência acumulada será mantida.
        </ModalText>

        <ModalText>Deseja mesmo resetar?</ModalText>

        <Row>
          <Button onClick={closeModal} outlined>
            Cancelar
          </Button>

          <Button onClick={handleResetLeaderboard} loading={loadingReset}>
            Confirmar
          </Button>
        </Row>
      </Modal>
    </Container>
  );
};

export default Ranking;
