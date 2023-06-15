import React from "react";
import "./SubjectPage.scss";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";
import SubjectForm from "./SubjectForm/SubjectForm";
import SubjectTable from "./SubjectTable/SubjectTable";
import { SubjectResponse } from "../../models/Subject";

const API_URL_SUBJECT = `${process.env.REACT_APP_API_URL as string}/subject`

const SubjectPage = (): JSX.Element => {
  const authInfo = React.useContext(AuthContext)
  const [subjects, setSubjects] = React.useState<SubjectResponse[]>([])

  React.useEffect(() => {
    fetchSubjects()
  }, [authInfo])

  const fetchSubjects = (): void => {
    if (authInfo?.userInfo && authInfo?.userToken) {
      fetch(API_URL_SUBJECT, {
        headers: {
          Authorization: `Bearer ${authInfo?.userToken}`
        }
      }).then(async response => {
        if (response.status !== 200) {
          alert("Ha ocurrido un error en la petición")
        }
        return await response.json()
      }).then(responseParsed => {
        setSubjects(responseParsed.data);
      })
        .catch(error => {
          alert("Ha ocurrido un error en la petición")
          console.error(error);
        })
    }
  }
  return (
    <div className="subject-page page">
      {
        authInfo?.userInfo ? (
          <>
            <h1>Subject Page</h1>
            <h3>Listado de Asignaturas:</h3>
            <SubjectTable subjects={subjects}/>
            <h3>Creación de una Asignatura:</h3>
            <SubjectForm fetchSubjects={fetchSubjects} userToken={authInfo.userToken}></SubjectForm>
          </>
        ) : (
          <Navigate to="/login" replace={true}></Navigate>
        )
      }
    </div>

  );
};
export default SubjectPage;
