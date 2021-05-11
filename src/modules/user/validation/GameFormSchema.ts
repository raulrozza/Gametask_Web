import * as Yup from 'yup';

interface IImageValues {
  image: string | File | null;
}

interface IRequiredImageErrors {
  image?: string;
}

export const requiredImageValidation = (
  values: IImageValues,
): IRequiredImageErrors => {
  if (!values.image)
    return {
      image: 'Por favor, envie uma imagem!',
    };

  return {};
};

const GameFormSchema = Yup.object().shape({
  name: Yup.string().required('Dê um nome ao seu jogo.'),
  description: Yup.string().required('Descreva seu jogo.'),
  image: Yup.mixed(),
});

export default GameFormSchema;
