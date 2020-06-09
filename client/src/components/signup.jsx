import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleOnSubmit = (event) => {
    console.log(event.target.value);
  };

  const handleOnChange = (event, callback) => {
    callback(event.target.value);
  };

  //role of trainers and users -- get fit (helping to or needing)
  return (
    <Form onSubmit={(event) => handleOnSubmit(event)}>
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUp;
