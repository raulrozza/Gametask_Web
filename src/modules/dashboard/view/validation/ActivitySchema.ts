import * as Yup from 'yup';

const ActivitySchema = Yup.object().shape({
  name: Yup.string().required('Digite o nome da atividade.'),
  experience: Yup.number()
    .required('Quanto de experiência a atividade dá?')
    .typeError('O valor de experiência precisa ser um número!'),
  description: Yup.string(),
  dmRules: Yup.string(),
});

export default ActivitySchema;
