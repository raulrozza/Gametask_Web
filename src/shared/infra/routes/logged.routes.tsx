import React from 'react';
import UserRoutes from 'modules/user/infra/routes';
import { Redirect } from 'react-router';

const LoggedRoutes: () => JSX.Element[] = () => [
  ...UserRoutes(),
  <Redirect key="logged-routes-redirect" from="*" to="/" />,
];

export default LoggedRoutes;
