import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import "./Tooltip.css";

function Tooltip({ tip }) {
  return (
    <div className="tooltip-trigger">
      <FaRegQuestionCircle />
      <div className="tooltip">{tip}</div>
    </div>
  );
}

export default Tooltip;
