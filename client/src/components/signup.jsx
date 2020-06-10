import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Who are you?");

  const handleOnSubmit = (event) => {
    console.log(event.target.value);
  };

  const handleOnChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleOnSelect = (event) => {
    setRole(event);
  };

  //role of trainers and users -- get fit (helping to or needing)
  return (
    <Form onSubmit={(event) => handleOnSubmit(event)} className="form">
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
        <Form.Check type="checkbox" label="Agree to terms and conditions" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUp;
