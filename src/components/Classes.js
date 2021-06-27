import React, { useState, useEffect } from "react";
import { Container, Row, DropdownButton, Dropdown } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Students from "./Students";
import { db } from "../config/firebase";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [currClass, setCurrClass] = useState("No Class Selected");
  let list = [];
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchClasses();
  }, []);

  async function fetchClasses(e) {
    setLoading(true);
    list = [];
    await db
      .collection("classes")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          list.push(doc.data().class_name);
        });
      })
      .then(() => {
        setClasses(list);
        setLoading(false);
      });
  }

  async function fetchStudents(val) {
    setLoading(true);
    list = [];
    setCurrClass(val);
    await db
      .collection("students")
      .where("student_class", "==", val)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => list.push(doc.data()));
      })
      .then(() => setStudents(list));
    setLoading(false);
  }

  return (
    <Row className="d-flex">
      <Container className="col-3">
        <Sidebar />
      </Container>
      <Container className="col-9 justify-content-center">
        <h2 className="my-5">Classes</h2>
        <DropdownButton id="dropdown-basic-button" title="Class List">
          {!loading &&
            classes.map((val) => (
              <Dropdown.Item
                value={val}
                as="button"
                onClick={(e) => {
                  fetchStudents(e.target.value);
                }}
              >
                {val}
              </Dropdown.Item>
            ))}
        </DropdownButton>
        <Students currClass={currClass} loading={loading} students={students} />
      </Container>
    </Row>
  );
}
