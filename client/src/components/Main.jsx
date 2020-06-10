import React from "react";
import Tracker from "../components/Tracker";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import fire from "../lib/config";

const Main = () => {
  const logout = () => {
    fire.auth().signOut();
  };

  return (
    <div>
      <div>
        <ul>
          <li>
            <Link to="/">
              <i className="fa fa-home"></i>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="fa fa-user"></i>
            </Link>
          </li>
          <li>
            <Link to="/tracker">
              <i className="fa fa-bullseye"></i>
            </Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/">
          <div className="contain">
            <h1>Welcome</h1>
            <Button variant="danger" onClick={(event) => logout(event)}>
              Logout
            </Button>
          </div>
        </Route>
        <Route path="/profile">
          <div className="text-white">Put user info here</div>
        </Route>
        <Route path="/tracker">
          <Tracker />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
