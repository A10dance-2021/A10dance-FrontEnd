import React from "react";
import { Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";

export default function Classes() {
  return (
    <Row className="d-flex">
      <Container className="col-3">
        <Sidebar />
      </Container>
      <Container className="col-9 justify-content-center">
          <h2 className="my-5">Classes</h2>
      </Container>
    </Row>
  );
}
