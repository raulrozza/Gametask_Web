import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

// Components
import NotFound from './components/NotFound';

// Pages
import Achievements from './pages/Achievements';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

/* 
    The object controls the web page's routes, sending the correct page based on the URL entered by the user
*/
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/achievements" exact component={Achievements} />
            <Route path="/" exact component={Home} />

            <Route path='*' exact component={() => (<NotFound message={
                <>
                    404: Página não encontrada. <br/>Está perdido? Vá para a nossa <Link to="/">Página Principal</Link>.
                </>
            } />)} />
        </Switch>
    </BrowserRouter>
);

export default Routes;