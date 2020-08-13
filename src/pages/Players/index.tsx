import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { FaArrowCircleLeft } from 'react-icons/fa';

// Contexts
import { useGame } from '../../contexts/Game';

// Components
import Loading from '../../components/Loading';
import ActivityRegister from './ActivityRegister';

import { PlayersContainer } from './styles';

const Players: React.FC = () => {
  const { loading, game } = useGame();

  if (loading) return <Loading />;

  const registerTitle = game.newRegisters ? `(${game.newRegisters}) ` : '';

  return (
    <PlayersContainer>
      <Helmet>
        <title>{registerTitle}Gerenciar Jogadores - GameTask</title>
      </Helmet>

      <Link to="/dashboard" title="Voltar" className="back-button">
        <FaArrowCircleLeft />
      </Link>

      <ActivityRegister />
    </PlayersContainer>
  );
};

export default Players;
