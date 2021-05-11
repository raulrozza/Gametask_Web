import React, { useState } from 'react';

// Components
import { PageTitle } from 'shared/view/components';
import { Login, Signup } from './components';

// Styles
import { Container, FormToggle, FormWrapper, GameTaskTitle } from './styles';

const Home: React.FC = () => {
  const [formToggle, setFormToggle] = useState(true);

  return (
    <Container>
      <PageTitle />

      <GameTaskTitle>
        <h1>GAMETASK</h1>
      </GameTaskTitle>

      <FormWrapper>
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
      </FormWrapper>
    </Container>
  );
};

export default Home;
