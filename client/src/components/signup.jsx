import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import fire from "../lib/config";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [signUpError, setSignUpError] = useState(false);

  const handleOnChange = (event, callback) => {
    callback(event.target.value);
  };

  const signup = (e) => {
    e.preventDefault();
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
        console.log(result);
      })
      .catch((error) => {
        setSignUpError(true);
      });
  };

  //role of trainers and users -- get fit (helping to or needing)
  return (
    <Form>
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

      <Form.Group controlId="formRole">
        <Form.Control
          type="text"
          placeholder="Role"
          value={role}
          onChange={(event) => handleOnChange(event, setRole)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Agree to terms and conditions" />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={(event) => signup(event)}
        c
      >
        Submit
      </Button>
    </Form>
  );
};

export default SignUp;
