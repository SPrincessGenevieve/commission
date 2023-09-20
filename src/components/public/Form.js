import React from "react";
import Navbar from "../../NavbarPublic";
import "./styles/form.css";

function Form(props) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="form-container">
        <h1>FORM</h1>
        <div
          style={{ flexDirection: "column", display: "flex", width: "20rem" }}
        >
          <input placeholder="name"></input>
          <input placeholder="payment fee "></input>
          <input placeholder="contact no."></input>
          <input placeholder="email"></input>
          <input placeholder="due date"></input>
          <button>Upload reference</button>
          <input placeholder="Describe chuchu"></input>
          <button>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
