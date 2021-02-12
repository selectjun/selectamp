import React from 'react';
import { Route, Switch } from "react-router-dom";
import AppLayout from './components/AppLayout'; 
import Header from './components/Header';
import Side from './components/Side';

import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Pamphlet from './pages/Pamphlet';
import Location from './pages/Location';
import Board from './pages/Board';
import Guide from './pages/Guide';
import Notice from './pages/Notice';

function App() {
  return (
    <>
      <Switch>
        <AppLayout>
          <AppLayout.Header><Header /></AppLayout.Header>
          <AppLayout.Side><Side /></AppLayout.Side>
          <AppLayout.Main>
            <Route path={["/", "/dashboard"]} exact component={Dashboard} />
            <Route path="/course" component={Course} />
            <Route path="/pamphlet" component={Pamphlet} />
            <Route path="/location" component={Location} />
            <Route path="/board" component={Board} />
            <Route path="/guide" component={Guide} />
            <Route path="/notice" component={Notice} />
          </AppLayout.Main>
        </AppLayout>
      </Switch>
    </>
  );
}

export default App;
