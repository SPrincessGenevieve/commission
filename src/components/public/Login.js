import React from "react";
import Navbar from "../../NavbarPublic";
import { useNavigate } from "react-router-dom";

function Login({}) {
  const navigation = useNavigate();

  const handleLogin = () => {
    navigation("/list");
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <h1>Login Page</h1>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
