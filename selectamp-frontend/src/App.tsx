import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Pamphlet from './pages/Pamphlet';
import Community from './pages/Community';
import Guide from './pages/Guide';
import Notice from './pages/Notice';
import Login from './pages/Login';
import Error from './pages/Error';

function App() {
  return (
    <>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/pamphlet" component={Pamphlet} />
        <Route path="/community" component={Community} />
        <Route path="/guide" component={Guide} />
        <Route path="/notice" component={Notice} />
        <Route path="/login" component={Login} />
        <Route path="/error" component={Error} />
        <Redirect from="/" exact to="dashboard" />
        <Redirect to="/error" />
      </Switch>
    </>
  );
}

export default App;
