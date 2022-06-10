import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const LoginForm = () => {
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
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
        </Form.Group>
        <br />
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        You don't have an account???
        <br />
        <Link to="/register">
          <Button variant="info" size="sm" className="m1-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
