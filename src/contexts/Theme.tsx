import React, { useState, useCallback } from 'react';

// Config
import { defaultTheme } from '../config/defaultTheme';

// Contexts
import { ThemeContext } from './rawContexts';

// Libs
import { DefaultTheme, ThemeProvider } from 'styled-components';

// Styles
import Global from '../styles/Global';

// Types
import { ChangeThemeProps } from '../interfaces/hooks/UseTheme';

// Utils
import { fillTheme } from '../utils/theme/fillTheme';
import setMobileThemeColor from '../utils/theme/setMobileThemeColor';

const Theme: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);

  const changeTheme = useCallback(
    ({ primary, secondary }: ChangeThemeProps) => {
      let newTheme = defaultTheme;

      if (primary && secondary) {
        newTheme = {
          ...fillTheme('primary', primary),
          ...fillTheme('secondary', secondary),
        };
      }

      setTheme(newTheme);

      setMobileThemeColor(newTheme.secondary);
    },
    [],
  );

  return (
    <ThemeContext.Provider value={{ changeTheme }}>
      <ThemeProvider theme={theme}>
        <>
          {children}
          <Global />
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Theme;
