import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Students({ currClass, students }) {

  return (
    <Container>
      <h5>{currClass}</h5>
      <ul>{students.map((val) => <li>{val.student_name}</li>)}</ul>
    </Container>
  );
}
