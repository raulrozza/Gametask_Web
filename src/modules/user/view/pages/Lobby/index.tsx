import React, { useState, useEffect } from 'react';

// Components
import { Loading, Modal, PageTitle } from 'components';
import { GameForm, Navbar, Share } from './components';

// Hooks
import { useApiFetch, useGameData } from 'hooks';

// Icons
import { FaPlus, FaLink } from 'react-icons/fa';

// Styles
import { Button } from 'styles';
import { Container, GameCard } from './styles';

// Types
import { IGame } from 'interfaces';

const Lobby: React.FC = () => {
  const [showGameModal, setShowGameModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');

  // Hooks
  const { switchGame } = useGameData();
  const { data: games, loading, fetch } = useApiFetch<IGame[]>('/game');

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading) return <Loading />;
  if (!games) return null;

  return (
    <Container>
      <PageTitle title="Lobby" />

      <Navbar />

      <section className="games-container">
        <div>
          {games.map(game => (
            <GameCard key={game._id} hasInfo={Boolean(game)}>
              <strong>{game.name}</strong>

              <img src={game.image_url} alt={game.name} />

              <span>{game.description}</span>

              <div>
                <Button outline onClick={() => switchGame(game)}>
                  Entrar
                </Button>

                <Button
                  onClick={() => {
                    setSelectedGame(game._id);
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
            onSuccess={fetch}
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
      )}
    </Container>
  );
};

export default Lobby;
