import React, { useState, useEffect } from "react";
import Navbar from "../../NavbarPublic";
import "./styles/gallery.css";
import { Button } from "@mui/material";
import axios from "axios";
import ImageDisplay from "./ImageDisplay";

// ... (other code)

function GalleryDis({ selectedImageId, selectedImageData, style }) {
  const [images, setImages] = useState([]); // State to store the list of images

  useEffect(() => {
    // Fetch all images from your Django backend
    axios.get("http://localhost:8000/api/pictures/tasks/").then((response) => {
      setImages(response.data);
    });
  }, []);

  return (
    <div>
      <div className="gallery-container">
        <div>
          {selectedImageId && selectedImageData ? (
            <div>
              <img style={style} src={selectedImageData.image} alt="Selected" />
            </div>
          ) : (
            <p>No image selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default GalleryDis;
