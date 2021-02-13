import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Pamphlet from './pages/Pamphlet';
import Location from './pages/Location';
import Board from './pages/Board';
import Guide from './pages/Guide';
import Notice from './pages/Notice';
import Error from './pages/Error';

function App() {
  return (
    <>
      <Switch>
        <Route path={["/", "/dashboard"]} exact component={Dashboard} />
        <Route path="/course" component={Course} />
        <Route path="/pamphlet" component={Pamphlet} />
        <Route path="/location" component={Location} />
        <Route path="/board" component={Board} />
        <Route path="/guide" component={Guide} />
        <Route path="/notice" component={Notice} />
        <Route path="/error" component={Error} />
        <Redirect to="/error" />
      </Switch>
    </>
  );
}

export default App;
