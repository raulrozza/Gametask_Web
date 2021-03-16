import React from 'react';

// Components
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
import { BackButton, PlayersContainer } from './styles';

const General: React.FC = () => {
  const { loading, game } = useGetGameController();

  if (loading) return <Loading />;

  if (!game) return null;

  const title = getPageTitle(game.newRegisters);

  return (
    <PlayersContainer>
      <PageTitle title={title} />

      <BackButton to="/dashboard" title="Voltar">
        <FaArrowCircleLeft />
      </BackButton>

      <ActivityRegister />

      <AchievementRegister />

      <TitleManager />
    </PlayersContainer>
  );
};

export default General;
