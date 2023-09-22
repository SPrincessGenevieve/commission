import React, { useState, useEffect } from "react";
import Navbar from "./../Navbar";
import "./styles/add.css";
import GalleryContainer from "./GalleryContainer";

function Add({ updateSelectedImageData }) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="list-container">
        <div className="list-subcontainer">
          <div style={{ marginTop: "-5%" }}>
            <GalleryContainer></GalleryContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
