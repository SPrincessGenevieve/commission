import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import GalleryDis from "./public/GalleryDis";
import Gallery from "./public/Gallery";
import { useDropzone } from "react-dropzone";

function GalleryContainer({ updateSelectedImageData, showButtons = true }) {
  const [images, setImages] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [selectedImageData, setSelectedImageData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/pictures/tasks/").then((response) => {
      setImages(response.data);
    });

    const storedImageIds = JSON.parse(localStorage.getItem("selectedImageIds"));
    if (storedImageIds) {
      setSelectedImageIds(storedImageIds);
    }
  }, []);

  useEffect(() => {
    if (selectedImageIds.length > 0) {
      Promise.all(
        selectedImageIds.map((id) =>
          axios.get(`http://localhost:8000/api/pictures/tasks/${id}/`)
        )
      )
        .then((responses) => {
          const imageData = responses.map((response) => response.data);
          setSelectedImageData(imageData);
        })
        .catch((error) => {
          console.error("Error fetching selected image data:", error);
        });
    }
  }, [selectedImageIds]);

  const onDrop = (acceptedFiles) => {
    const formDataArray = acceptedFiles.map((selectedImage) => {
      const formData = new FormData();
      formData.append("image", selectedImage);
      return formData;
    });

    Promise.all(
      formDataArray.map((formData) =>
        axios.post("http://localhost:8000/api/upload/image/tasks/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      )
    )
      .then((responses) => {
        console.log(
          "Uploaded images:",
          responses.map((response) => response.data)
        );

        const newImageIds = responses.map((response) => response.data.id);
        const updatedSelectedImageIds = [...selectedImageIds, ...newImageIds];
        setSelectedImageIds(updatedSelectedImageIds);
        localStorage.setItem(
          "selectedImageIds",
          JSON.stringify(updatedSelectedImageIds)
        );

        if (
          updateSelectedImageData &&
          typeof updateSelectedImageData === "function"
        ) {
          const updatedImageData = [
            ...selectedImageData,
            ...responses.map((response) => response.data),
          ];
          setSelectedImageData(updatedImageData);
          updateSelectedImageData(updatedImageData);
        }
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div>
      {showButtons && (
        <div>
          {/* Custom button for uploading images */}
          <div {...getRootProps()} style={{ display: "inline-block" }}>
            <input {...getInputProps()} style={{ display: "none" }} />
            <Button style={{ backgroundColor: "red" }} onClick={() => {}}>
              Upload Images
            </Button>
          </div>
        </div>
      )}
      <div>
        {selectedImageData.map((imageData) => (
          <div key={imageData.id} style={{ margin: "10px" }}>
            <GalleryDis
              selectedImageId={imageData.id}
              selectedImageData={imageData}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryContainer;
