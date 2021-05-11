import React from 'react';

// Components
import { PageTitle } from 'shared/view/components';
import { DefaultTheme, StyledComponent } from 'styled-components';
import Header from './Header';

// Styles
import { Container, Content, EmptyContent, Footer } from './styles';

interface DefaultPageContainer {
  title: string;
}

interface IContainer extends React.FC<DefaultPageContainer> {
  Content: StyledComponent<'div', DefaultTheme>;
  EmptyContent: StyledComponent<'div', DefaultTheme>;
  Footer: StyledComponent<'footer', DefaultTheme>;
}

const DefaultPageContainer: IContainer = (({ title, children }) => (
  <>
    <PageTitle title={title} />

    <Container>
      <Header title={title} />

      {children}
    </Container>
  </>
)) as IContainer;

DefaultPageContainer.Content = Content;
DefaultPageContainer.EmptyContent = EmptyContent;
DefaultPageContainer.Footer = Footer;

export default DefaultPageContainer;
