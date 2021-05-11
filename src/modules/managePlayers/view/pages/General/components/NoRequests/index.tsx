import React from 'react';
import { BsController } from 'react-icons/bs';

import { Container } from './styles';

const NoRequests: React.FC = () => (
  <Container>
    <BsController />
    Não há requisições!
  </Container>
);

export default NoRequests;
