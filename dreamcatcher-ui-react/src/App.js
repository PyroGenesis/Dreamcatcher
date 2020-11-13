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
import PastApplicationsPage from "./containers/page-past-applications";
import SoftwareApplicationsPage from "./containers/page-software-applications";
import FullStackApplicationsPage from "./containers/page-fullstack-applications";
import WebApplicationsPage from "./containers/page-web-applications";
import InterviewPage from "./containers/page-interview";
import CodingTestsPage from "./containers/page-coding-tests";

function App() {
  return (
    <Router>
      <div style={{height: '100%'}}>
        <Navbar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/software-applications">
            <SoftwareApplicationsPage/>
          </Route>
          <Route path="/full-stack-applications">
            <FullStackApplicationsPage />
          </Route>
          <Route path="/web-applications">
            <WebApplicationsPage />
          </Route>
          <Route path="/interviews">
            <InterviewPage />
          </Route>
          <Route path="/coding-tests">
            <CodingTestsPage />
          </Route>
          <Route path="/past-applications">
            <PastApplicationsPage />
          </Route>
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
