import React from "react";
import { useNavigate } from "react-router-dom";
import "./addAccount.css";

function OtherButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/history");
  };

  return (
    <button type="button" className="add transactions" onClick={handleClick}>
      Transactions
    </button>
  );
}

export default OtherButton;
