import React, { useState } from 'react';

// Contexts
import { useAuth } from '../../contexts/Authorization';

// Formik
import { Formik, Form, Field } from 'formik';

// Yup
import * as Yup from 'yup';

// Services
import api from '../../services/api';

import './styles.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('Digite seu email'),
  password: Yup.string().required('Digite sua senha'),
});

const SignupSchema = Yup.object().shape({
  firstname: Yup.string().required('Digite seu nome'),
  lastname: Yup.string(),
  email: Yup.string().email('E-mail inválido').required('Digite um e-mail'),
  password: Yup.string().required('Digite uma senha'),
  confirmPassword: Yup.string().required('Repita sua senha'),
});

const Home: React.FC = () => {
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(false);
  const [formToggle, setFormToggle] = useState(true);
  // Auth
  const { signIn } = useAuth();

  return (
    <section className="home-page">
      <div className="title">
        <h1>GAMETASK</h1>
      </div>
      <div className="container">
        <div className="form-toggle">
          <button
            className={formToggle ? 'active' : ''}
            onClick={() => setFormToggle(true)}
          >
            Entre
          </button>
          <button
            className={formToggle ? '' : 'active'}
            onClick={() => setFormToggle(false)}
          >
            Cadastre-se
          </button>
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async values => {
            setLoginButtonDisabled(true);

            // Login
            try {
              const response = await api.post('/login', values);

              signIn(response.data);
            } catch (error) {
              console.error(error, error.response?.data);
            }

            setLoginButtonDisabled(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className={formToggle ? 'active' : ''}>
              <h2>Entre</h2>
              <div className="form-group">
                <div className="input-group">
                  <Field type="email" name="email" placeholder="E-mail" />
                  {errors.email && touched.email ? (
                    <div className="error-field">{errors.email}</div>
                  ) : null}
                </div>
                <div className="input-group">
                  <Field type="password" name="password" placeholder="Senha" />
                  {errors.password && touched.password ? (
                    <div className="error-field">{errors.password}</div>
                  ) : null}
                </div>
                <div className="input-group">
                  <button type="submit" disabled={loginButtonDisabled}>
                    Entrar
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, actions) => {
            if (values.password !== values.confirmPassword) {
              actions.setErrors({
                confirmPassword: 'As senhas não são iguais',
              });
              return;
            }
            setSignupButtonDisabled(true);

            // Post user in the API
            try {
              await api.post('/signup', values);

              window.location.reload();
            } catch (error) {
              console.error(error);
            }

            setSignupButtonDisabled(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className={formToggle ? '' : 'active'}>
              <h2>Cadastre-se</h2>
              <div className="form-group">
                <div className="input-group">
                  <Field type="text" name="firstname" placeholder="Nome" />
                  {errors.firstname && touched.firstname ? (
                    <div className="error-field">{errors.firstname}</div>
                  ) : null}
                </div>
                <div className="input-group">
                  <Field type="text" name="lastname" placeholder="Sobrenome" />
                  {errors.lastname && touched.lastname ? (
                    <div className="error-field">{errors.lastname}</div>
                  ) : null}
                </div>
                <div className="input-group">
                  <Field type="email" name="email" placeholder="E-mail" />
                  {errors.email && touched.email ? (
                    <div className="error-field">{errors.email}</div>
                  ) : null}
                </div>
                <div className="input-group">
                  <Field type="password" name="password" placeholder="Senha" />
                  {errors.password && touched.password ? (
                    <div className="error-field">{errors.password}</div>
                  ) : null}
                </div>
                <div className="input-group">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a senha"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="error-field">{errors.confirmPassword}</div>
                  ) : null}
                </div>
                <div className="input-group">
                  <button type="submit" disabled={signupButtonDisabled}>
                    Cadastrar
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Home;