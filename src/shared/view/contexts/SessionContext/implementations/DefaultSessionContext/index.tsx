import React, { useCallback, useEffect, useMemo, useState } from 'react';

import makeHttpProvider from 'shared/domain/providers/factories/makeHttpProvider';
import makeJwtProvider from 'shared/domain/providers/factories/makeJwtProvider';
import makeStorageProvider from 'shared/domain/providers/factories/makeStorageProvider';
import ISessionContext from 'shared/domain/providers/ISessionContext';
import { useThemeContext } from 'shared/view/contexts';
import { SessionContextProvider } from 'shared/view/contexts/SessionContext/hooks/useSessionContext';

const USER_STORAGE_KEY = '@GameTask/token';
const GAME_STORAGE_KEY = '@GameTask/game';

const USER_HEADER_KEY = 'Authorization';
const GAME_HEADER_KEY = 'x-game-id';

interface IUserData {
  name: string;
  id: string;
}

const DefaultSessionContext: React.FC = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserData>({} as IUserData);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const theme = useThemeContext();

  const storage = useMemo(() => makeStorageProvider(), []);
  const http = useMemo(() => makeHttpProvider(), []);
  const jwt = useMemo(() => makeJwtProvider(), []);

  const addAuthenticationHeader = useCallback(
    (token: string) => http.addHeader(USER_HEADER_KEY, `Bearer ${token}`),
    [http],
  );

  const decodeToken = useCallback(
    (token: string) => jwt.decode<IUserData>(token),
    [jwt],
  );

  useEffect(() => {
    Promise.all([
      storage.get<string>(USER_STORAGE_KEY),
      storage.get<string>(GAME_STORAGE_KEY),
    ]).then(async ([token, game]) => {
      const userData = await decodeToken(String(token));
      if (userData) setUserData(userData);

      setUserToken(token);
      setSelectedGame(game);
      if (token) addAuthenticationHeader(token);
      if (game) http.addHeader(GAME_HEADER_KEY, game);
      setLoading(false);
    });
  }, [addAuthenticationHeader, decodeToken, http, storage]);

  const login = useCallback<ISessionContext['login']>(
    async token => {
      const userData = await decodeToken(String(token));
      if (userData) setUserData(userData);

      setUserToken(token);
      addAuthenticationHeader(token);

      await storage.store(USER_STORAGE_KEY, token);
    },
    [addAuthenticationHeader, decodeToken, storage],
  );

  const logout = useCallback<ISessionContext['logout']>(async () => {
    setUserToken(null);
    setSelectedGame(null);
    http.removeHeader(USER_HEADER_KEY);

    await storage.delete(USER_STORAGE_KEY);
    await storage.delete(GAME_STORAGE_KEY);
    await theme.switchTheme();
  }, [http, storage, theme]);

  const switchGame = useCallback<ISessionContext['switchGame']>(
    async (gameId, newTheme) => {
      setSelectedGame(gameId || null);
      if (gameId) {
        http.addHeader(GAME_HEADER_KEY, gameId);
        if (newTheme) await theme.switchTheme(newTheme);
        await storage.store(GAME_STORAGE_KEY, gameId);
        return;
      }

      http.removeHeader(GAME_HEADER_KEY);
      await storage.delete(GAME_STORAGE_KEY);
      await theme.switchTheme();
    },
    [http, storage, theme],
  );

  return (
    <SessionContextProvider.Provider
      value={{
        userToken,
        userData,
        selectedGame,
        loading,
        login,
        logout,
        switchGame,
      }}
    >
      {children}
    </SessionContextProvider.Provider>
  );
};

export default DefaultSessionContext;
