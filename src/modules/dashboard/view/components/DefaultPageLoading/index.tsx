import React from 'react';
import { Loading } from 'shared/view/components';

import { Container } from './styles';

const DefaultPageLoading: React.FC = () => (
  <Container>
    <Loading />
  </Container>
);

export default DefaultPageLoading;
