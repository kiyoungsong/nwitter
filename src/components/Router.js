import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from "../rotues/Auth";
import { Home } from "../rotues/Home";

export const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};
