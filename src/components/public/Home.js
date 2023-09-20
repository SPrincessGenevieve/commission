import React from "react";
import Navbar from "../../NavbarPublic";
import { useNavigate } from "react-router-dom";
import "./styles/home.css";

function Home(props) {
  const navigation = useNavigate();

  const handleLogin = () => {
    navigation("/list");
  };

  const handleForm = () => {
    navigation("/form");
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="home-container">
        <h1>Home Page</h1>
      </div>
      <button onClick={handleForm}>Form</button>
    </div>
  );
}

export default Home;
