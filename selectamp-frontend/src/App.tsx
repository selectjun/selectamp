import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Pamphlet from './pages/Pamphlet';
import CommunityView from './pages/Community/CommunityView';
import CommunityWrite from './pages/Community/CommunityWrite';
import CommunityModify from './pages/Community/CommunityModify';
import CommunityContainer from './containers/Community/CommunityContainer';
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
        <Route path="/community/write" component={CommunityWrite} />
        <Route path="/community/:id/modify" component={CommunityModify} />
        <Route path="/community/:id" component={CommunityView} />
        <Route path="/community" component={CommunityContainer} />
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
