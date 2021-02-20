import React from 'react';

// Components
import ReactLoading from 'react-loading';
import useThemeProvider from 'shared/container/providers/ThemeProvider/contexts/useThemeProvider';

// Styles
import { LoadingContainer } from './styles';

const Loading: React.FC = () => {
  const { theme } = useThemeProvider();

  return (
    <LoadingContainer>
      <ReactLoading
        type="bars"
        color={theme.palette.secondary.main}
        height={32}
        width={32}
      />
    </LoadingContainer>
  );
};

export default Loading;
