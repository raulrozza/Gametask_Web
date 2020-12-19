import * as Yup from 'yup';

export const GameSchema = Yup.object().shape({
  name: Yup.string().required('Dê um nome ao seu jogo.'),
  description: Yup.string().required('Descreva seu jogo.'),
  image: Yup.mixed(),
});
