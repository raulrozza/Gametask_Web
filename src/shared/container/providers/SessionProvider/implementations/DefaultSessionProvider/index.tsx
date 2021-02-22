import React, { useCallback, useEffect, useState } from 'react';
import useHTTPProvider from 'shared/container/providers/HTTPProvider/contexts/useHTTPProvider';
import { SessionProviderContext } from 'shared/container/providers/SessionProvider/contexts/useSessionProvider';
import ISessionProvider from 'shared/container/providers/SessionProvider/models/ISessionProvider';
import useStorageProvider from 'shared/container/providers/StorageProvider/contexts/useStorageProvider';

const USER_STORAGE_KEY = '@GameTask/token';
const GAME_STORAGE_KEY = '@GameTask/game';

const USER_HEADER_KEY = 'Authentication';
const GAME_HEADER_KEY = 'x-game-id';

const DefaultSessionProvider: React.FC = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const storage = useStorageProvider();
  const http = useHTTPProvider();

  useEffect(() => {
    Promise.all([
      storage.get<string>(USER_STORAGE_KEY),
      storage.get<string>(GAME_STORAGE_KEY),
    ]).then(([token, game]) => {
      setUserToken(token);
      setSelectedGame(game);
      setLoading(false);
    });
  }, [storage]);

  const login = useCallback<ISessionProvider['login']>(
    async token => {
      setUserToken(token);
      http.addHeader(USER_HEADER_KEY, `Bearer ${token}`);

      await storage.store(USER_STORAGE_KEY, token);
    },
    [http, storage],
  );

  const logout = useCallback<ISessionProvider['logout']>(async () => {
    setUserToken(null);
    http.removeHeader(USER_HEADER_KEY);

    await storage.delete(USER_STORAGE_KEY);
    await storage.delete(GAME_STORAGE_KEY);
  }, [http, storage]);

  const switchGame = useCallback<ISessionProvider['switchGame']>(
    async gameId => {
      setSelectedGame(gameId || null);
      if (gameId) {
        http.addHeader(GAME_HEADER_KEY, gameId);
        return await storage.store(GAME_STORAGE_KEY, gameId);
      }

      http.removeHeader(GAME_HEADER_KEY);
      await storage.delete(GAME_STORAGE_KEY);
    },
    [http, storage],
  );

  return (
    <SessionProviderContext.Provider
      value={{ userToken, selectedGame, loading, login, logout, switchGame }}
    >
      {children}
    </SessionProviderContext.Provider>
  );
};

export default DefaultSessionProvider;
