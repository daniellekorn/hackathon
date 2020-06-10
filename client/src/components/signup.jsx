import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import fire from "../lib/config";
import Alert from "react-bootstrap/Alert";
import Dropdown from "react-bootstrap/Dropdown";

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
  const [terms, setTerms] = useState(false);

  const handleOnChange = (event, callback) => {
    callback(event.target.value);
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
        });
      })
      .then((result) => {
        setSuccess(true);
      })
      .catch((error) => {
        setSignUpError(true);
      });
  };

  return (
    <div>
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
              variant="success"
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
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(event) => signup(event)}
          disabled={disabled}
        >
          Submit
        </Button>
      </Form>
      <div className="mt-2">
        {signUpError && (
          <Alert variant="danger">
            Please submit a valid email. Error occurred.
          </Alert>
        )}
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
    </div>
  );
};

export default SignUp;
