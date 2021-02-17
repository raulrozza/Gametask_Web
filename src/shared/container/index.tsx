import React from 'react';
import StyledComponentsThemeProvider from 'shared/container/providers/ThemeProvider/implementations/StyledComponentsThemeProvider';

const AppContainer: React.FC = ({ children }) => {
  return (
    <StyledComponentsThemeProvider>{children}</StyledComponentsThemeProvider>
  );
};

export default AppContainer;
