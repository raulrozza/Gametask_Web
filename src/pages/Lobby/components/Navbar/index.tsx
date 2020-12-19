import React, { memo } from 'react';

// Assets
import logo from 'assets/img/logo.png';

// Hooks
import { useAuth } from 'hooks';

// Styles
import { Container } from './styles';

// Utils
import { clickOnEnter } from 'utils';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <Container>
      <div>
        <img src={logo} alt="GameTask" />
        <h2>
          Lobby <span>Entre ou crie um jogo</span>
        </h2>
      </div>

      <span>
        Você está logado como <strong>{user.firstname}</strong>.{' '}
        <span
          className="logout"
          onClick={signOut}
          role="button"
          tabIndex={0}
          onKeyUp={clickOnEnter}
        >
          Sair
        </span>
      </span>
    </Container>
  );
};

export default memo(Navbar);
