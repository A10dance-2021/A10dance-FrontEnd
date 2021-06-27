import React, { useRef, useState } from "react";
import { Alert, Button, Form, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";
import Paper from "@material-ui/core/Paper";

export default function Profile() {
  const nameRef = useRef();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const { currentUser, updateName, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleNameChange(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await updateName(nameRef.current.value);
      setMessage("Successfully changed name");
    } catch {
      setError("Failed to change name");
    }
    setLoading(false);
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    if (
      newPasswordRef.current.value !== confirmNewPasswordRef.current.value &&
      currentPasswordRef.current.value === currentUser.password
    ) {
      return setError("Passwords do not match");
    }

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await updatePassword(newPasswordRef.current.value);
      setMessage("Successfully changed password");
    } catch {
      setError("Failed to change password");
    }
    setLoading(false);
  }

  return (
    <Row className="d-flex">
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Container className="col-3">
        <Sidebar />
      </Container>
      <Container className="col-9 justify-content-center">
        <h2 className="my-5">Profile</h2>
        <Row className="col-12">
          <strong className="col-4 d-inline m-3">Name:</strong>
          <p className="col-4 d-inline m-3">{currentUser.displayName}</p>
        </Row>
        <Row className="col-12">
          <strong className="col-4 d-inline m-3">Email:</strong>
          <p className="col-4 d-inline m-3">{currentUser.email}</p>
        </Row>
        <Row className="col-12">
          <strong className="col-4 d-inline m-3">Form Class:</strong>
          <p className="col-4 d-inline m-3">409</p>
        </Row>
        <h5 className="mt-5 mb-3">Change Name</h5>
        <Paper
          className="col-8 px-3 py-3 m-2"
          elevation={3}
          style={{ backgroundColor: "#c4e8b7" }}
        >
          <Form onSubmit={handleNameChange}>
            <Form.Group id="name">
              <Form.Label>New Display Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Submit
            </Button>
          </Form>
        </Paper>
        <h5 className="mt-5 mb-3">Change Password</h5>
        <Paper
          className="col-8 px-3 py-3 m-2"
          elevation={3}
          style={{ backgroundColor: "#c4e8b7" }}
        >
          <Form onSubmit={handlePasswordChange}>
            <Form.Group id="password">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" ref={currentPasswordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" ref={newPasswordRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmNewPasswordRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Submit
            </Button>
          </Form>
        </Paper>
      </Container>
    </Row>
  );
}
