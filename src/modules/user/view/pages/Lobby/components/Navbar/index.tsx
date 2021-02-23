import React, { memo } from 'react';

// Assets
import logo from 'assets/img/logo.png';

// Helpers
import { clickOnEnter } from './helpers';

// Hooks
import useSessionContext from 'shared/container/contexts/SessionContext/contexts/useSessionContext';

// Styles
import { Container, LobbyTitle, LoggedText, LogoContainer } from './styles';

const Navbar: React.FC = () => {
  const { userToken, logout } = useSessionContext();

  if (!userToken) return null;

  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="GameTask" />

        <LobbyTitle>
          Lobby <span>Entre ou crie um jogo</span>
        </LobbyTitle>
      </LogoContainer>

      <LoggedText>
        Você está logado como <strong>{/* user.firstname */}</strong>.{' '}
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
