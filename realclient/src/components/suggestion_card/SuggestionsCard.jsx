import React, { useState } from "react";

const SuggestionsCard = ({
  title,
  content,
  handleState,
  setEnabled,
  enabled,
}) => {
  const cardStyle = {
    borderRadius: "8px",
    padding: "10px",
    marginLeft: "2px",
    marginRight: "2px",
    marginTop: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
  };

  const cardContentStyle = {
    fontSize: "1em",
    color: "#333",
  };

  const buttonStyle = {
    backgroundColor: enabled ? "#dddddd" : "#ffffff",
    color: enabled ? "#000000" : "#000000",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
    fontWeight: "bold", 
  };

  const handleClick = () => {
    handleState();
    setEnabled(!enabled); 
  };

  const emojiStyle = {
    position: "absolute",
    left: "15px",
    fontSize: "1.5em",
  };

  return (
    <div style={cardStyle}>
      <div style={cardContentStyle}>
        {enabled && <span style={emojiStyle}>✅</span>}
        <button style={buttonStyle} onClick={handleClick}>
          {content}
        </button>
      </div>
    </div>
  );
};

export default SuggestionsCard;
