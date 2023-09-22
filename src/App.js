import "./App.css";
import List from "./components/List";
import Add from "./components/Add";
import Update from "./components/Update";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import Login from "./components/public/Login";
import Home from "./components/public/Home";
import Form from "./components/public/Form";
import About from "./components/public/About";
import Gallery from "./components/public/Gallery";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Routes>
        <Route path="/logout" element={<LoginPage />} />
        <Route path="/list" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update" element={<Update />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
