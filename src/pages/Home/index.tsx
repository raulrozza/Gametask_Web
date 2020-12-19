import React, { useState } from 'react';

// Components
import { PageTitle } from 'components';
import { Login, Signup } from './components';

// Styles
import { HomePage, FormToggle } from './styles';

const Home: React.FC = () => {
  const [formToggle, setFormToggle] = useState(true);

  return (
    <HomePage>
      <PageTitle />

      <div className="title">
        <h1>GAMETASK</h1>
      </div>

      <div className="container">
        <FormToggle.Container>
          <FormToggle.Button
            active={formToggle}
            onClick={() => setFormToggle(true)}
          >
            Entre
          </FormToggle.Button>

          <FormToggle.Button
            active={!formToggle}
            onClick={() => setFormToggle(false)}
          >
            Cadastre-se
          </FormToggle.Button>
        </FormToggle.Container>

        <Login shown={formToggle} />

        <Signup shown={!formToggle} />
      </div>
    </HomePage>
  );
};

export default Home;
