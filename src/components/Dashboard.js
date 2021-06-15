import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "./Sidebar";
import Paper from "@material-ui/core/Paper";

export default function Dashboard() {
  const [date, setDate] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  return (
    <Row className="d-flex w-100">
      <Container className="col-3">
        <Sidebar />
      </Container>

      <Container className="col-9 justify-content-center">
        <h5 className="col-12 pt-3">{date}</h5>
        <h1 className="text-center">Welcome Back, {currentUser.displayName}</h1>
        <Row className="col-12">
          <Paper
            className="col-12 col-sm-5 px-2 m-2"
            elevation={3}
            style={{ backgroundColor: "#c4e8b7" }}
          >
            body
          </Paper>
          <Paper
            className="col-12 col-sm-5 px-2 m-2"
            elevation={3}
            style={{ backgroundColor: "#c4e8b7" }}
          >
            body
          </Paper>
        </Row>
      </Container>
    </Row>
  );
}
