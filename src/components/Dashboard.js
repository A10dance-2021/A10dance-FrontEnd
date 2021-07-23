import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "./Sidebar";
import Paper from "@material-ui/core/Paper";
import { db } from "../config/firebase";
var moment = require("moment-timezone");

export default function Dashboard() {
  const [date, setDate] = useState("");
  const { currentUser } = useAuth();
  const [formClass, setFormClass] = useState("");
  const [present, setPresent] = useState(0);
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
    async function fetchAttendance(val) {
      const startOfDay = moment().tz("Asia/Singapore").startOf("day").toDate();
      const endOfDay = moment().tz("Asia/Singapore").endOf("day").toDate();
      const snapshot = await db
        .collection("attendance")
        .where("student_id", "==", val.student_id)
        .where("reporting_time", ">=", startOfDay)
        .where("reporting_time", "<=", endOfDay)
        .limit(1)
        .get();
      if (snapshot.size > 0) {
        return true;
      }
      return false;
    }
    async function fetchFormClass(e) {
      let currClass = "";
      await db
        .collection("formclass")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            currClass = doc.data().form_class;
            setFormClass(doc.data().form_class);
          }
        });
      let students = [];
      await db
        .collection("students")
        .where("student_class", "==", currClass)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => students.push(doc.data()));
        });
      setCapacity(students.length);
      Promise.all(students.map((val) => fetchAttendance(val))).then(
        (item) => {
          setPresent(item.filter((num) => num).length);
        }
      );
    }
    fetchFormClass();
  }, [currentUser.uid]);

  return (
    <Row className="d-flex w-100">
      <Container className="col-3">
        <Sidebar />
      </Container>

      <Container className="col-9 justify-content-center">
        <h5 className="col-12 pt-3">{date}</h5>
        <h1 className="text-center">Welcome Back, {currentUser.displayName}</h1>
        <Row className="col-12 mt-5 align-middle">
          <Paper
            className="col-5 px-5 ml-5 justify-content-center"
            elevation={3}
            style={{ backgroundColor: "#c4e8b7" }}
          >
            <Row className="d-flex justify-content-center m-5">
              <h5>Form Class: {formClass}</h5>
              <h1 className="align-middle">
                {present}/{capacity}
              </h1>
            </Row>
          </Paper>
        </Row>
      </Container>
    </Row>
  );
}
