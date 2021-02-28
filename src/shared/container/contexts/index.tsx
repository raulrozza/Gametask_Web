import React from 'react';
import DefaultSessionContext from 'shared/container/contexts/SessionContext/implementations/DefaultSessionContext';
import ReactToastifyToastContext from 'shared/container/contexts/ToastContext/implementations/ReactToastifyToastContext';
import StyledComponentsThemeContext from 'shared/container/contexts/ThemeContext/implementations/StyledComponentsThemeContext';

const AppContainer: React.FC = ({ children }) => {
  return (
    <ReactToastifyToastContext>
      <StyledComponentsThemeContext>
        <DefaultSessionContext>{children}</DefaultSessionContext>
      </StyledComponentsThemeContext>
    </ReactToastifyToastContext>
  );
};

export default AppContainer;
