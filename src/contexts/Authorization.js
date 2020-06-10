import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';

const AuthorizationContext = createContext();

const Authorization = ({ children }) => {
  const [token, setToken] = useState(null);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('loggedUser');
    if(!storedToken)
      setLogged(false);
    else{
      const parsedToken = JSON.parse(storedToken);
      api.defaults.headers['Authorization'] = 'Bearer '+parsedToken.token;
      setToken(parsedToken);
      setLogged(true);
    }
    setLoading(false);
  }, []);

  const signIn = (token) => {
    localStorage.setItem('loggedUser', JSON.stringify(token));
    api.defaults.headers['Authorization'] = 'Bearer '+token.token;
    setToken(token);
    setLogged(true);
  }

  const signOut = () => {
    localStorage.clear();
    api.defaults.headers['Authorization'] = 'Bearer '+token.token;
    setToken(null);
    setLogged(false);
  }

  return (
    <AuthorizationContext.Provider value={{ token, logged, loading, signIn, signOut }} >
      {children}
    </AuthorizationContext.Provider>
  )
};

export const useAuth = () => {
  const auth = useContext(AuthorizationContext);

  return auth;
};

export default Authorization;
