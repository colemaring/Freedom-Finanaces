import React, { useState } from "react";
import "./dashboard.css";
import Graph from "../graph_card/Graph";
import Suggestions from "../suggestion_card/Suggestions";
import AddAccount from "./add_account_buttom/AddAccount";
import OtherButton from "./other_button/OtherButton";
import AISuggestion from "../AISuggestion";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap CSS
import Stats from "../Stats";

function DashboardComponent({ token }) {
  const [name, setName] = useState("Cole");
  const storedData = JSON.parse(localStorage.getItem("surveyData"));
  const username = storedData.name;
  const endGoal = storedData.goal;

  let [clickState, setClickState] = useState("Initial");
  function handleState() {
    setClickState("state Changed from child component!");
    console.log("state changed");
  }

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="align-items-center">
          <div className="col-6">
            {" "}
            {/* Take more space for header */}
            <div className="header">
              <h1 className="title" style={{ color: "white", fontSize: 24 }}>
                Welcome back, {username}
              </h1>

              <h2 className="dash" style={{ color: "white", fontSize: 48 }}>
                Dashboard
              </h2>

              <p
                className="description"
                style={{ color: "white", fontSize: 15 }}
              >
                Here is your financial summary...
              </p>
            </div>
          </div>
          <div className="col-3 text-end">
            {" "}
            {/* Logo section */}
            {/* <div className="logo">
              <img
                src="https://i.ibb.co/310c8Y3/BACKREMOVED.png"
                width={100}
                height={100}
                alt="Logo"
              />
            </div> */}
          </div>
        </div>
        <div
          className="button-container"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            display: "flex",
          }}
        >
          <AddAccount />
          <OtherButton />
        </div>
      </div>

      <Stats />

      <div className="content">
        {/* TO DO: Pass through end goal and loan amount */}
        <Suggestions handleState={handleState} />
        {/* TO DO: Pass through end goal */}
        <Graph handleState={handleState} />
      </div>
    </div>
  );
}

export default DashboardComponent;
