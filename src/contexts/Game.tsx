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
import { useTheme } from './Theme';

// Services
import api from '../services/api';

// Types
import { IGameHook, IGame } from 'game';

const GameContext = createContext({});

const Game: React.FC = ({ children }) => {
  const [game, setGame] = useState<IGame | null>(null);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();
  const { changeTheme } = useTheme();

  const getGameInfo = useCallback(
    async (gameId: string) => {
      try {
        const { data: game } = await api.get(`/game/${gameId}`);

        setGame(game);
        changeTheme(game.theme);
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
    },
    [signOut, changeTheme],
  );

  const refreshGame = useCallback(() => {
    if (game) return getGameInfo(game._id);
    else return Promise.resolve();
  }, [game, getGameInfo]);

  useEffect(() => {
    const storedGame = localStorage.getItem('storedGame');
    if (!storedGame) setGame(null);
    else {
      const parsedGame = JSON.parse(storedGame);

      api.defaults.headers['X-Game-ID'] = parsedGame._id;
      setGame(parsedGame);
      changeTheme(parsedGame.theme);
      getGameInfo(parsedGame._id);
    }
    setLoading(false);
  }, [getGameInfo, changeTheme]);

  const switchGame = (game?: IGame) => {
    setLoading(true);
    if (game) {
      localStorage.setItem('storedGame', JSON.stringify(game));

      api.defaults.headers['X-Game-ID'] = game._id;
      setGame(game);
      changeTheme(game.theme);
      getGameInfo(game._id);
    } else {
      changeTheme({});
      localStorage.removeItem('storedGame');
      setGame(null);
    }

    setLoading(false);
  };

  return (
    <GameContext.Provider
      value={{
        game,
        loading,
        switchGame,
        refreshGame,
      }}
    >
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
