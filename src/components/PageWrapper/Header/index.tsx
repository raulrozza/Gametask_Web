import React from 'react';

// Components
import { Link } from 'react-router-dom';

// Icons
import { FaArrowCircleLeft } from 'react-icons/fa';

// Style
import { Container } from './styles';

// Types
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({ title }) => (
  <Container>
    <Link to="/dashboard" title="Voltar">
      <FaArrowCircleLeft />
    </Link>

    <h1>{title}</h1>
  </Container>
);

export default Header;
