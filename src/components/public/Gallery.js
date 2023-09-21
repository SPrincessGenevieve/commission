import React from "react";
import Navbar from "../../NavbarPublic";
import "./styles/gallery.css";
import ImageDisplay from "./ImageDisplay";
import GalleryContainer from "../GalleryContainer";

function Gallery({ selectedImageData }) {
  return (
    <div>
      <div className="gallery-container">
        <Navbar></Navbar>
        <h1>GALLERY</h1>
        <GalleryContainer showButtons={false}></GalleryContainer>
      </div>
    </div>
  );
}

export default Gallery;
