import React, { useState, useEffect } from "react";
import Navbar from "./../Navbar";
import "./styles/add.css";
import GalleryContainer from "./GalleryContainer";

function Add({ updateSelectedImageData }) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="list-container">
        <h3>Add Employee List</h3>
      </div>
      <div style={{ height: 20, width: 20 }}>
        <GalleryContainer></GalleryContainer>
      </div>
    </div>
  );
}

export default Add;
