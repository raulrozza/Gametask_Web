import { createContext } from 'react';

// Types
import { ITheme } from '../interfaces/hooks/UseTheme';

export const ThemeContext = createContext<ITheme>({
  changeTheme: () => null,
});
