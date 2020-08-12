import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaPlus } from 'react-icons/fa';

// Components
import Loading from '../../components/Loading';
import Navbar from './Navbar';

// Types
import { IGame } from 'game';

// services
import api from '../../services/api';

// Styles
import { Container, GameCard } from './styles';

const Lobby: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/game');

        setGames(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
              <h1>{game.name}</h1>
            </GameCard>
          ))}

          <GameCard>
            <button type="button">
              <FaPlus />
              <span>Criar Jogo</span>
            </button>
          </GameCard>
        </div>
      </section>
    </Container>
  );
};

export default Lobby;
