import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  memo,
} from 'react';

// Hooks
import { useTheme } from '../hooks/contexts/useTheme';

// Services
import api from '../services/api';

// Tyoes
import { IUser, IAuth } from 'authorization';

const AuthorizationContext = createContext({});

const Authorization: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { changeTheme } = useTheme();

  // States management
  const [user, setUser] = useState<IUser>({} as IUser);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    if (!storedUser) setLogged(false);
    else {
      const parsedUser = JSON.parse(storedUser);

      api.defaults.headers.Authorization = `Bearer ${parsedUser.token}`;
      setUser(parsedUser);
      setLogged(true);
    }
    setLoading(false);
  }, []);

  const signIn = useCallback((user: IUser) => {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    api.defaults.headers.Authorization = `Bearer ${user.token}`;
    setUser(user);
    setLogged(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    setUser({} as IUser);
    changeTheme({});
    setLogged(false);
  }, [changeTheme]);

  return (
    <AuthorizationContext.Provider
      value={{ user, logged, loading, signIn, signOut }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuth: () => IAuth = () => {
  const auth = useContext(AuthorizationContext) as IAuth;

  return auth;
};

export default memo(Authorization);
