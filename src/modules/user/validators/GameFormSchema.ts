import * as Yup from 'yup';

const GameFormSchema = Yup.object().shape({
  name: Yup.string().required('Dê um nome ao seu jogo.'),
  description: Yup.string().required('Descreva seu jogo.'),
  image: Yup.mixed(),
});

export default GameFormSchema;
