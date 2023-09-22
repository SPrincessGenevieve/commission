import React from "react";
import Navbar from "../../NavbarPublic";
import { useNavigate } from "react-router-dom";
import "./styles/home.css";
import BG from "./../../assets/BG.png";
import { Button } from "@mui/material";
import ButtonComponent from "../ButtonComponent";

function Home(props) {
  const navigation = useNavigate();

  const handleLogin = () => {
    navigation("/list");
  };

  const handleForm = () => {
    navigation("/form");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="home-container">
        <div className="home-subcontainer">
          <div className="button-container">
            <ButtonComponent
              text="BOOK NOW"
              onClick={handleForm}
              backgroundColor={"white"}
            ></ButtonComponent>
          </div>
          <div>
            <img
              style={{
                width: "100%",
                height: "70%",
                display: "flex",
              }}
              src={BG}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
