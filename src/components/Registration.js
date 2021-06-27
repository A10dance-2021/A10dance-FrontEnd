import React, { useRef, useState } from "react";
import { Alert, Button, Form, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../config/firebase";
import Paper from "@material-ui/core/Paper";

export default function Registration() {
  const classRef = useRef();
  const nameRef = useRef();
  const studentClassRef = useRef();
  const studentIdRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  async function handleStudentReg(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    let formData = new FormData();
    formData.append("student_id", studentIdRef.current.value);
    formData.append("student_name", nameRef.current.value);
    formData.append("student_class", studentClassRef.current.value);
    formData.append("image", selectedFile);
    const res = await fetch("https://registerperson-xb4yazikbq-as.a.run.app", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    if (result.success) {
      setMessage("Successfully added student");
    } else {
      setError("Failed to add student");
    }
    setLoading(false);
  }

  async function handleClassReg(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await db.collection("classes").add({
        class_name: classRef.current.value,
      });
      setMessage("Successfully created class");
    } catch {
      setError("Failed to create class");
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
      <Container
        className="col-9 justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <h2 className="my-5">Registration</h2>
        <h5 className="mt-5 mb-3">Register new class</h5>
        <Paper
          className="col-8 px-3 py-3 m-2"
          elevation={3}
          style={{ backgroundColor: "#c4e8b7" }}
        >
          <Form onSubmit={handleClassReg}>
            <Form.Group id="class">
              <Form.Label>New Class</Form.Label>
              <Form.Control type="text" ref={classRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Submit
            </Button>
          </Form>
        </Paper>
        <h5 className="mt-5 mb-3">Register new student</h5>
        <Paper
          className="col-8 px-3 py-3 m-2"
          elevation={3}
          style={{ backgroundColor: "#c4e8b7" }}
        >
          <Form onSubmit={handleStudentReg}>
            <Form.Group id="student-name">
              <Form.Label>Student Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="student-class">
              <Form.Label>Student Class</Form.Label>
              <Form.Control type="text" ref={studentClassRef} required />
            </Form.Group>
            <Form.Group id="student-id">
              <Form.Label>Student ID</Form.Label>
              <Form.Control type="text" ref={studentIdRef} required />
            </Form.Group>
            <Form.Group id="student-image">
              <Form.Label>Student Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
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
