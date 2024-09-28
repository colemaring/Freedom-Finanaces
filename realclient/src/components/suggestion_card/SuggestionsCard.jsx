import React, { useState } from "react";

const SuggestionsCard = ({ title, content, handleState }) => {
  const cardStyle = {
    borderRadius: "8px",
    padding: "10px",
    marginLeft: "2px",
    marginRight: "2px",
    marginTop: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added drop shadow
  };

  const cardContentStyle = {
    fontSize: "1em",
    color: "#333",
  };

  return (
    <div style={cardStyle}>
      <div style={cardContentStyle}>
        <button className="buttonStyle" onClick={() => handleState()}>
          {content}
        </button>
      </div>
    </div>
  );
};

export default SuggestionsCard;
