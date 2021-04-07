import React from 'react';

// Components
import { Loading } from 'shared/view/components';
import { LevelsContainer } from './components';

// Contexts
import LevelContext from 'modules/gameManagement/container/contexts/LevelContext/implementations/LevelContext';

// Hooks
import useGetGameController from 'modules/gameManagement/infra/controller/useGetGameController';

// Styles
import { Column, Container, Title } from './styles';

const LevelConfig: React.FC = () => {
  const { game, loading } = useGetGameController();

  if (loading) return <Loading />;

  return (
    <Container>
      <Column>
        <Title>Configurar níveis</Title>

        <p>
          Ajuste quantos e quais níveis existem, se eles possuem algum nome
          específico, e quanto de experiência é necessário para atingí-lo a
          partir do nível anterior.
        </p>

        <LevelContext initialLevels={game.levelInfo || []}>
          <LevelsContainer />
        </LevelContext>
      </Column>
    </Container>
  );
};

export default LevelConfig;
