import React from "react";
import "./../components/public/styles/home.css";
import { Button } from "@mui/material";

function ButtonComponent({ onClick, text, backgroundColor }) {
  return (
    <div>
      <Button
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 7,
          width: "23.5rem",
        }}
        onClick={onClick}
        className="button-book"
      >
        <h3 className="book">{text}</h3>
      </Button>
    </div>
  );
}

export default ButtonComponent;
