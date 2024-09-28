import React, { useState } from "react";
import "./main.css";
import PageTitle from "./PageTitle";
import Dashboard from "./Dashboard"; // Assuming Dashboard is defined elsewhere
import Divider from "./Divider";

function Main() {
  // Use state to manage the name and page
  const [name, setName] = useState("Cole");
  const [page, setPage] = useState("Dashboard");

  return (
    <main id="main" className="main">
      {/* Pass name and page as props to PageTitle */}
      <PageTitle page={page} name={name} />
      <Dashboard />
      <Divider />
    </main>
  );
}

export default Main;
