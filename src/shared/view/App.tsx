import React from 'react';

import Routes from 'shared/infra/routes';

import AppContainer from './AppContainer';
import GlobalStyles from './GlobalStyles';

const App: React.FC = () => (
  <AppContainer>
    <Routes />

    <GlobalStyles />
  </AppContainer>
);

export default App;
