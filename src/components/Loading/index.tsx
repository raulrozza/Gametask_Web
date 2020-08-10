import React from 'react';

// React Loading component
import ReactLoading from 'react-loading';

import './styles.css';

// This is the component displayed when something is loading.
const Loading: React.FC = () => (
  <div className="loading-container">
    <ReactLoading type="bars" color="var(--secondary)" height={32} width={32} />
  </div>
);

export default Loading;
