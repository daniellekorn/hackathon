//Make login here so that we can have them logout and login if they want
import React, { useState, Fragment } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import fire, { googleFire } from "../lib/config";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [fullError, setFullError] = useState("");

  const login = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((u) => {})
      .catch((error) => {
        setFullError(error.message);
        setLoginError(true);
      });
  };

  return (
    <Col md={{ span: 4, offset: 4 }} className="mt-5">
      <Form>
        <Form.Group>
          <Form.Control
            className="align-self-top"
            type="input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="align-self-top"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button
          type="submit"
          onClick={(event) => login(event)}
          className="orange-btn"
        >
          Login
        </Button>
        <Link to="/signup" className="ml-3">
          <Button className="pink-btn">Signup</Button>
        </Link>
        <Fragment>
          {loginError && <Alert variant="danger">{fullError}</Alert>}
        </Fragment>
      </Form>
    </Col>
  );
};

export default Login;
