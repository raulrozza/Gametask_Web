import React, { useCallback, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import defaultTheme from 'config/theme';
import { getNewPalette, setMobileThemeColor } from './helpers';
import IThemeContext from 'shared/container/contexts/ThemeContext/models/IThemeContext';
import { ThemeContextProvider } from 'shared/container/contexts/ThemeContext/contexts/useThemeContext';

const StyledComponentsThemeContext: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);

  const switchTheme = useCallback<IThemeContext['switchTheme']>(async theme => {
    const newPalette = getNewPalette(theme);

    setTheme(previousTheme => ({
      typography: previousTheme.typography,
      layout: previousTheme.layout,
      palette: newPalette,
    }));

    setMobileThemeColor(theme.secondary);
  }, []);

  return (
    <ThemeContextProvider.Provider
      value={{
        theme,
        switchTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContextProvider.Provider>
  );
};

export default StyledComponentsThemeContext;
