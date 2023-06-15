import React from "react";
import { SubjectResponse } from "../../../models/Subject"

interface SubjectProps {
  subjects: SubjectResponse[];
}
const SubjectTable = (props: SubjectProps): JSX.Element => {
  return <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>TEACHER ID</th>
        <th>TEACHER FIRSTNAME</th>
        <th>TEACHER LASTNAME</th>
        <th>CLASSROOM</th>
      </tr>
    </thead>
    <tbody>
      {props?.subjects.map((subject: SubjectResponse) => (
        <tr key={subject._id}>
          <td>{subject._id}</td>
          <td>{subject.name}</td>
          <td>{subject.teacher._id}</td>
          <td>{subject.teacher.firstName}</td>
          <td>{subject.teacher.lastName}</td>
          <td>{subject.classroom.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
}

export default SubjectTable
