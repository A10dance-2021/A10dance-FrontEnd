import React, { useState, useEffect } from "react";
import { Container, Row, DropdownButton, Dropdown } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Students from "./Students";
import { db } from "../config/firebase";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [currClass, setCurrClass] = useState("none");
  let list = [];
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchClasses();
  }, []);

  async function changeClass(val) {
    setLoading(true);
    setCurrClass(val);
    console.log(currClass);
  }

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
      });
    setClasses(list);
    setLoading(false);
  }

  async function fetchStudents(e) {
    e.preventDefault();
    setLoading(true);
    list = [];
    await db
      .collection("students")
      .where("student_class", "==", currClass)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => list.push(doc.data()));
      });
    setStudents(list);
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
                  changeClass(e.target.value).then(() => fetchStudents(e));
                }}
              >
                {val}
              </Dropdown.Item>
            ))}
        </DropdownButton>
        {!loading && (
          <Container>
            <h5>{currClass}</h5>
            <ul>
              {students.map((val) => (
                <li>{val.student_name}</li>
              ))}
            </ul>
          </Container>
        )}
      </Container>
    </Row>
  );
}
