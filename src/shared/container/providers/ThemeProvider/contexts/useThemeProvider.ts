import { createContext, useContext } from 'react';
import IThemeProvider from 'shared/container/providers/ThemeProvider/models/IThemeProvider';

export const ThemeProviderContext = createContext<IThemeProvider>(
  {} as IThemeProvider,
);

const useThemeProvider = (): IThemeProvider => {
  const themeProvider = useContext(ThemeProviderContext);

  if (!themeProvider)
    throw new Error(
      'useThemeProvider should be called inside a ThemeProviderContext',
    );

  return themeProvider;
};

export default useThemeProvider;
