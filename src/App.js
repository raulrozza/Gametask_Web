import React from 'react';
import Routes from './routes';

// Font Awesome icons import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFrown, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

// Styles
import './App.css';

// Font Awesome initialization
library.add(faFrown, faSortDown, faSortUp)

function App() {
  return (
    <Routes />
  );
}

export default App;
