import { useContext } from 'react';

// Context
import { ThemeContext } from 'contexts';

// Types
import { ITheme } from 'interfaces';

export const useTheme: () => ITheme = () => {
  const theme = useContext(ThemeContext);

  return theme;
};
