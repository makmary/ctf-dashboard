import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Routes, { RoutesNames } from './routes';
import Error from './Error';

const Root = React.lazy(() => import('./Root'));
const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));
const Users = React.lazy(() => import('./Users'));
const Scoreboard = React.lazy(() => import('./Scoreboard'));
const Challenges = React.lazy(() => import('./Challenges'));

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div />}>
        <Switch>
          <Route exact path={Routes.ROOT} name={RoutesNames.ROOT} component={Root} />
          <Route exact path={Routes.LOGIN} name={RoutesNames.LOGIN} component={Login} />
          <Route exact path={Routes.REGISTER} name={RoutesNames.REGISTER} component={Register} />
          <Route exact path={Routes.USERS} name={RoutesNames.USERS} component={Users} />
          <Route exact path={Routes.SCOREBOARD} name={RoutesNames.SCOREBOARD} component={Scoreboard} />
          <Route exact path={Routes.CHALLENGES} name={RoutesNames.CHALLENGES} component={Challenges} />
          <Route component={Error} />
          <Redirect to={Routes.ERROR} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Router;
