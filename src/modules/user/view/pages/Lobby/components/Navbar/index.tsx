import React, { memo } from 'react';

// Assets
import logo from 'assets/img/logo.png';

// Helpers
import { useSessionContext } from 'shared/view/contexts';

import { clickOnEnter } from './helpers';

// Hooks

// Styles
import { Container, LobbyTitle, LoggedText, LogoContainer } from './styles';

const Navbar: React.FC = () => {
  const { userData, logout } = useSessionContext();

  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="GameTask" />

        <LobbyTitle>
          Lobby <span>Entre ou crie um jogo</span>
        </LobbyTitle>
      </LogoContainer>

      <LoggedText>
        Você está logado como <strong>{userData.name}</strong>.{' '}
        <span
          onClick={logout}
          role="button"
          tabIndex={0}
          onKeyUp={clickOnEnter}
        >
          Sair
        </span>
      </LoggedText>
    </Container>
  );
};

export default memo(Navbar);
