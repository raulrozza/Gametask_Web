import React from 'react';
import StyledComponentsThemeProvider from 'shared/container/providers/ThemeProvider/implementations/StyledComponentsThemeProvider';
import AxiosHTTPProvider from 'shared/container/providers/HTTPProvider/implementations/AxiosHTTPProvider';

const AppContainer: React.FC = ({ children }) => {
  return (
    <AxiosHTTPProvider>
      <StyledComponentsThemeProvider>{children}</StyledComponentsThemeProvider>
    </AxiosHTTPProvider>
  );
};

export default AppContainer;
