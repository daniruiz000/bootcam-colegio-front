import React from "react";
import "./ClassroomPage.scss";
import { AuthContext } from "../../App";
import { Navigate } from "react-router-dom";
import { ClassroomResponse } from "../../models/Classroom";
import ClassroomTable from "./ClassroomTable/ClassroomTable";
import ClassroomForm from "./ClassroomForm/ClassroomForm";
import Header from "../../components/Header/Header";

const API_URL_CLASSROOM = `${process.env.REACT_APP_API_URL as string}/classroom`

const ClassroomPage = (): JSX.Element => {
  const authInfo = React.useContext(AuthContext)
  const [classrooms, setClassrooms] = React.useState<ClassroomResponse[]>([])

  React.useEffect(() => {
    fetchClassrooms()
  }, [authInfo])

  const fetchClassrooms = (): void => {
    if (authInfo?.userInfo && authInfo?.userToken) {
      fetch(API_URL_CLASSROOM, {
        headers: {
          Authorization: `Bearer ${authInfo?.userToken}`
        }
      }).then(async response => {
        if (response.status !== 200) {
          alert("Ha ocurrido un error en la petición")
        }
        return await response.json()
      }).then(responseParsed => {
        setClassrooms(responseParsed.data);
      })
        .catch(error => {
          alert("Ha ocurrido un error en la petición")
          console.error(error);
        })
    }
  }
  return (
    <div className="classroom-page page">
      <Header/>
      {
        authInfo?.userInfo ? (
          <>
            <h1>ClassroomPage</h1>
            <h3>Listado de Clases:</h3>
            <ClassroomTable classrooms={classrooms}/>
            <h3>Creación de una clase:</h3>
            <ClassroomForm fetchClassrooms={fetchClassrooms} userToken={authInfo.userToken}></ClassroomForm>
          </>
        ) : (
          <Navigate to="/login" replace={true}></Navigate>
        )
      }
    </div>
  );
};
export default ClassroomPage;
