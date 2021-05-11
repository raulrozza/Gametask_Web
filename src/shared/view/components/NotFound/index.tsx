import React, { ReactNode } from 'react';

// Libs
import { Helmet } from 'react-helmet';

// Icons
import { FaFrown } from 'react-icons/fa';

// Styles
import { Container, Wrapper } from './styles';

interface NotFoundProps {
  /**
   * @param message
   * The message to be displayed on the page. It can contain react elements, but it's not recommended to include many HTML blocks
   */
  message: ReactNode;
}

const NotFound: React.FC<NotFoundProps> = ({ message }) => (
  <Container>
    <Helmet>
      <title>Página não encontrada - GameTask</title>
    </Helmet>

    <Wrapper>
      <FaFrown />

      <h1>{message}</h1>
    </Wrapper>
  </Container>
);

export default NotFound;
