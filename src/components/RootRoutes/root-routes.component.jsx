import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute/private-route.component';
import Home from 'pages/Home/home.component';
import Login from 'pages/Login/login.component';
import NotFound from 'pages/NotFound/not-found.component';

function RootRoutes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default RootRoutes;
