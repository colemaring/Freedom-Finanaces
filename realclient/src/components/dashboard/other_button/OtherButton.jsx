import React from "react";
import { useNavigate } from "react-router-dom";
import "./other_button.css";

function OtherButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <button
      type="button"
      className="custom-button logout"
      onClick={handleClick}
    >
      Log Out
    </button>
  );
}

export default OtherButton;
