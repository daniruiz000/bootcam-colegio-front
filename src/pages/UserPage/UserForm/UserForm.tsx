import { useRef } from "react";
import { ROL, UserCreate } from "../../../models/User";

interface UserFormProps {
  userToken?: string;
  fetchUsers: () => void;
}

const UserForm = (props: UserFormProps): JSX.Element => {
  const API_URL_USER = `${process.env.REACT_APP_API_URL as string}/user`;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const rolRef = useRef<HTMLSelectElement>(null);

  const submitForm = (event: React.FormEvent): void => {
    event.preventDefault();

    const userToCreate: UserCreate = {
      email: emailRef.current?.value as string,
      firstName: firstNameRef.current?.value as string,
      lastName: lastNameRef.current?.value as string,
      rol: rolRef.current?.value as ROL,
      password: passwordRef.current?.value as string,
      children: []
    };

    if (!userToCreate.email || !userToCreate.firstName || !userToCreate.lastName || !userToCreate.rol) {
      alert("Debes introducir todos los campos");
      return;
    }

    fetch(API_URL_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.userToken as string}`,
      },
      body: JSON.stringify(userToCreate),
    })
      .then(async (response) => {
        if (response.status === 201) {
          (emailRef as any).current.value = "";
          (firstNameRef as any).current.value = "";
          (lastNameRef as any).current.value = "";
          (rolRef as any).current.value = "";
          (passwordRef as any).current.value = "";
        } else {
          alert("Ha ocurrido un error");
        }
        return await response.json();
      })
      .then(() => {
        props.fetchUsers();
      })
      .catch((error) => {
        alert("Ha ocurrido un error en la petición");
        console.error(error);
      });
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="user-email">Email:</label>
      <input id="user-email" ref={emailRef} type="email" required />

      <label htmlFor="user-password">Password:</label>
      <input id="user-password" ref={passwordRef} type="text" required />

      <label htmlFor="user-first-name">Nombre:</label>
      <input id="user-first-name" ref={firstNameRef} type="text" required />

      <label htmlFor="user-last-name">Apellido:</label>
      <input id="user-last-name" ref={lastNameRef} type="text" required />

      <label htmlFor="user-rol">Rol:</label>
      <select id="user-rol" ref={rolRef} required>
        <option value="">--Selecciona un rol--</option>
        <option value="TEACHER">Teacher</option>
        <option value="STUDENT">Student</option>
        <option value="ADMIN">Admin</option>
        <option value="PARENT">Parent</option>
      </select>

      <button type="submit">Crear usuario</button>
    </form>
  );
};

export default UserForm;
