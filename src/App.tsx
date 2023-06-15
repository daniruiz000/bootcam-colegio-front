import "./App.scss";
import { HashRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ClassroomPage from "./pages/ClassroomPage/ClassroomPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SubjectPage from "./pages/SubjectPage/SubjectPage";
import UserPage from "./pages/UserPage/UserPage";
import Footer from "./components/Footer/Footer";

import React, { createContext, useState } from "react";
import { UserResponse } from "./models/User";

interface AuthContextInfo {
  userInfo?: UserResponse;
  userToken?: string;
  logIn?: (userToken: string, userInfo: UserResponse) => void;
  logOut?: () => void;
}

export const AuthContext = createContext<AuthContextInfo>({})

const App = (): JSX.Element => {
  const [userToken, setUserToken] = useState<string | undefined>()
  const [userInfo, setUserInfo] = useState<UserResponse | undefined>()

  const logIn = (userTokenFromApi: string, userInfoFromApi: UserResponse): void => {
    setUserToken(userTokenFromApi)
    setUserInfo(userInfoFromApi)
  }

  const logOut = (): void => {
    setUserToken(undefined)
    setUserInfo(undefined)
  }
  return (
    <div className="App">
      <AuthContext.Provider value={{ userInfo, userToken, logIn, logOut }}>
        <HashRouter>
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
      </AuthContext.Provider>
    </div>
  );
}

export default App;
