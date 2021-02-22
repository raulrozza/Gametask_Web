import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ISessionContext from 'shared/container/contexts/SessionContext/models/ISessionContext';
import { SessionContextProvider } from 'shared/container/contexts/SessionContext/contexts/useSessionContext';
import {
  makeHttpProvider,
  makeStorageProvider,
} from 'shared/container/providers';

const USER_STORAGE_KEY = '@GameTask/token';
const GAME_STORAGE_KEY = '@GameTask/game';

const USER_HEADER_KEY = 'Authentication';
const GAME_HEADER_KEY = 'x-game-id';

const DefaultSessionContext: React.FC = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const storage = useMemo(() => makeStorageProvider(), []);
  const http = useMemo(() => makeHttpProvider(), []);

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

  const login = useCallback<ISessionContext['login']>(
    async token => {
      setUserToken(token);
      http.addHeader(USER_HEADER_KEY, `Bearer ${token}`);

      await storage.store(USER_STORAGE_KEY, token);
    },
    [http, storage],
  );

  const logout = useCallback<ISessionContext['logout']>(async () => {
    setUserToken(null);
    http.removeHeader(USER_HEADER_KEY);

    await storage.delete(USER_STORAGE_KEY);
    await storage.delete(GAME_STORAGE_KEY);
  }, [http, storage]);

  const switchGame = useCallback<ISessionContext['switchGame']>(
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
    <SessionContextProvider.Provider
      value={{ userToken, selectedGame, loading, login, logout, switchGame }}
    >
      {children}
    </SessionContextProvider.Provider>
  );
};

export default DefaultSessionContext;
