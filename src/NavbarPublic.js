import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./styles.css";
import "./mobile.css";

function Navbar(props) {
  const [showNav, setShowNav] = useState(false);

  const handleToggleNav = () => {
    console.log("Toggle button clicked"); // Add this line
    setShowNav(!showNav);
  };

  return (
    <nav className={`nav ${showNav ? "show" : ""}`}>
      <div className="toggle-button" onClick={handleToggleNav}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-list ${showNav ? "show" : ""}`}>
        <li className={`nav-item logout-item ${showNav ? "show" : ""}`}>
          <CustomLink className="logout-link" to="/">
            Home
          </CustomLink>
        </li>
        <CustomLink to="/gallery">Gallery</CustomLink>
        <CustomLink to="/about">About us</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
