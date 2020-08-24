import React from 'react';
import Routes from './routes/index.routes';

// Contexts
import Authorization from './contexts/Authorization';
import Theme from './contexts/Theme';

const App: React.FC = () => {
  return (
    <Theme>
      <Authorization>
        <Routes />
      </Authorization>
    </Theme>
  );
};

export default App;
