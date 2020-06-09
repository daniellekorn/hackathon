import React from "react";
import "./App.css";
import Tracker from "./components/Tracker";
import Container from "./components/Tracker";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const App = () => {
  return (
    <Container className="full-page">
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Tracker />
          </Route>
          <Route path="/">Sign Up</Route>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
