import React from "react";
import Navbar from "../../NavbarPublic";
import "./styles/gallery.css";

function Gallery(props) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="gallery-container">
        <h1>GALLERY</h1>
      </div>
    </div>
  );
}

export default Gallery;
