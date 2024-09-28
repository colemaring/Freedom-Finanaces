import React from "react";
import "./pageTitle.css";

function PageTitle({ page, name }) {
  return (
    <div className="pagetitle">
      <div className="dash">
        Welcome back, {name}!
      </div>
      <nav>
        <h1 className="dashboard">{page}</h1>
      </nav>
    </div>
  );
}

export default PageTitle;

