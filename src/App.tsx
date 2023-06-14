import React from "react";
import "./App.scss";
import { HashRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ClassroomPage from "./pages/ClassroomPage/ClassroomPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SubjectPage from "./pages/SubjectPage/SubjectPage";
import UserPage from "./pages/UserPage/UserPage";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <h1>Hola amigos</h1>
      <HashRouter>
        <Routes>
          <Route path="/" element= {<HomePage></HomePage>}>
          </Route>
          <Route
              path="/login"
              element={
                <React.Suspense fallback={<p>Cargando...</p>}>
                  <LoginPage></LoginPage>
                </React.Suspense>
              }
            ></Route>
          <Route
              path="/classroom"
              element={
                <React.Suspense fallback={<p>Cargando...</p>}>
                  <ClassroomPage></ClassroomPage>
                </React.Suspense>
              }
            ></Route>
          <Route
              path="/subject"
              element={
                <React.Suspense fallback={<p>Cargando...</p>}>
                  <SubjectPage></SubjectPage>
                </React.Suspense>
              }
            ></Route>
          <Route
              path="/user"
              element={
                <React.Suspense fallback={<p>Cargando...</p>}>
                  <UserPage></UserPage>
                </React.Suspense>
              }
            ></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
