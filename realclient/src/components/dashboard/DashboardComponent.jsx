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
  const [sum, setSum] = useState(0);
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
            <div
              className="header"
              style={{ marginLeft: "-55px", marginTop: "-20px" }}
            >
              <h1
                className="title"
                style={{ color: "white", fontSize: 24, fontWeight: 500 }}
              >
                Welcome back,{" "}
                <span style={{ color: "#5D74F1" }}>{username}</span>
              </h1>

              <h2
                className="dash"
                style={{
                  color: "white",
                  fontSize: 56,
                  fontWeight: "45S0",
                  marginTop: "-9px",
                }}
              >
                Dashboard
              </h2>
              <div
                className="button-container"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  paddingRight: "60px",
                  paddingTop: "50px",

                  display: "flex",
                }}
              >
                <AddAccount />
                <OtherButton />
              </div>
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
      </div>

      <Stats />

      <div className="content">
        {/* TO DO: Pass through end goal and loan amount */}
        <Suggestions sum={sum} setSum={setSum} handleState={handleState} />
        {/* TO DO: Pass through end goal */}
        <Graph sum={sum} handleState={handleState} />
      </div>
    </div>
  );
}

export default DashboardComponent;
