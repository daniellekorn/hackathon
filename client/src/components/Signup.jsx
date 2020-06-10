import React, { useState, useEffect } from "react";
import fire from "../lib/config";
import Alert from "react-bootstrap/Alert";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";

//add questions here to get more profile info

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [signUpError, setSignUpError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [disabled, changeDisable] = useState(true);
  const [checked, setChecked] = useState(false);
  const [fullError, setFullError] = useState("");

  const handleOnChange = (event, callback) => {
    callback(event.target.value);
    setSignUpError(false);
    if (email && password && code && confirm) {
      changeDisable(false);
    }
  };

  const handleOnSelect = (event) => {
    setRole(event);
  };

  const signup = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setConfirmError(true);
      return false;
    }
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return fire.firestore().collection("users").doc(cred.user.uid).set({
          uid: cred.user.uid,
          email: email,
          password: password,
          role: role,
          code: code,
        });
      })
      .then((result) => {
        setSuccess(true);
      })
      .catch((error) => {
        setFullError(error.message);
        setSignUpError(true);
      });
  };

  const toggleCheck = () => {
    checked ? setChecked(false) : setChecked(true);
  };

  return (
    <Row className="justify-content-center">
      <Col sm={10} className="justify-content-center">
        <Form className="form">
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => handleOnChange(event, setEmail)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => handleOnChange(event, setPassword)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(event) => handleOnChange(event, setConfirm)}
            />
          </Form.Group>

          <Form.Group controlId="formCode">
            <Form.Control
              type="text"
              placeholder="Chosen code word"
              value={code}
              onChange={(event) => handleOnChange(event, setCode)}
            />
          </Form.Group>

          <Form.Group controlId="formRole">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="dropdown"
              >
                {role}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1"
                  eventKey="Trainer"
                  onSelect={(event) => handleOnSelect(event)}
                >
                  Trainer
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  eventKey="Looking to get in shape"
                  onSelect={(event) => handleOnSelect(event)}
                >
                  Looking to get in shape
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Agree to terms and conditions"
              className="text-white"
              onChange={(event) => toggleCheck(event)}
            />
          </Form.Group>

          <Button
            className="orange-btn"
            type="submit"
            onClick={(event) => signup(event)}
            disabled={disabled}
          >
            Submit
          </Button>
        </Form>
        <p className="text-white mt-4 m-0 p-0">Already have an account?</p>
        <Link to="/login">
          <Button className="pink-btn">Log-in</Button>
        </Link>
        <div className="mt-2">
          {signUpError && <Alert variant="danger">{fullError}</Alert>}
        </div>
        <div className="mt-2">
          {confirmError && (
            <Alert variant="danger">Passwords do not match. Try again.</Alert>
          )}
        </div>
        <div className="mt-2">
          {success && (
            <Alert variant="success">Profile successfully created!</Alert>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;
