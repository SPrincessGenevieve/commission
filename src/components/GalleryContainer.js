import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import GalleryDis from "./public/GalleryDis";

function GalleryContainer({ updateSelectedImageData, showButtons = true }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef();

  useEffect(() => {
    // Try to fetch the selected image from localStorage
    const storedImage = localStorage.getItem("selectedImage");

    if (storedImage) {
      // If there's a stored image, parse it and set it as the selected image
      setSelectedImage(JSON.parse(storedImage));
    } else {
      // If no stored image, fetch the selected image from your Django backend
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/selected/image/tasks/"
      );
      const selectedImageData = response.data;

      // Update the selected image
      setSelectedImage(selectedImageData);

      // Store the selected image data in localStorage
      localStorage.setItem("selectedImage", JSON.stringify(selectedImageData));
    } catch (error) {
      console.error("Error fetching selected image:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];
    if (!selectedImage) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload/image/tasks/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.message);

      // Update the selected image
      setSelectedImage(response.data);

      // Store the selected image data in localStorage
      localStorage.setItem("selectedImage", JSON.stringify(response.data));

      if (
        updateSelectedImageData &&
        typeof updateSelectedImageData === "function"
      ) {
        updateSelectedImageData(response.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      {showButtons && (
        <>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => fileInputRef.current.click()}
          >
            Upload Image
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
            accept="image/*"
          />
        </>
      )}

      {/* Display the selected image */}
      {selectedImage && (
        <div style={{ height: 300, width: 300 }}>
          <GalleryDis
            style={{ height: 300, width: 300 }}
            selectedImageId={selectedImage.id}
            selectedImageData={selectedImage}
            imageUrl={selectedImage.imageUrl}
          />
        </div>
      )}
    </div>
  );
}

export default GalleryContainer;
