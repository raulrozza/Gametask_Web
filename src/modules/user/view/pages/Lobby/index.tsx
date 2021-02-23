import React, { useState } from 'react';

// Components
import { Loading, PageTitle } from 'shared/view/components';
import { AddGameCard, GameForm, Navbar, Share } from './components';
import Modal, { useModalController } from 'shared/view/components/Modal';

// Hooks
import useLobbyController from 'modules/user/infra/controllers/useLobbyController';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

// Icons
import { FaPlus, FaLink } from 'react-icons/fa';

// Styles
import { Container, GameCard, GamesContainer } from './styles';

const Lobby: React.FC = () => {
  const [
    openGameModal,
    handleOpenGameModal,
    handleCloseGameModal,
  ] = useModalController();
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');

  // Hooks
  const { loading, games, fetchGames } = useLobbyController();
  const { switchGame } = useSessionContext();

  if (loading) return <Loading />;

  return (
    <Container>
      <PageTitle title="Lobby" />

      <Navbar />

      <GamesContainer>
        <div>
          {games.map(game => (
            <GameCard key={game.id} hasInfo={Boolean(game)}>
              <strong>{game.name}</strong>

              <img src={game.image_url} alt={game.name} />

              <span>{game.description}</span>

              {/* <div>
                <Button outline onClick={() => switchGame(game.id)}>
                  Entrar
                </Button>

                <Button
                  onClick={() => {
                    setSelectedGame(game.id);
                    setShowShareModal(true);
                  }}
                >
                  <FaLink />
                </Button>
              </div> */}
            </GameCard>
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

      {/*  {showShareModal && (
        <Modal
          title="Compartilhar"
          size="sm"
          closeModal={() => setShowShareModal(false)}
        >
          <Share gameId={selectedGame} />
        </Modal>
      )} */}
    </Container>
  );
};

export default Lobby;
