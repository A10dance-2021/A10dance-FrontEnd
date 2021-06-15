import React, { useRef, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebaseConfig from "../config/firebase";
import { storage } from "../config/firebase";

export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, updateName } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then(
        (user) => {
          updateName(nameRef.current.value);
        }
      );
      history.push("/login");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <h2 className="text-center pg-header pt-3 w-100">Create an Account</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      <Container className="d-flex align-items-center justify-content-center">
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group id="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-3" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      <div className="w-100 text-center mt-3">
        Already have an account? <Link to="/login">Log in!</Link>
      </div>
    </>
  );
}
