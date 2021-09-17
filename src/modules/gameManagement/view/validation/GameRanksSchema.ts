import * as Yup from 'yup';

const GameRanksSchema = Yup.object().shape({
  ranks: Yup.array(
    Yup.object({
      level: Yup.number().required(),
      name: Yup.string().required('O nome é obrigatório.'),
      tag: Yup.string().required(
        'A tag é obrigatória, pois identifica a patente',
      ),
      color: Yup.string(),
    }),
  ),
});

export default GameRanksSchema;
