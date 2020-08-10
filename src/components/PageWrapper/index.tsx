import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// Font Awesome
import { FaArrowCircleLeft } from 'react-icons/fa';

import './styles.css';

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, children }) => {
  return (
    <main className="page-wrapper">
      <Helmet>
        <title>{title} - GameTask</title>
      </Helmet>
      <div className="container">
        <header className="page-nav">
          <Link to="/dashboard" title="Voltar">
            <FaArrowCircleLeft />
          </Link>
          <h1>{title}</h1>
        </header>
        {children}
      </div>
    </main>
  );
};

PageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default PageWrapper;
