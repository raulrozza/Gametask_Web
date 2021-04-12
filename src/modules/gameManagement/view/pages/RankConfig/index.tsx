import React, { useCallback } from 'react';

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
import useUpdateGameController from 'modules/gameManagement/infra/controller/useUpdateGameController';
import useToastContext from 'shared/container/contexts/ToastContext/contexts/useToastContext';

export interface IRankValues {
  ranks: IRank[];
}

interface FieldArrayProps extends FieldArrayRenderProps {
  form: FormikProps<IRankValues>;
}

const RankConfig: React.FC = () => {
  const { game, loading } = useGetGameController();
  const { loading: loadingUpdate, updateGame } = useUpdateGameController();
  const toast = useToastContext();

  const submitRanks = useCallback(
    async ({ ranks }: IRankValues) => {
      if (!game) return;

      const success = await updateGame({
        name: game.name,
        description: game.description,
        primary: game.theme.primary,
        secondary: game.theme.secondary,
        image: game.image || '',
        levelInfo: game.levelInfo || [],
        ranks: ranks,
      });

      if (success) {
        toast.showSuccess('Patentes alteradas com sucesso!');
      }
    },
    [game, toast, updateGame],
  );

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
        onSubmit={submitRanks}
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
            <Button type="submit" loading={loadingUpdate}>
              Salvar
            </Button>
          </footer>
        </Form>
      </Formik>
    </Container>
  );
};

export default RankConfig;
