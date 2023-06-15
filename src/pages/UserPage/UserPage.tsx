import React from "react";
import "./UserPage.scss";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";
import UserForm from "./UserForm/UserForm";
import UserTable from "./UserTable/UserTable";
import { UserResponse } from "../../models/User";

const API_URL_USER = `${process.env.REACT_APP_API_URL as string}/user`

const UserPage = (): JSX.Element => {
  const authInfo = React.useContext(AuthContext)
  const [users, setUsers] = React.useState<UserResponse[]>([])

  React.useEffect(() => {
    fetchUsers()
  }, [authInfo])

  const fetchUsers = (): void => {
    if (authInfo?.userInfo && authInfo?.userToken) {
      fetch(API_URL_USER, {
        headers: {
          Authorization: `Bearer ${authInfo?.userToken}`
        }
      }).then(async response => {
        if (response.status !== 200) {
          alert("Ha ocurrido un error en la petición")
        }
        return await response.json()
      }).then(responseParsed => {
        setUsers(responseParsed.data);
      })
        .catch(error => {
          alert("Ha ocurrido un error en la petición")
          console.error(error);
        })
    }
  }
  return (
    <div className="user-page page">
      {
        authInfo?.userInfo ? (
          <>
            <h1>User Page</h1>
            <h3>Listado de Usuarios:</h3>
            <UserTable users={users}/>
            <h3>Creación de un Usuario:</h3>
            <UserForm fetchUsers={fetchUsers} userToken={authInfo.userToken}></UserForm>
          </>
        ) : (
          <Navigate to="/login" replace={true}></Navigate>
        )
      }
    </div>

  );
};
export default UserPage;
