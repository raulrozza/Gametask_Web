import React, { useCallback, useEffect, useState } from 'react';
import { SessionProviderContext } from 'shared/container/providers/SessionProvider/contexts/useSessionProvider';
import ISessionProvider from 'shared/container/providers/SessionProvider/models/ISessionProvider';
import useStorageProvider from 'shared/container/providers/StorageProvider/contexts/useStorageProvider';

const USER_STORAGE_KEY = '@GameTask/user';
const GAME_STORAGE_KEY = '@GameTask/game';

const DefaultSessionProvider: React.FC = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const storage = useStorageProvider();

  useEffect(() => {
    Promise.all([
      storage.get<string>(USER_STORAGE_KEY),
      storage.get<string>(GAME_STORAGE_KEY),
    ]).then(([user, game]) => {
      setLoggedUser(user);
      setSelectedGame(game);
      setLoading(false);
    });
  }, [storage]);

  const login = useCallback<ISessionProvider['login']>(
    async userId => {
      setLoggedUser(userId);
      await storage.store(USER_STORAGE_KEY, userId);
    },
    [storage],
  );

  const logout = useCallback<ISessionProvider['logout']>(async () => {
    setLoggedUser(null);
    await storage.clear();
  }, [storage]);

  const switchGame = useCallback<ISessionProvider['switchGame']>(
    async gameId => {
      setSelectedGame(gameId || null);
      if (gameId) await storage.store(GAME_STORAGE_KEY, gameId);
      else await storage.delete(GAME_STORAGE_KEY);
    },
    [storage],
  );

  return (
    <SessionProviderContext.Provider
      value={{ loggedUser, selectedGame, loading, login, logout, switchGame }}
    >
      {children}
    </SessionProviderContext.Provider>
  );
};

export default DefaultSessionProvider;
