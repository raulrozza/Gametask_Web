import React from 'react';
import UsersRepository from 'modules/landing/providers/UsersRepositoryProvider/implementations/UsersRepository';

const LandingProviders: React.FC = ({ children }) => (
  <UsersRepository>{children}</UsersRepository>
);

export default LandingProviders;
