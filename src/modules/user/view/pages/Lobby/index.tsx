import React, { useEffect, useState } from 'react';

// Components
import { Loading, PageTitle } from 'shared/view/components';
import { GameForm, Navbar, Share } from './components';

// Hooks
import useLobbyController from 'modules/user/infra/controllers/useLobbyController';
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

// Icons
import { FaPlus, FaLink } from 'react-icons/fa';

// Styles
import { Container, GameCard } from './styles';

const Lobby: React.FC = () => {
  const [showGameModal, setShowGameModal] = useState(false);
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

      {/*  <section className="games-container">
        <div>
          {games.map(game => (
            <GameCard key={game.id} hasInfo={Boolean(game)}>
              <strong>{game.name}</strong>

              <img src={game.image_url} alt={game.name} />

              <span>{game.description}</span>

              <div>
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
              </div>
            </GameCard>
          ))}

          <GameCard>
            <button type="button" onClick={() => setShowGameModal(true)}>
              <FaPlus />

              <span>Criar Jogo</span>
            </button>
          </GameCard>
        </div>
      </section>

      {showGameModal && (
        <Modal
          title="Criar Jogo"
          size="sm"
          closeModal={() => setShowGameModal(false)}
        >
          <GameForm
            onSuccess={fetchGames}
            closeModal={() => setShowGameModal(false)}
          />
        </Modal>
      )}

      {showShareModal && (
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
