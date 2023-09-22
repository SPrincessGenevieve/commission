import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import GalleryDis from "./public/GalleryDis";
import ImageDisplay from "./public/ImageDisplay";

function GalleryContainer({
  updateSelectedImageData,
  showButtons = true,
  selectedImageId,
  selectedImageData,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    // Fetch all images from your Django backend
    axios
      .get("http://localhost:8000/api/all/images/tasks/")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
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

  useEffect(() => {
    // Fetch all images from your Django backend
    axios.get("http://localhost:8000/api/pictures/tasks/").then((response) => {
      setImages(response.data);
    });
  }, []);

  // Define a function to group images into rows with a maximum of 5 images per row
  const groupImagesIntoRows = () => {
    const rows = [];
    for (let i = 0; i < images.length; i += 5) {
      rows.push(images.slice(i, i + 5));
    }
    return rows;
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
        <div
          style={{
            height: 1000,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <GalleryDis
            style={{
              width: "40%",
              display: "flex",
              borderRadius: 50,
              marginTop: 170,
            }}
            selectedImageId={selectedImage.id}
            selectedImageData={selectedImage}
            imageUrl={selectedImage.imageUrl}
          />
        </div>
      )}

      {/* Render ALL IMAGES HERE */}
      {selectedImageData ? (
        <div>
          <h2>Selected Image</h2>
          <ImageDisplay imageId={selectedImageId} />
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {groupImagesIntoRows().map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              marginBottom: 20,
            }}
          >
            {row.map((image) => (
              <div style={{ marginRight: 20 }}>
                <ImageDisplay
                  style={{
                    height: 290,
                    width: 290,
                    borderRadius: 40,
                    boxShadow: "1px 1px 10px 1px #864646",
                  }}
                  key={image.id}
                  imageId={image.id}
                />
              </div>
            ))}
          </div>
        ))}
        {images.length === 0 && <p>No images available.</p>}
      </div>
    </div>
  );
}

export default GalleryContainer;
