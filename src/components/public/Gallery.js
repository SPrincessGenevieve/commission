import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../NavbarPublic";
import "./styles/gallery.css";
import ImageDisplay from "./ImageDisplay";
import GalleryContainer from "../GalleryContainer";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pictures/tasks/")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return (
    <div>
      <div className="gallery-container">
        <Navbar />
        <h1>GALLERY</h1>
        <GalleryContainer images={images} showButtons={false} />{" "}
        {/* Pass showButtons prop */}
      </div>
    </div>
  );
}

export default Gallery;
