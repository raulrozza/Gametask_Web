import React from 'react';
import StyledComponentsThemeProvider from 'shared/container/providers/ThemeProvider/implementations/StyledComponentsThemeProvider';
import AxiosHTTPProvider from 'shared/container/providers/HTTPProvider/implementations/AxiosHTTPProvider';
import LocalStorageProvider from 'shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import DefaultSessionProvider from 'shared/container/providers/SessionProvider/implementations/DefaultSessionProvider';

const AppContainer: React.FC = ({ children }) => {
  return (
    <LocalStorageProvider>
      <AxiosHTTPProvider>
        <DefaultSessionProvider>
          <StyledComponentsThemeProvider>
            {children}
          </StyledComponentsThemeProvider>
        </DefaultSessionProvider>
      </AxiosHTTPProvider>
    </LocalStorageProvider>
  );
};

export default AppContainer;
