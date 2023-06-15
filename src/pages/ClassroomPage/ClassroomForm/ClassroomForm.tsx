import React from "react"
import { ClassroomCreate } from "../../../models/Classroom";

const API_URL_CLASSROOM = `${process.env.REACT_APP_API_URL as string}/classroom`

interface ClassroomFormProps {
  userToken?: string;
  fetchClassrooms: () => void;
}

const ClassroomForm = (props: ClassroomFormProps): JSX.Element => {
  const nameRef = React.useRef<HTMLInputElement>(null)

  const submitForm = (event: React.FormEvent): void => {
    event.preventDefault()

    if (!nameRef.current?.value?.length) {
      alert("El nombre de la clase es obligatorio")
      return
    }

    const newClassroom: ClassroomCreate = { name: nameRef.current.value }

    fetch(API_URL_CLASSROOM,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${props.userToken as string}`
        },
        body: JSON.stringify(newClassroom)
      })
      .then(async (response) => {
        if (response.status === 201) {
          (nameRef as any).current.value = ""
        } else {
          alert("Ha ocurrido un error")
        }
        return await response.json()
      })
      .then(() => {
        props.fetchClassrooms()
      })
      .catch((error) => {
        console.error(error)
        alert("Ha ocurrido un error en la petición")
      })
  };

  return (
    <form onSubmit={submitForm}>
      <label>Nombre de la clase:</label>
      <input type="text" id="classroom-name" ref={nameRef}></input>
      <button type="submit">
        Enviar formulario de clase a crear
      </button>
    </form>
  );
};

export default ClassroomForm
