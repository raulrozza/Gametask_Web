import React from 'react';

// Libs
import { Helmet } from 'react-helmet';

// Types
import { PageTitleProps } from './types';

const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <Helmet>
    <title>{title ? `${title} - ` : ''}GameTask</title>
  </Helmet>
);

export default PageTitle;
