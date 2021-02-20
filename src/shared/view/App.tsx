import React from 'react';
import AppContainer from 'shared/container';
import Routes from 'shared/infra/routes';
import GlobalStyles from './GlobalStyles';

const App: React.FC = () => (
  <AppContainer>
    <Routes />

    <GlobalStyles />
  </AppContainer>
);

export default App;
