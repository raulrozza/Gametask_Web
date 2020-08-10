import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { FaArrowCircleLeft } from 'react-icons/fa';

// Contexts
import { useGame } from '../../contexts/Game';

// Components
import Loading from '../../components/Loading';
import ActivityRegister from '../../components/Players/ActivityRegister';

import './styles.css';

const Players: React.FC = () => {
  const { loading, game } = useGame();

  console.log(game);

  if (loading) return <Loading />;

  const registerTitle = game.newRegisters ? `(${game.newRegisters}) ` : '';

  return (
    <>
      <Helmet>
        <title>{registerTitle}Gerenciar Jogadores - GameTask</title>
      </Helmet>
      <div className="players-container">
        <Link to="/dashboard" title="Voltar" className="back-button">
          <FaArrowCircleLeft />
        </Link>

        <ActivityRegister />
      </div>
    </>
  );
};

export default Players;
