import React from 'react';

// Libs
import { Helmet } from 'react-helmet';

// Icons
import { FaFrown } from 'react-icons/fa';

// Styles
import { Container } from './styles';

// Types
import { NotFoundProps } from './types';

const NotFound: React.FC<NotFoundProps> = ({ message }) => (
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

export default NotFound;
