import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';

const PageWrapper = ({ title, children }) => {
    return (
        <main className="page-wrapper">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="container">
                <header className="page-nav">
                    <Link to="/dashboard" title="Voltar">
                        <FontAwesomeIcon icon="arrow-circle-left" />
                    </Link>
                    <h1>{title}</h1>
                </header>
                {children}
            </div>
        </main>
    )
};

PageWrapper.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
}

export default PageWrapper;