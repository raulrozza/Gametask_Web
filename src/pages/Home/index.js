import React from 'react';

import './styles.css';

const Home = () => {
  return (
      <section className="home-page">
          <div className="title">
              <h1>Gamification App</h1>
          </div>
          <div className="container">
              <form>
                <h2>Entre</h2>
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" placeholder="Nome de usuário" />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Senha" />
                    </div>
                    <div className="input-group">
                        <button type="submit">Entrar</button>
                    </div>
                </div>
              </form>
              <form>
                <h2>Cadastre-se</h2>
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" placeholder="Nome de usuário" />
                    </div>
                    <div className="input-group">
                        <input type="email" placeholder="E-mail" />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Senha" />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Confirme a senha" />
                    </div>
                    <div className="input-group">
                        <button type="submit">Cadastrar</button>
                    </div>
                </div>
              </form>
          </div>
      </section>
  );
}

export default Home;