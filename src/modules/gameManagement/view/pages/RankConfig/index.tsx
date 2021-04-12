import React from 'react';

// Components
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikProps,
} from 'formik';
import { Button, Loading } from 'shared/view/components';
import { AddItemButton, RankItem } from './components';
import { Container } from './styles';

// Hooks
import useGetGameController from 'modules/dashboard/infra/controllers/useGetGameController';

// Types
import IRank from 'shared/entities/IRank';

export interface IRankValues {
  ranks: IRank[];
}

interface FieldArrayProps extends FieldArrayRenderProps {
  form: FormikProps<IRankValues>;
}

const RankConfig: React.FC = () => {
  const { game, loading } = useGetGameController();

  if (loading) return <Loading />;

  return (
    <Container>
      <h2>Configurar patentes</h2>

      <p>
        Crie, edite e remova patentes. Defina uma cor e a partir de qual nível
        um jogador a obtém.
      </p>

      <Formik
        initialValues={{ ranks: game.ranks || [] } as IRankValues}
        onSubmit={values => console.log(values)}
      >
        <Form>
          <FieldArray name="ranks">
            {({ handleRemove, push, form }: FieldArrayProps) => (
              <>
                {form.values.ranks.map((_, index) => (
                  <RankItem
                    key={`rank-${index}`}
                    index={index}
                    handleRemove={handleRemove}
                    levels={game.levelInfo || []}
                  />
                ))}

                <AddItemButton handlePush={push} />
              </>
            )}
          </FieldArray>

          <footer>
            <Button type="submit" loading={false}>
              Salvar
            </Button>
          </footer>
        </Form>
      </Formik>
    </Container>
  );
};

export default RankConfig;
