import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

// React Loading component
import ReactLoading from 'react-loading';

// Styles
import { LoadingContainer } from './styles';

// Types
import { LoadingProps } from './types';

// This is the component displayed when something is loading.
const Loading: React.FC<LoadingProps> = ({ theme }) => (
  <LoadingContainer>
    <ReactLoading type="bars" color={theme.secondary} height={32} width={32} />
  </LoadingContainer>
);

Loading.propTypes = {
  theme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    primaryTransparent: PropTypes.string.isRequired,
    primaryContrast: PropTypes.string.isRequired,
    primaryLowShade: PropTypes.string.isRequired,
    primaryShade: PropTypes.string.isRequired,
    primaryIntense: PropTypes.string.isRequired,
    primaryExtraIntense: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
    secondaryTransparent: PropTypes.string.isRequired,
    secondaryContrast: PropTypes.string.isRequired,
    secondaryLowShade: PropTypes.string.isRequired,
    secondaryShade: PropTypes.string.isRequired,
    secondaryIntense: PropTypes.string.isRequired,
    secondaryExtraIntense: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTheme(Loading);
