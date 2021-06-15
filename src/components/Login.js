import React, { useRef, useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import logo from "../img/a10dancelogo.png";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  return (
    <>
      <img src={logo} alt="Logo" className="mx-auto d-block" />
      {error && <Alert variant="danger">{error}</Alert>}
      <Container className="d-flex align-items-center justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-3" type="submit">
            Login
          </Button>
        </Form>
      </Container>
      <div className="w-100 text-center mt-3">
        <Link className="mx-3" to="/signup">
          Create an account
        </Link>
        <Link className="mx-3" to="/reset-password">
          Reset password
        </Link>
      </div>
    </>
  );
}
