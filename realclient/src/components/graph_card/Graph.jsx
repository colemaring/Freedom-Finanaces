import React, { useState } from "react";
import Chart from "chart.js/auto";
import LineChart from "./LineChart";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";

function Graph({ handleState }) {
  ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );

  const storedData = JSON.parse(localStorage.getItem("surveyData"));
  const endDate = new Date(storedData.goal_date);
  const currentDate = new Date();
  const currentDebt = storedData.current_debt;
  const monthlyPayoff = storedData.monthly_payoff;

  // dynamically creates x axis
  function getMonthYearLabels(startDate, endDate) {
    const labels = [];
    let date = new Date(startDate);

    while (date <= endDate) {
      const month = date.toLocaleString("default", { month: "long" }); // get full month name
      const year = date.getFullYear();
      labels.push(`${month} ${year}`); // store the x value
      date.setMonth(date.getMonth() + 1); // move onto next month
    }

    return labels; // return the x values from present to goal
  }

  const labels = getMonthYearLabels(currentDate, endDate); // get x labels
  const dataPoints = labels.map((label, index) => currentDebt - (monthlyPayoff) * index);

  const data = {
    // present month/year - end month/year
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Using Suggestion 1",
        data: [200, 170, 140, 110, 100, 80, 0], // data points
        fill: false, // Don't fill the area under the line
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        tension: 0.1, // Line tension for smooth curves
      },
    ],
  };

  // Chart options (optional)
  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
    },
  };

  const config = {
    type: "line",
    data: data,
    options: {
      transitions: {
        show: {
          animations: {
            x: {
              from: 0,
            },
            y: {
              from: 0,
            },
          },
        },
        hide: {
          animations: {
            x: { to: 0 },
            y: {
              to: 0,
            },
          },
        },
      },
    },
  };

  return (
    <div className="card">
      <h1>Debt Projection</h1>
      <div>
        <Line data={data} options={config} />
      </div>
    </div>
  );
}

export default Graph;
