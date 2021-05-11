import React from 'react';

// Libs
import { Helmet } from 'react-helmet';

interface PageTitleProps {
  title?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <Helmet>
    <title>{title ? `${title} - ` : ''}GameTask</title>
  </Helmet>
);

export default PageTitle;
