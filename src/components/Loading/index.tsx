import React from 'react';

// Components
import ReactLoading from 'react-loading';

// Styles
import { LoadingContainer } from './styles';
import { withTheme } from 'styled-components';

// Types
import { IThemedComponent } from 'interfaces';

const Loading: React.FC<IThemedComponent> = ({ theme }) => (
  <LoadingContainer>
    <ReactLoading type="bars" color={theme.secondary} height={32} width={32} />
  </LoadingContainer>
);

export default withTheme(Loading);
