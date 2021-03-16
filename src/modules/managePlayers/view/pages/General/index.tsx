import React from 'react';

// Components
import { Link } from 'react-router-dom';
import { Loading, PageTitle } from 'shared/view/components';
import { ActivityRegister, TitleManager } from './components';
import AchievementRegister from './AchievementRegister';

// Helpers
import { getPageTitle } from 'modules/managePlayers/view/pages/General/helpers';

// Hooks
import useGetGameController from 'modules/managePlayers/infra/controllers/useGetGameController';

// Icons
import { FaArrowCircleLeft } from 'react-icons/fa';

// Styles
import { PlayersContainer } from './styles';

const General: React.FC = () => {
  const { loading, game } = useGetGameController();

  if (loading) return <Loading />;

  if (!game) return null;

  const title = getPageTitle(game.newRegisters);

  return (
    <PlayersContainer>
      <PageTitle title={title} />

      <Link to="/dashboard" title="Voltar" className="back-button">
        <FaArrowCircleLeft />
      </Link>

      <ActivityRegister />

      <AchievementRegister />

      <TitleManager />
    </PlayersContainer>
  );
};

export default General;
