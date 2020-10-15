import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from "./containers/page-landing";
import DashboardPage from "./containers/page-dashboard";
import ProfilePage from "./containers/page-profile";
import PositionsPage from "./containers/page-positions";
import ForumsPage from "./containers/page-forums";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/positions">Positions</Link>
            </li>
            <li>
              <Link to="/forums">Forums</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

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
