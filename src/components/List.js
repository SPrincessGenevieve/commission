import React from "react";
import Navbar from "./../Navbar";
import "./styles/list.css";
import TableComponent from "./TableComponent";

export default function List(props) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="list-container">
        <h3>Employee List</h3>
        <TableComponent></TableComponent>
      </div>
    </div>
  );
}
