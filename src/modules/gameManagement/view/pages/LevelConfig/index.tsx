import React, { useCallback } from 'react';

// Components
import { Button, Loading } from 'shared/view/components';
import { FieldArray, Formik } from 'formik';
import { LevelsContainer } from './components';

// Hooks
import useGetGameController from 'modules/gameManagement/infra/controller/useGetGameController';
import useUpdateGameController from 'modules/gameManagement/infra/controller/useUpdateGameController';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

// Styles
import { Column, Container, LevelForm, Title } from './styles';

// Types
import ILevelInfo from 'shared/entities/ILevelInfo';

interface ILevelValues {
  levels: ILevelInfo[];
}

const LevelConfig: React.FC = () => {
  const { game, loading } = useGetGameController();
  const { loading: loadingUpdate, updateGame } = useUpdateGameController();

  const toast = useToastContext();

  const submitLevels = useCallback(
    async ({ levels }: ILevelValues) => {
      const levelInfo = levels.map((level, index) => ({
        requiredExperience: level.requiredExperience,
        title: level.title,
        level: index,
      }));

      if (!game) return;

      const success = await updateGame({
        name: game.name,
        description: game.description,
        primary: game.theme.primary,
        secondary: game.theme.secondary,
        image: game.image || '',
        levelInfo: levelInfo,
        ranks: game.ranks || [],
      });

      if (success) {
        toast.showSuccess('Níveis alterados com sucesso!');
      }
    },
    [game, toast, updateGame],
  );

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

        <Formik
          initialValues={{ levels: game.levelInfo || [] }}
          onSubmit={submitLevels}
        >
          <LevelForm>
            <FieldArray name="levels">
              {props => <LevelsContainer {...props} />}
            </FieldArray>

            <footer>
              <Button type="submit" loading={loadingUpdate}>
                Salvar
              </Button>
            </footer>
          </LevelForm>
        </Formik>
      </Column>
    </Container>
  );
};

export default LevelConfig;
