import { createContext } from 'react';

// Types
import { IAuth } from '../interfaces/hooks/UseAuth';
import { ITheme } from '../interfaces/hooks/UseTheme';

export const AuthorizationContext = createContext<IAuth>({
  user: null,
  loading: true,
  logged: false,
  signIn: () => null,
  signOut: () => null,
});

export const ThemeContext = createContext<ITheme>({
  changeTheme: () => null,
});
