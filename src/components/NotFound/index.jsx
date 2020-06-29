import React from 'react';
import {Helmet} from 'react-helmet';
import { FaFrown } from 'react-icons/fa';

// Styles
import './styles.css'

// This is the default Not Found component, showing a sad face and a custom message
const NotFound = ({ message }) => {
  return(
    <div id="not-found-container">
      <Helmet>
        <title>Página não encontrada</title>
      </Helmet>
      <div>
        <FaFrown />
        <h1>{message}</h1>
      </div>
    </div>
  )
}

export default NotFound;
