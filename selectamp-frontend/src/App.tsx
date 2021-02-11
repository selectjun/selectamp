import React from 'react';
import { Route, Switch } from "react-router-dom";
import AppLayout from './components/AppLayout'; 
import Header from './components/Header';
import Side from './components/Side';

function App() {
  return (
    <>
      <Switch>
        <AppLayout>
          <AppLayout.Header><Header /></AppLayout.Header>
          <AppLayout.Side><Side /></AppLayout.Side>
          <AppLayout.Main>
            <Route path="/" exact>
              <div>GET /</div>
            </Route>
            <Route path="/dashboard">
              <div>GET /dashboard</div>
            </Route>
            <Route path="/course">
              <div>GET /course</div>
            </Route>
            <Route path="/pamphlet">
              <div>GET /pamphlet</div>
            </Route>
            <Route path="/location">
              <div>GET /location</div>
            </Route>
            <Route path="/board">
              <div>GET /board</div>
            </Route>
            <Route path="/guide">
              <div>GET /guide</div>
            </Route>
            <Route path="/notice">
              <div>GET /notice</div>
            </Route>
          </AppLayout.Main>
        </AppLayout>
      </Switch>
    </>
  );
}

export default App;
