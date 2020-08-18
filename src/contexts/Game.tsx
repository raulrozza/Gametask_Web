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
// import setTheme from '../utils/setTheme';

// Types
import { IGameHook, IGame } from 'game';

function isEqual(object1: IGame | null, object2: IGame | null) {
  if ((object1 && !object2) || (!object1 && object2)) return false;

  if (typeof object1 !== 'object' || typeof object2 !== 'object') return false;

  if (object1 && object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) return false;

    const values1 = Object.values(object1);
    const values2 = Object.values(object2);

    for (const index in keys1) {
      if (keys1[index] !== keys2[index]) return false;

      if (
        typeof values1[index] !== 'object' &&
        typeof values2[index] !== 'object'
      ) {
        if (values1[index] !== values2[index]) return false;
      } else {
        if (!isEqual(values1[index], values2[index])) return false;
      }
    }
  }

  return true;
}

const GameContext = createContext({});

const Game: React.FC = ({ children }) => {
  const [game, setGame] = useState<IGame | null>(null);
  const [verifiedGameAuthenticity, setVerifyGameAuthenticity] = useState(false);
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

        setVerifyGameAuthenticity(true);
        setGame(data);
        changeTheme(data.theme);
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
