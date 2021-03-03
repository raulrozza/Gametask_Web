import React from 'react';

// Icons
import { FaArrowCircleLeft } from 'react-icons/fa';

// Style
import { BackLink, Container } from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <Container>
    <BackLink to="/dashboard" title="Voltar">
      <FaArrowCircleLeft />
    </BackLink>

    <h1>{title}</h1>
  </Container>
);

export default Header;
