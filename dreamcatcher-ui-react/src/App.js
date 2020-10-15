import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navbar from "./components/navbar";
import LandingPage from "./containers/page-landing";
import DashboardPage from "./containers/page-dashboard";
import ProfilePage from "./containers/page-profile";
import PositionsPage from "./containers/page-positions";
import ForumsPage from "./containers/page-forums";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/positions">
            <PositionsPage />
          </Route>
          <Route path="/forums">
            <ForumsPage />
          </Route>
          <Route path="/about">
            About
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
