import React from "react";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tracker from "./components/Tracker";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Router>
      <Row>
        <Col sm={12}>
          <div>
            <ul>
              <li>
                <Link to="/">
                  <i class="fa fa-home"></i>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <i class="fa fa-user"></i>
                </Link>
              </li>
              <li>
                <Link to="/tracker">
                  <i class="fa fa-bullseye"></i>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/tracker">
          <Tracker />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
