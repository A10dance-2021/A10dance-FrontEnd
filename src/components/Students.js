import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { db } from "../config/firebase";
var moment = require("moment-timezone");

export default function Students({ currClass, students, loading }) {
  const [time, setTime] = useState([]);

  useEffect(() => {
    Promise.all(students.map((val) => fetchAttendance(val))).then((val) => {
      setTime(val);
      console.log(val);
    });
  }, [students]);

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
      const time = snapshot.docs[0].data().reporting_time;
      return moment(time.toDate())
        .tz("Asia/Singapore")
        .format("MMMM Do YYYY, h:mm:ss a");
    }
    return "NOT PRESENT";
  }

  return (
    <Container>
      <h3 className="my-5">{currClass}</h3>
      {currClass !== "No Class Selected" && (
        <Table style={{ backgroundColor: "#c4e8b7" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Reporting Time</th>
            </tr>
          </thead>
          <tbody>
            {students.map((val, index) => (
              <tr
                key={index}
                style={
                  time[index] === "NOT PRESENT"
                    ? { backgroundColor: "pink" }
                    : { backgroundColor: "white" }
                }
              >
                <td>{index + 1}</td>
                <td>{val.student_name}</td>
                <td>{time[index]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
