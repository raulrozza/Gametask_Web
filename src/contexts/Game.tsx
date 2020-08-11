import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

// Contexts
import { useAuth } from './Authorization';

import api from '../services/api';
import setTheme from '../utils/setTheme';
import { IGameHook, IGame } from 'game';

const GameContext = createContext({});

const Game: React.FC = ({ children }) => {
  const [game, setGame] = useState<IGame | null>(null);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();

  const getGameInfo = useCallback(async (gameId: string) => {
    try {
      const { data: game } = await api.get(`/game/${gameId}`);

      setGame(game);
      setTheme(game.theme);
      setLoading(false);
      localStorage.setItem('storedGame', JSON.stringify(game));
    } catch (error) {
      console.error(error);
      if (!error.response) return;
      const {
        response: { data },
      } = error;

      if (data.error === 'TokenExpiredError: jwt expired') {
        signOut();
      }
    }
  }, []);

  useEffect(() => {
    const storedGame = localStorage.getItem('storedGame');
    if (!storedGame) setGame(null);
    else {
      const parsedGame = JSON.parse(storedGame);

      api.defaults.headers['X-Game-ID'] = parsedGame._id;
      setGame(parsedGame);
      setTheme(parsedGame.theme);
      getGameInfo(parsedGame._id);
    }
    setLoading(false);
  }, []);

  const switchGame = (game?: IGame) => {
    setLoading(true);
    if (game) {
      localStorage.setItem('storedGame', JSON.stringify(game));

      api.defaults.headers['X-Game-ID'] = game._id;
      setGame(game);
      setTheme(game.theme);
      getGameInfo(game._id);
    } else {
      setTheme();
      localStorage.removeItem('storedGame');
      setGame(null);
    }

    setLoading(false);
  };

  return (
    <GameContext.Provider value={{ game, loading, switchGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame: () => IGameHook = () => {
  const game = useContext(GameContext) as IGameHook;

  return game;
};

Game.propTypes = {
  children: PropTypes.node,
};

export default Game;
