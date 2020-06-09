import React from "react";
import "./App.css";
import Tracker from "./components/Tracker";
import Container from "./components/Tracker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Container className="full-page">
        <Switch>
          <Route path="/dashboard">
            <Tracker />
          </Route>
          <Route path="/signup">
            <div>Sign Up</div>
          </Route>
          <Route path="/">Home</Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
