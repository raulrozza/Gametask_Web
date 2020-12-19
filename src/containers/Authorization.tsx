import React, { useEffect, useState, useCallback, memo } from 'react';

// Contexts
import { AuthorizationContext } from 'contexts';

// Hooks
import { useTheme } from 'hooks';

// Services
import { api, storage } from 'services';

// Types
import { IUser } from 'interfaces';

const Authorization: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { changeTheme } = useTheme();

  // States management
  const [user, setUser] = useState<IUser | null>(null);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storedUser = await storage.get<IUser>('loggedUser');

      if (!storedUser) setLogged(false);
      else {
        api.addApiHeader('Authorization', `Bearer ${storedUser.token}`);
        setUser(storedUser);
        setLogged(true);
      }
      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (user: IUser) => {
    await storage.save('loggedUser', user);
    api.addApiHeader('Authorization', `Bearer ${user.token}`);
    setUser(user);
    setLogged(true);
  }, []);

  const signOut = useCallback(async () => {
    await storage.clear();
    setUser(null);
    setLogged(false);
    changeTheme({});
  }, [changeTheme]);

  return (
    <AuthorizationContext.Provider
      value={{ user, logged, loading, signIn, signOut }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

export default memo(Authorization);
