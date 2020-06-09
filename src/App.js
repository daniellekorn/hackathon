import React from "react";
import "./App.css";
import Tracker from "./components/Tracker";
import Container from "./components/Tracker";

const App = () => {
  return (
    <Container className="full-page">
      <Tracker />
    </Container>
  );
};

export default App;
