import React from "react";
import "./LoginPage.scss";
import { AuthContext } from "../../App";
const API_URL_LOGIN = `${process.env.REACT_APP_API_URL as string}/user/login`

interface LogInInfo {
  email: string;
  password: string;
}

const LoginPage = (): JSX.Element => {
  const authInfo = React.useContext(AuthContext)

  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  const submitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const loginInfo: LogInInfo = {
      email: emailRef?.current?.value as string,
      password: passwordRef?.current?.value as string
    }
    if (!loginInfo.email || !loginInfo.password) {
      alert("Email y contraseña son obligatorios")
    } else {
      doLoginRequest(loginInfo)
    }
  }

  const doLoginRequest = (loginInfo: LogInInfo): void => {
    fetch(API_URL_LOGIN, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "Content-type": "application/json" }
    })
      .then(async response => {
        if (response.status !== 200) {
          alert("Login incorrecto")
        }
        return await response.json()
      })
      .then(data => {
        // Login ok save credentials
        console.log(data)
        if (data.token && data.user && authInfo.logIn) {
          authInfo.logIn(data.token, data.user)
        }
      })
      .catch(error => {
        alert("Ha ocurrido un error en la petición")
        console.error(error)
      })
  }

  return (
    <div className="login-page page">
      {
        authInfo?.userInfo ? (
          <>
            <p>Bienvenido {authInfo.userInfo?.firstName}</p>
            <p>Si quieres salir pulsa aquí</p>
            <button onClick={authInfo.logOut}>Logout</button>
          </>
        ) : (
          <form onSubmit={submitForm} className="login-page__form">
            <label htmlFor="email">Email:</label>
            <input ref={emailRef} type="text" id="email"></input>
            <label htmlFor="password">Password:</label>
            <input ref={passwordRef} type="text" id="password"></input>

            <input type="submit" title="LogIn"></input>
          </form>
        )}
    </div>
  );
};
export default LoginPage;
