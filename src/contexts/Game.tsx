import React, { useEffect, useState, useCallback } from 'react';

// Contexts
import { GameContext } from './rawContexts';

// Hooks
import { useAuth } from '../hooks/contexts/useAuth';
import { useTheme } from '../hooks/contexts/useTheme';

// Services
import api, { addApiHeader, removeApiHeader } from '../services/api';
import { getData, removeData, saveData } from '../services/storage';

// Types
import { IGame } from '../interfaces/api/Game';

// Utils
import handleApiErrors from '../utils/handleApiErrors';
import isEqual from '../utils/isEqual';

const Game: React.FC = ({ children }) => {
  const [game, setGame] = useState<IGame | null>(null);
  const [verifiedGameAuthenticity, setVerifiedGameAuthenticity] = useState(
    false,
  );
  const [loading, setLoading] = useState(true);

  const { signOut } = useAuth();
  const { changeTheme } = useTheme();

  const resetGame = useCallback(async () => {
    changeTheme({});
    await removeData('storedGame');
    setGame(null);
    removeApiHeader('X-Game-ID');
  }, [changeTheme]);

  const getGameInfo = useCallback(
    async (gameId: string) => {
      try {
        const { data } = await api.get(`/game/${gameId}`);

        await saveData('storedGame', data);

        setVerifiedGameAuthenticity(true);
        setGame(data);
        changeTheme(data.theme);
      } catch (error) {
        handleApiErrors(error, signOut);
      }
    },
    [signOut, changeTheme],
  );

  useEffect(() => {
    (async () => {
      // Get the local storage info
      const storedGame = await getData<IGame>('storedGame');

      if (!storedGame) resetGame();
      else {
        // Check if the game in state is equal to the one stored in the local storage.
        // If they are, DO NOT CHANGE THE STATE because it causes infinite re-renderings
        addApiHeader('X-Game-ID', storedGame._id);

        if (!isEqual(game, storedGame)) {
          setGame(storedGame);
          changeTheme(storedGame.theme);
        }

        if (!verifiedGameAuthenticity) getGameInfo(storedGame._id);
      }

      setLoading(false);
    })();
  }, [changeTheme, resetGame, getGameInfo, verifiedGameAuthenticity, game]);

  const switchGame = useCallback(
    async (game?: IGame) => {
      setLoading(true);

      if (game) {
        await saveData('storedGame', game);

        setGame(game);
        changeTheme(game.theme);
      } else resetGame();

      setVerifiedGameAuthenticity(false);
      setLoading(false);
    },
    [changeTheme, resetGame],
  );

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

export default Game;
