import React from 'react';

// Components
import { PageTitle } from 'shared/view/components';
import Header from './Header';

// Styles
import { Container } from './styles';

interface DefaultPageContainer {
  title: string;
}

const DefaultPageContainer: React.FC<DefaultPageContainer> = ({
  title,
  children,
}) => (
  <>
    <PageTitle title={title} />

    <Container>
      <Header title={title} />

      {children}
    </Container>
  </>
);

export default DefaultPageContainer;
