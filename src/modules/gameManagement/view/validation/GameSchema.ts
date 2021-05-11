import * as Yup from 'yup';

const GameSchema = Yup.object().shape({
  name: Yup.string().required('Digite o nome do jogo.'),
  description: Yup.string().required(
    'Descreva melhor o jogo e seus objetivos.',
  ),
  theme: Yup.object(),
  image: Yup.mixed(),
});

export default GameSchema;
