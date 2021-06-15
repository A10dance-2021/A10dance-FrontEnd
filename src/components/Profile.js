import React, { useRef } from "react";
import { Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const nameRef = useRef();
  const {currentUser} = useAuth();
  return (
    <Row className="d-flex">
      <Container className="col-3">
        <Sidebar />
      </Container>
      <Container className="col-9 justify-content-center">
        <h2 className="my-5">Profile</h2>
        <Row className='col-12'>
          <strong className="col-4 d-inline m-3">Name:</strong>
          <p className="col-4 d-inline m-3">{currentUser.displayName}</p>
        </Row>
        <Row className='col-12'>
          <strong className="col-4 d-inline m-3">Email:</strong>
          <p className="col-4 d-inline m-3">{currentUser.email}</p>
        </Row>
        <Row className='col-12'>
          <strong className="col-4 d-inline m-3">Form Class:</strong>
          <p className="col-4 d-inline m-3">409</p>
        </Row>
      </Container>
    </Row>
  );
}
