import React from "react";
import { useNavigate } from "react-router-dom";
import "./addAccount.css";

function OtherButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/history");
  };

  return (
    <div className="button-container">
      <button
        style={{ marginLeft: "20rem" }}
        type="button"
        className="add hvr-sweep-to-right"
        onClick={handleClick}
      >
        Transactions
      </button>
    </div>
  );
}

export default OtherButton;
