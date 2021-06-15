import React, { useRef, useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Resetpassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      try {
        setMessage("");
        setError("");
        setLoading(true);
        await resetPassword(emailRef.current.value);
        setMessage("Check your email for instructions to reset your password");
      } catch {
        setError("Failed to send reset email");
      }
      setLoading(false);
    }
  
    return (
      <>
        <h2 className="text-center pg-header pt-3 w-100">Reset Password</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Container className="d-flex align-items-center justify-content-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Reset
            </Button>
          </Form>
        </Container>
        <div className="w-100 text-center mt-3">
          <Link className="mx-3" to="/login">back to login page</Link>
        </div>
      </>
    )
}
