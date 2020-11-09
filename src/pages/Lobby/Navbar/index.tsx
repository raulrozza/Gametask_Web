import React, { memo } from 'react';

// Hooks
import { useAuth } from '../../../hooks/contexts/useAuth';

// Assets
import logo from '../../../assets/img/logo.png';

import { Container } from './styles';

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
        <span className="logout" onClick={signOut}>
          Sair
        </span>
      </span>
    </Container>
  );
};

export default memo(Navbar);
