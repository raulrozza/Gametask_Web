import React, { useCallback, useState } from 'react';

// Components
import { Loading, PageTitle } from 'shared/view/components';
import { AddGameCard, GameCard, GameForm, Navbar, Share } from './components';
import Modal, { useModalController } from 'shared/view/components/Modal';

// Hooks
import useLobbyController from 'modules/user/infra/controllers/useLobbyController';

// Styles
import { Container, GamesContainer } from './styles';

const Lobby: React.FC = () => {
  const [
    openGameModal,
    handleOpenGameModal,
    handleCloseGameModal,
  ] = useModalController();
  const [
    openShareModal,
    handleOpenShareModal,
    handleCloseShareModal,
  ] = useModalController();
  const [selectedGame, setSelectedGame] = useState('');

  const { loading, games, fetchGames } = useLobbyController();

  const onShareClick = useCallback(
    (id: string) => {
      setSelectedGame(id);
      handleOpenShareModal();
    },
    [handleOpenShareModal],
  );

  if (loading) return <Loading />;

  return (
    <Container>
      <PageTitle title="Lobby" />

      <Navbar />

      <GamesContainer>
        <div>
          {games.map(game => (
            <GameCard key={game.id} {...game} onShareClick={onShareClick} />
          ))}

          <AddGameCard onClick={handleOpenGameModal} />
        </div>
      </GamesContainer>

      <Modal
        title="Criar Jogo"
        size="sm"
        open={openGameModal}
        closeModal={handleCloseGameModal}
      >
        <GameForm onSuccess={fetchGames} closeModal={handleCloseGameModal} />
      </Modal>

      <Modal
        title="Compartilhar"
        size="sm"
        open={openShareModal}
        closeModal={handleCloseShareModal}
      >
        <Share gameId={selectedGame} />
      </Modal>
    </Container>
  );
};

export default Lobby;
