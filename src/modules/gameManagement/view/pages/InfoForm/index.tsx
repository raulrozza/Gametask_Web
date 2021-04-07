import React, { useCallback, useMemo } from 'react';

// Components
import {
  Button,
  ImageInput,
  Input,
  Loading,
  Textarea,
} from 'shared/view/components';
import { ColorInput } from 'modules/gameManagement/view/components';
import { ColorPreview, RestoreDefaultThemeButton } from './components';
import { ColorInputGroup, SForm } from './styles';

// Hooks
import useGetGameController from 'modules/gameManagement/infra/controller/useGetGameController';
import useThemeContext from 'shared/container/contexts/ThemeContext/contexts/useThemeContext';

// Libraries
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// Types
import IUpdateGameDTO from 'modules/gameManagement/dtos/IUpdateGameDTO';

// Validation
import GameSchema from 'modules/gameManagement/view/validation/GameSchema';
import useUpdateGameController from 'modules/gameManagement/infra/controller/useUpdateGameController';

interface IInitialValues {
  name: string;
  description: string;
  image: string;
  primary: string;
  secondary: string;
}

const InfoForm: React.FC = () => {
  const { loading, game } = useGetGameController();
  const { loading: loadingUpdate, updateGame } = useUpdateGameController();
  const { theme, switchTheme } = useThemeContext();

  const initialValues: IInitialValues = useMemo(
    () =>
      loading
        ? ({} as any)
        : {
            name: game.name,
            description: game.description,
            primary: theme.palette.primary.main,
            secondary: theme.palette.secondary.main,
            image: game.image_url || '',
          },
    [
      game.description,
      game.image_url,
      game.name,
      loading,
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ],
  );

  const submitForm = useCallback(
    async ({
      name,
      description,
      primary,
      secondary,
      image,
    }: IUpdateGameDTO) => {
      const success = await updateGame({
        name,
        description,
        primary,
        secondary,
        image,
      });

      if (success) {
        toast.success('Informações alteradas com sucesso.');

        switchTheme({
          primary,
          secondary,
        });
      }
    },
    [switchTheme, updateGame],
  );

  if (loading) return <Loading />;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={GameSchema}
      onSubmit={submitForm}
    >
      <SForm>
        <ImageInput name="image" />

        <Input name="name" placeholder="Nome jogo" />

        <Textarea
          name="description"
          placeholder="Descreva seu jogo: o que ele representa? Onde será jogado? Quem participará?"
        />

        <h3>Tema</h3>

        <ColorInputGroup>
          <ColorInputGroup.Row>
            <ColorInputGroup.Column>
              <ColorInput name="primary" label="Cor de fundo" />

              <ColorInput name="secondary" label="Cor dos botões" />
            </ColorInputGroup.Column>

            <ColorPreview />
          </ColorInputGroup.Row>

          <RestoreDefaultThemeButton />
        </ColorInputGroup>

        <Button outlined type="submit" disabled={loadingUpdate}>
          Atualizar
        </Button>
      </SForm>
    </Formik>
  );
};

export default InfoForm;
