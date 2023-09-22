import React from "react";
import Navbar from "../../NavbarPublic";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import InputText from "./../InputText";
import ButtonComponent from "./../ButtonComponent";

function Login({}) {
  const navigation = useNavigate();

  const handleLogin = () => {
    navigation("/list");
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="login-container">
        <div className="login-subcontainer">
          <div>
            <div className="login-container-white">
              <div>
                <div>
                  <InputText label={"USERNAME"}></InputText>
                </div>
                <div style={{ marginTop: 25 }}>
                  <InputText type={"password"} label={"PASSWORD"}></InputText>
                </div>
              </div>
              <div style={{ marginTop: 75 }}>
                <ButtonComponent
                  onClick={handleLogin}
                  text={"LOGIN"}
                  backgroundColor={"#FFECEC"}
                ></ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
