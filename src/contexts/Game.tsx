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

// Hooks
import { useTheme } from '../hooks/contexts/useTheme';

// Services
import api from '../services/api';

// Types
import { IGameHook, IGame } from 'game';

// Utils
import handleApiErrors from '../utils/handleApiErrors';
import isEqual from '../utils/isEqual';

const GameContext = createContext({});

const Game: React.FC = ({ children }) => {
  const [game, setGame] = useState<IGame | null>(null);
  const [verifiedGameAuthenticity, setVerifiedGameAuthenticity] = useState(
    false,
  );
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();
  const { changeTheme } = useTheme();

  const resetGame = useCallback(() => {
    changeTheme({});
    localStorage.removeItem('storedGame');
    setGame(null);
  }, [changeTheme]);

  const getGameInfo = useCallback(
    async (gameId: string) => {
      try {
        const { data } = await api.get(`/game/${gameId}`);

        localStorage.setItem('storedGame', JSON.stringify(data));

        setVerifiedGameAuthenticity(true);
        setGame(data);
        changeTheme(data.theme);
      } catch (error) {
        handleApiErrors(error, signOut);
      }
    },
    [signOut, changeTheme],
  );

  // Get the game's info
  useEffect(() => {
    // Get the local storage info
    const storedGame = localStorage.getItem('storedGame');

    if (!storedGame) resetGame();
    else {
      const parsedGame = JSON.parse(storedGame);

      if (!parsedGame) resetGame();
      else {
        // Check if the game in state is equal to the one stored in the local storage.
        // If they are, DO NOT CHANGE THE STATE because it causes infinite re-renderings
        api.defaults.headers['X-Game-ID'] = parsedGame._id;

        if (!isEqual(game, parsedGame)) {
          setGame(parsedGame);
          changeTheme(parsedGame.theme);
        }

        if (!verifiedGameAuthenticity) getGameInfo(parsedGame._id);
      }
    }

    setLoading(false);
  }, [changeTheme, resetGame, getGameInfo, verifiedGameAuthenticity, game]);

  const switchGame = (game?: IGame) => {
    setLoading(true);

    if (game) {
      localStorage.setItem('storedGame', JSON.stringify(game));

      setGame(game);
      changeTheme(game.theme);
    } else resetGame();

    setLoading(false);
  };

  const refreshGame = useCallback(() => {
    if (game) return getGameInfo(game._id);
    else return Promise.resolve();
  }, [game, getGameInfo]);

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
