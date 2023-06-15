import React from "react";
import { UserResponse } from "../../../models/User"

interface UserProps {
  users: UserResponse[];
}
const UserTable = (props: UserProps): JSX.Element => {
  return <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Email</th>
        <th>Rol</th>
      </tr>
    </thead>
    <tbody>
      {props?.users.map((user: UserResponse) => (
        <tr key={user._id}>
          <td>{user._id}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.rol}</td>
        </tr>
      ))}
    </tbody>
  </table>
}

export default UserTable
