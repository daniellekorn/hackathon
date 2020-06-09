import React from "react";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tracker from "./components/Tracker";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Signup from "./components/signup"
// import Container from ".react-bootstrap/Container"

const App = () => {
  return (
    // <Container>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/"><i className="fa fa-home"></i></Link>
              </li>
              <li>
                <Link to="/signup"><i className="fa fa-user"></i></Link>
              </li>
              <li>
                <Link to="/tracker"><i className="fa fa-bullseye"></i>
</Link>
              </li>
            </ul>
          </div>
            <Switch>
              <Route exact path="/">
              <div className="contain">
                <h1>Ready to Shelp?</h1>
                </div>
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/tracker">
                <Tracker />
              </Route>
            </Switch>
        </Router>
        // </Container>
  );
};

export default App;
