import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Students({ currClass, students, loading }) {

  return (
    <Container>
      <h5>{currClass}</h5>
      {!loading && <ul>{students.map((val) => <li>{val.student_name}</li>)}</ul>}
    </Container>
  );
}
