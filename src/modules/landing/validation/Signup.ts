import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstname: Yup.string().required('Digite seu nome'),
  lastname: Yup.string(),
  email: Yup.string().email('E-mail inválido').required('Digite um e-mail'),
  password: Yup.string().required('Digite uma senha'),
  confirmPassword: Yup.string().required('Repita sua senha'),
});

export default SignupSchema;
