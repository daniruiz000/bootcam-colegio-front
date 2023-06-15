import React from "react"
import { SubjectCreate } from "../../../models/Subject";

const API_URL_SUBJECT = `${process.env.REACT_APP_API_URL as string}/subject`

interface SubjectFormProps {
  userToken?: string;
  fetchSubjects: () => void;
}

const SubjectForm = (props: SubjectFormProps): JSX.Element => {
  const nameRef = React.useRef<HTMLInputElement>(null)
  const classroomIdRef = React.useRef<HTMLInputElement>(null)
  const teacherIdRef = React.useRef<HTMLInputElement>(null)
  const submitForm = (event: React.FormEvent): void => {
    event.preventDefault()

    if (!nameRef.current?.value?.length ||
      !teacherIdRef.current?.value?.length ||
      !classroomIdRef.current?.value?.length) {
      alert("Todos los campos son obligatorios")
      return
    }

    const newSubject: SubjectCreate = {
      name: nameRef.current.value,
      classroom: classroomIdRef.current.value,
      teacher: teacherIdRef.current.value,
    }

    fetch(API_URL_SUBJECT,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${props.userToken as string}`
        },
        body: JSON.stringify(newSubject)
      })
      .then(async (response) => {
        if (response.status === 201) {
          (nameRef as any).current.value = "";
          (teacherIdRef as any).current.value = "";
          (classroomIdRef as any).current.value = ""
        } else {
          alert("Ha ocurrido un error")
        }
        return await response.json()
      })
      .then(() => {
        props.fetchSubjects()
      })
      .catch((error) => {
        console.error(error)
        alert("Ha ocurrido un error en la petición")
      })
  };

  return (
    <form onSubmit={submitForm}>
      <label>Nombre de la asignatura:</label>
      <input type="text" id="subject-name" ref={nameRef}></input>
      <label>ID de la clase:</label>
      <input type="text" id="subject-class" ref={classroomIdRef}></input>
      <label>ID del profesor:</label>
      <input type="text" id="subject-teacher" ref={teacherIdRef}></input>
      <button type="submit">
        Enviar formulario de clase a crear
      </button>
    </form>
  );
};

export default SubjectForm
