import React from 'react';

import DefaultSessionContext from 'shared/container/contexts/SessionContext/implementations/DefaultSessionContext';
import { ThemeContext, ToastContext } from 'shared/view/contexts';

const AppContainer: React.FC = ({ children }) => (
  <ToastContext>
    <ThemeContext>
      <DefaultSessionContext>{children}</DefaultSessionContext>
    </ThemeContext>
  </ToastContext>
);

export default AppContainer;
