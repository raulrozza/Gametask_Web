import React from 'react';

// Components
import { Button, Loading } from 'shared/view/components';
import { FieldArray, Formik } from 'formik';
import { LevelsContainer } from './components';

// Hooks
import useGetGameController from 'modules/gameManagement/infra/controller/useGetGameController';

// Styles
import { Column, Container, LevelForm, Title } from './styles';

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

        <Formik
          initialValues={{ levels: game.levelInfo || [] }}
          onSubmit={values => console.log(values)}
        >
          <LevelForm>
            <FieldArray name="levels">
              {props => <LevelsContainer {...props} />}
            </FieldArray>

            <footer>
              <Button type="submit">Salvar</Button>
            </footer>
          </LevelForm>
        </Formik>
      </Column>
    </Container>
  );
};

export default LevelConfig;
