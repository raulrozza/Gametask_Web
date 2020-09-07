import React from 'react';

// Contexts
import { useGame } from '../../contexts/Game';

// Components
import Loading from '../../components/Loading';
import ActivityRegister from './ActivityRegister';
import AchievementRegister from './AchievementRegister';
import TitleManager from './TitleManager';

// Icons
import { FaArrowCircleLeft } from 'react-icons/fa';

// Libs
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// Styles
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

      <AchievementRegister />

      <TitleManager />
    </PlayersContainer>
  );
};

export default Players;
