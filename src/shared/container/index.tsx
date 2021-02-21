import React from 'react';
import AxiosHTTPProvider from 'shared/container/providers/HTTPProvider/implementations/AxiosHTTPProvider';
import DefaultSessionProvider from 'shared/container/providers/SessionProvider/implementations/DefaultSessionProvider';
import LocalStorageProvider from 'shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import ReactToastifyToastProvider from 'shared/container/providers/ToastProvider/implementations/ReactToastifyToastProvider';
import StyledComponentsThemeProvider from 'shared/container/providers/ThemeProvider/implementations/StyledComponentsThemeProvider';
import LandingProviders from 'modules/landing/providers';

const AppContainer: React.FC = ({ children }) => {
  return (
    <LocalStorageProvider>
      <ReactToastifyToastProvider>
        <AxiosHTTPProvider>
          <DefaultSessionProvider>
            <StyledComponentsThemeProvider>
              <LandingProviders>{children}</LandingProviders>
            </StyledComponentsThemeProvider>
          </DefaultSessionProvider>
        </AxiosHTTPProvider>
      </ReactToastifyToastProvider>
    </LocalStorageProvider>
  );
};

export default AppContainer;
