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
import About from "./containers/page-about";
import MLApplicationsPage from "./containers/page-ml-applications";

import Login from "./containers/page-login";
import SignUp from "./containers/page-signup";
import { AuthProvider } from './context/context';
import AppRoute from './components/app-route';

const routes = [
  {
    path: '/ml-applications',
    component: MLApplicationsPage,
    isPrivate: true
  },
  {
    path: '/software-applications',
    component: SoftwareApplicationsPage,
    isPrivate: true
  },
  {
    path: '/full-stack-applications',
    component: FullStackApplicationsPage,
    isPrivate: true
  },
  {
    path: '/web-applications',
    component: WebApplicationsPage,
    isPrivate: true
  },
  {
    path: '/interviews',
    component: InterviewPage,
    isPrivate: true
  },
  {
    path: '/coding-tests',
    component: CodingTestsPage,
    isPrivate: true
  },
  {
    path: '/past-applications',
    component: PastApplicationsPage,
    isPrivate: true
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    isPrivate: true
  },
  {
    path: '/profile',
    component: ProfilePage,
    isPrivate: true
  },
  {
    path: '/positions',
    component: PositionsPage,
    isPrivate: true
  },
  {
    path: '/forums',
    component: ForumsPage,
    isPrivate: true
  },
  {
    path: '/about',
    component: About,
    isPrivate: true
  },
  {
    path: '/',
    component: LandingPage
  }
]

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{height: '100%'}}>
          <Navbar />
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
              {routes.map((route) => (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))}
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
