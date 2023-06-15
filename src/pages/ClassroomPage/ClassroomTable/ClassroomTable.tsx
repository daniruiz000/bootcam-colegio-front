import { ClassroomResponse } from "../../../models/Classroom"

interface ClassroomProps {
  classrooms: ClassroomResponse[];
}
const ClassroomTable = (props: ClassroomProps): JSX.Element => {
  return <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>NAME</th>
      </tr>
    </thead>
    <tbody>
      {props?.classrooms.map((classroom: ClassroomResponse) => (
        <tr key={classroom._id}>
          <td>{classroom._id}</td>
          <td>{classroom.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
}

export default ClassroomTable
