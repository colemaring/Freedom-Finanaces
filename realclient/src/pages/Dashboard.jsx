import React from "react";
import DashboardComponent from "../components/dashboard/DashboardComponent.jsx";

const Dashboard = ({ token, name, date }) => {
  return (
    <>
      <DashboardComponent token={token} />
    </>
  );
};

export default Dashboard;
