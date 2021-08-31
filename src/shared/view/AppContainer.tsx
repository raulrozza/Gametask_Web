import React from 'react';

import DefaultSessionContext from 'shared/container/contexts/SessionContext/implementations/DefaultSessionContext';
import StyledComponentsThemeContext from 'shared/container/contexts/ThemeContext/implementations/StyledComponentsThemeContext';
import { ToastContext } from 'shared/view/contexts';

const AppContainer: React.FC = ({ children }) => (
  <ToastContext>
    <StyledComponentsThemeContext>
      <DefaultSessionContext>{children}</DefaultSessionContext>
    </StyledComponentsThemeContext>
  </ToastContext>
);

export default AppContainer;
