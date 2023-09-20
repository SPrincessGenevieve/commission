import React from "react";
import Navbar from "./../Navbar";
import "./styles/add.css";

function Add(props) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="list-container">
        <h3>Add Employee List</h3>
      </div>
    </div>
  );
}

export default Add;
