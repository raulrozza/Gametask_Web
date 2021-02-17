import React, { useCallback, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import defaultTheme from '../../config/theme';
import { ThemeProviderContext } from '../../contexts/useThemeProvider';
import IThemeProvider from '../../models/IThemeProvider';
import { getNewPalette, setMobileThemeColor } from './helpers';

const StyledComponentsThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);

  const switchTheme = useCallback<IThemeProvider['switchTheme']>(
    async theme => {
      const newPalette = getNewPalette(theme);

      setTheme(previousTheme => ({
        typography: previousTheme.typography,
        layout: previousTheme.layout,
        palette: newPalette,
      }));

      setMobileThemeColor(theme.secondary);
    },
    [],
  );

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        switchTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeProviderContext.Provider>
  );
};

export default StyledComponentsThemeProvider;
