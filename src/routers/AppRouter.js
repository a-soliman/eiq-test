import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
/* LAYOUT COMPONENTS */
import Navbar from "../components/layout/Navbar";
import Landing from "../components/layout/Landing";
import Footer from "../components/layout/Footer";

/* DASHBOARD COMPONENTS */
import Dashboard from "../components/dashboard/Dashboard";

import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Navbar />
      <Switch>
        <PublicRoute
          path="/"
          component={Landing}
          exact={true}
          no_container={true}
        />
        <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
