import React from 'react';

// Components
import { Loading, PageTitle } from 'shared/view/components';
import {
  AchievementRequestsList,
  ActivityRequestsList,
  TitleManager,
} from './components';

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

      <BackButton to="/" title="Voltar">
        <FaArrowCircleLeft />
      </BackButton>

      <ActivityRequestsList />

      <AchievementRequestsList />

      <TitleManager />
    </PlayersContainer>
  );
};

export default General;
