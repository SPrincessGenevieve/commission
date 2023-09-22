import React, { useEffect, useState } from "react";
import Navbar from "./../Navbar";
import axios from "axios";

function Update(props) {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(1); // Default ID to fetch, change as needed
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    // Make an HTTP GET request to fetch the data
    axios
      .get("http://localhost:8000/api/local/tasks/")
      .then((response) => {
        setData(response.data);
        // Find the data item with the selected ID
        const item = response.data.find((item) => item.id === selectedId);
        setSelectedData(item);
        setEditedDescription(item.description); // Initialize editedDescription with the current description
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedId]);

  const handleIdChange = (e) => {
    const newSelectedId = parseInt(e.target.value, 10);
    setSelectedId(newSelectedId);
  };

  const handleDescriptionChange = (e) => {
    // Limit the text to a maximum of 1000 characters
    const text = e.target.value.slice(0, 1000);
    setEditedDescription(text);
  };

  const handleSaveChanges = () => {
    // Make an HTTP PUT request to update the data
    axios
      .put(`http://localhost:8000/api/local/tasks/${selectedId}/`, {
        description: editedDescription,
      })
      .then((response) => {
        // Update the selectedData with the updated description
        setSelectedData({ ...selectedData, description: editedDescription });
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div>
        <Navbar></Navbar>
      <div className="about-container">
        <h1>ABOUT US</h1>

        {selectedData && (
          <div
            style={{
              backgroundColor: "red",
              width: "100%",
              height: "200px", // Set a fixed height here
              display: "flex",
              flexDirection: "column",
            }}
          >
            <textarea
              value={editedDescription}
              onChange={handleDescriptionChange}
              style={{
                width: "100%",
                height: "100%", // Set a fixed height here
                border: "none",
                resize: "none",
                overflowY: "hidden", // Hide overflow
              }}
              maxLength={1000} // Set the maximum character length
            ></textarea>
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Update;
