import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FaFrown } from 'react-icons/fa';

// Styles
import { Container } from './styles';

// Types
import { NotFoundProps } from './types';

// This is the default Not Found component, showing a sad face and a custom message
const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  return (
    <Container>
      <Helmet>
        <title>Página não encontrada - GameTask</title>
      </Helmet>
      <div>
        <FaFrown />
        <h1>{message}</h1>
      </div>
    </Container>
  );
};

NotFound.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NotFound;
