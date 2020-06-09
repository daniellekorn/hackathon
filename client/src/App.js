import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Signup from "./components/Signup";
import Main from "./components/Main";
import fire from "./lib/config";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
        localStorage.setItem("user", user.uid);
        console.log(localStorage.getItem("user"));
      } else {
        setCurrentUser(null);
        localStorage.removeItem("user");
        console.log(localStorage.getItem("user"));
      }
    });
  });

  return (
    <Container className="fullsite">
      {currentUser ? <Main /> : <Signup />}
    </Container>
  );
};

export default App;
