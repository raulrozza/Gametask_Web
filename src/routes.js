import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

// Components
import Loading from './components/Loading';
import NotFound from './components/NotFound';

// Pages
const Achievements = lazy(() => import('./pages/Achievements'));
const Activities = lazy(() => import('./pages/Activities'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Game = lazy(() => import('./pages/Game'));
const Home = lazy(() => import('./pages/Home'));

/* 
  The object controls the web page's routes, sending the correct page based on the URL entered by the user
*/
const Routes = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/achievements" exact component={Achievements} />
        <Route path="/activities" exact component={Activities} />
        <Route path="/game" exact component={Game} />
        <Route path="/" exact component={Home} />

        <Route path='*' exact component={() => (<NotFound message={
          <>
              404: Página não encontrada. <br/>Está perdido? Vá para a nossa <Link to="/">Página Principal</Link>.
          </>
        } />)} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Routes;
