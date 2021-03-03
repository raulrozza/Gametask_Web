import React from 'react';

// Components
import { Link } from 'react-router-dom';
import RankingSkeletons from 'modules/dashboard/view/pages/Dashboard/components/RankingSkeletons';

// Hooks
import useGetCurrentLeaderboardController from 'modules/dashboard/infra/controllers/useGetCurrentLeaderboardController';

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
  PlayerNameColumn,
  PointsLabel,
  PointsTitle,
  RankBox,
  RegistersBox,
} from './styles';

interface RankingProps {
  newRegisters: number;
}

const Ranking: React.FC<RankingProps> = ({ newRegisters }) => {
  const { leaderboard, loading } = useGetCurrentLeaderboardController();

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
        ) : leaderboard?.position?.length === 0 ? (
          leaderboard?.position.map(({ player, experience }) => (
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

      <Footer>
        <Link to="/players">Gerenciar Jogadores</Link>
      </Footer>
    </Container>
  );
};

export default Ranking;
