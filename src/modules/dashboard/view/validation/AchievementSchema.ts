import * as Yup from 'yup';

const AchievementSchema = Yup.object().shape({
  name: Yup.string().required('Digite o nome da conquista.'),
  description: Yup.string().required('Explique como ganhar a conquista.'),
  title: Yup.string(),
  image: Yup.mixed(),
});

export default AchievementSchema;
