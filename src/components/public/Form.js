import React, { useState } from "react";
import Navbar from "../../NavbarPublic";
import "./styles/form.css";
import axios from "axios";

function Form(props) {
  // Create state variables to hold form data
  const [formData, setFormData] = useState({
    ID: "",
    NAME: "",
    DATE: "",
    DUE: "",
    FEE: "",
    CONTACT_NO: "",
    EMAIL: "",
    STATUS: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/tasks/", formData);
      console.log("Response from Django API:", response.data);
      setFormData({
        ID: "",
        NAME: "",
        DATE: "",
        DUE: "",
        FEE: "",
        CONTACT_NO: "",
        EMAIL: "",
        STATUS: "",
      });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>FORM</h1>
        <form
          style={{ flexDirection: "column", display: "flex", width: "20rem" }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="ID"
            value={formData.ID}
            placeholder="ID"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="NAME"
            value={formData.NAME}
            placeholder="Name"
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="DATE"
            value={formData.DATE}
            placeholder="Date"
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="DUE"
            value={formData.DUE}
            placeholder="Due Date"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="FEE"
            value={formData.FEE}
            placeholder="Fee"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="CONTACT_NO"
            value={formData.CONTACT_NO}
            placeholder="Contact No."
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="EMAIL"
            value={formData.EMAIL}
            placeholder="Email"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="STATUS"
            value={formData.STATUS}
            placeholder="Status"
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit} type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
