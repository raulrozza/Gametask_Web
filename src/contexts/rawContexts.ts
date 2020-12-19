import { createContext } from 'react';

// Types
import { IAuth } from 'interfaces/hooks/UseAuth';
import { IGameData } from 'interfaces/hooks/UseGameData';
import { ITheme } from 'interfaces/hooks/UseTheme';

export const AuthorizationContext = createContext<IAuth>({
  user: null,
  loading: true,
  logged: false,
  signIn: () => null,
  signOut: () => null,
});

export const GameContext = createContext<IGameData>({
  game: null,
  loading: true,
  switchGame: () => null,
  refreshGame: async () => undefined,
});

export const ThemeContext = createContext<ITheme>({
  changeTheme: () => null,
});
