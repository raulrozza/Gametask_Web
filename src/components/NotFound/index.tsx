import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FaFrown } from 'react-icons/fa';

// Styles
import './styles.css';

interface NotFoundProps {
  message: React.ReactNode;
}

// This is the default Not Found component, showing a sad face and a custom message
const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  return (
    <div id="not-found-container">
      <Helmet>
        <title>Página não encontrada</title>
      </Helmet>
      <div>
        <FaFrown />
        <h1>{message}</h1>
      </div>
    </div>
  );
};

NotFound.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NotFound;
