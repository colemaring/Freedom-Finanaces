import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
// import "./index.css";

// Temporarily remove StrictMode for debugging
createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
