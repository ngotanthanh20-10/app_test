import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <>
      <Form className="my-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <br />
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        You have an account!!!
        <br />
        <Link to="/login">
          <Button variant="info" size="sm" className="m1-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
