import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { FaArrowCircleLeft } from 'react-icons/fa';

// Contexts
import { useGame } from '../../contexts/Game';

// Components
import Loading from '../../components/Loading';
import ActivityRegister from '../../components/Players/ActivityRegister';

import './styles.css';

const Players = () => {
  const { loading, game } = useGame();

  if(loading)
    return <Loading />;
  return (
    <>
      <Helmet>
        <title>{game.newRegisters && `(${game.newRegisters}) `}Gerenciar Jogadores - GameTask</title>
      </Helmet>
      <div className="players-container">
        <Link to="/dashboard" title="Voltar" className="back-button">
          <FaArrowCircleLeft />
        </Link>

        <ActivityRegister />
      </div>
    </>
  )
}

export default Players;
