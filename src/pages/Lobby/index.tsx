import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { FaPlus } from 'react-icons/fa';

// Contexts
import { useAuth } from '../../contexts/Authorization';
import { useGame } from '../../contexts/Game';

// Components
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import Navbar from './Navbar';

// Types
import { IGame } from 'game';

// services
import api from '../../services/api';

// Styles
import { Container, GameCard } from './styles';
import Button from '../../styles/Button';
import GameForm from './GameForm';

// Utils
import handleErrors from '../../utils/handleErrors';

const Lobby: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { signOut } = useAuth();
  const { switchGame } = useGame();

  const loadGames = useCallback(async () => {
    try {
      const { data } = await api.get('/game');

      setGames(data);
      setLoading(false);
    } catch (error) {
      handleErrors(error, signOut);
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

              <Button outline onClick={() => switchGame(game)}>
                Entrar
              </Button>
            </GameCard>
          ))}

          <GameCard>
            <button type="button" onClick={() => setShowModal(true)}>
              <FaPlus />
              <span>Criar Jogo</span>
            </button>
          </GameCard>
        </div>
      </section>
      {showModal && (
        <Modal
          title="Criar Jogo"
          size="sm"
          closeModal={() => setShowModal(false)}
        >
          <GameForm
            onSuccess={loadGames}
            closeModal={() => setShowModal(false)}
          />
        </Modal>
      )}
    </Container>
  );
};

export default Lobby;
