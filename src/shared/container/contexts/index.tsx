import React from 'react';
import DefaultSessionContext from 'shared/container/contexts/SessionContext/implementations/DefaultSessionContext';
import ReactToastifyToastContext from 'shared/container/contexts/ToastContext/implementations/ReactToastifyToastContext';
import StyledComponentsThemeProvider from 'shared/container/providers/ThemeProvider/implementations/StyledComponentsThemeProvider';

const AppContainer: React.FC = ({ children }) => {
  return (
    <ReactToastifyToastContext>
      <DefaultSessionContext>
        <StyledComponentsThemeProvider>
          {children}
        </StyledComponentsThemeProvider>
      </DefaultSessionContext>
    </ReactToastifyToastContext>
  );
};

export default AppContainer;
