import React from 'react';
import StyledComponentsThemeProvider from 'shared/container/providers/ThemeProvider/implementations/StyledComponentsThemeProvider';
import AxiosHTTPProvider from 'shared/container/providers/HTTPProvider/implementations/AxiosHTTPProvider';
import LocalStorageProvider from 'shared/container/providers/StorageProvider/implementations/LocalStorageProvider';

const AppContainer: React.FC = ({ children }) => {
  return (
    <LocalStorageProvider>
      <AxiosHTTPProvider>
        <StyledComponentsThemeProvider>
          {children}
        </StyledComponentsThemeProvider>
      </AxiosHTTPProvider>
    </LocalStorageProvider>
  );
};

export default AppContainer;
