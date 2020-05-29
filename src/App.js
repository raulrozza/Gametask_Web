import React from 'react';
import Routes from './routes';

// Font Awesome icons import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowCircleLeft, faEdit, faFrown, faSortDown, faSortUp, faTimes } from '@fortawesome/free-solid-svg-icons'

// Styles
import './App.css';

// Font Awesome initialization
library.add(faArrowCircleLeft, faEdit, faFrown, faSortDown, faSortUp, faTimes)

function App() {
  return (
    <Routes />
  );
}

export default App;
