import React from 'react';
import Routes from './routes/index.routes';

// Components
import { ToastContainer, Slide } from 'react-toastify';

// Contexts
import Authorization from './containers/Authorization';

import 'react-toastify/dist/ReactToastify.min.css';

const App: React.FC = () => {
  return (
    <>
      <Authorization>
        <Routes />
      </Authorization>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        transition={Slide}
        pauseOnHover={false}
        limit={3}
      />
    </>
  );
};

export default App;
