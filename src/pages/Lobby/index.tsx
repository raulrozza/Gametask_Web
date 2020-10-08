import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { FaPlus, FaLink } from 'react-icons/fa';

// Contexts
import { useGame } from '../../contexts/Game';

// Components
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import GameForm from './GameForm';
import Navbar from './Navbar';
import Share from './Share';

// Hooks
import { useAuth } from '../../hooks/contexts/useAuth';

// Types
import { IGame } from 'game';

// Services
import api from '../../services/api';

// Styles
import { Container, GameCard } from './styles';
import Button from '../../styles/Button';

// Utils
import handleApiErrors from '../../utils/handleApiErrors';

const Lobby: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGameModal, setShowGameModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');

  const { signOut } = useAuth();
  const { switchGame } = useGame();

  const loadGames = useCallback(async () => {
    try {
      const { data } = await api.get('/game');

      setGames(data);
      setLoading(false);
    } catch (error) {
      handleApiErrors(error, signOut);
    }
  }, [signOut]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  if (loading) return <Loading />;

  return (
    <Container>
      <Helmet>
        <title>Lobby - GameTask</title>
      </Helmet>
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
            onSuccess={loadGames}
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
