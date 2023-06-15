import React from "react";
import "./HomePage.scss";
import Header from "../../components/Header/Header";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Header/>
      <h1>Home Page</h1>
      <p>Bienvenidos a la web del colegio Molón</p>
    </div>
  );
};
export default HomePage;
