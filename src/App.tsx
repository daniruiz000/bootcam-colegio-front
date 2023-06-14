import React from "react";
import "./App.scss";
import { HashRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ClassroomPage from "./pages/ClassroomPage/ClassroomPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SubjectPage from "./pages/SubjectPage/SubjectPage";
import UserPage from "./pages/UserPage/UserPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <HashRouter>
        <Header/>
        <Routes>
          <Route path="/" element= {<HomePage></HomePage>}>
          </Route>
          <Route
              path="/login"
              element={
                <React.Suspense fallback={<p>Cargando...</p>}>
                  <LoginPage/>
                </React.Suspense>
              }
            ></Route>
          <Route
              path="/classroom"
              element={
                <React.Suspense fallback={<p>Cargando...</p>}>
                  <ClassroomPage/>
                </React.Suspense>
              }
            ></Route>
          <Route
              path="/subject"
              element={
                <React.Suspense fallback={<p>Cargando...</p>}>
                  <SubjectPage/>
                </React.Suspense>
              }
            ></Route>
          <Route
              path="/user"
              element={
                <React.Suspense fallback={<p>Cargando...</p>}>
                  <UserPage/>
                </React.Suspense>
              }
            ></Route>
        </Routes>
        <Footer/>
      </HashRouter>
    </div>
  );
}

export default App;
