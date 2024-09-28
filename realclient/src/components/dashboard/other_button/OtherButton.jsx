import React from "react";
import { useNavigate } from "react-router-dom";
import "./other_button.css";

function OtherButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="button-container">
      <button type="button" className="custom-button" onClick={handleClick}>
        Log Out
      </button>
    </div>
  );
}

export default OtherButton;
