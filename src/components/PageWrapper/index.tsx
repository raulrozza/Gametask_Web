import React from 'react';

// Components
import Header from './Header';

// Libs
import { Helmet } from 'react-helmet';

// Styles
import { PageWrapperContainer } from './styles';

// Types
import { PageWrapperProps } from './types';

const PageWrapper: React.FC<PageWrapperProps> = ({ title, children }) => {
  return (
    <PageWrapperContainer>
      <Helmet>
        <title>{title} - GameTask</title>
      </Helmet>

      <div className="container">
        <Header title={title} />

        {children}
      </div>
    </PageWrapperContainer>
  );
};

export default PageWrapper;
