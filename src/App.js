import React from 'react';
import Routes from './routes/index.routes';

// Contexts
import Authorization from './contexts/Authorization';

// Styles
import './App.css';

function App() {
  return (
    <Authorization>
      <Routes />
    </Authorization>
  );
}

export default App;
