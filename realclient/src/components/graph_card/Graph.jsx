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

function Graph({ handleState, sum }) {
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

  // get y values using equation y = debt - (monthly_payoff * quantity_of_months)
  function getYValues(labels) {
    const values = [];
    for (let i = 1; i <= labels.length; i++) {
      values.push(currentDebt - monthlyPayoff * i); // store the y value
    }

    return values; // return the y values
  }

  function getYValues2(labels) {
    const values = [];
    for (let i = 1; i <= labels.length; i++) {
      values.push(currentDebt - (monthlyPayoff * i + sum * i));
    }

    return values; // return the y values
  }

  const labels = getMonthYearLabels(currentDate, endDate); // get x labels
  const values = getYValues(labels); // get y values
  const values2 = getYValues2(labels); // increased monthly payoff
  console.log(values2);
  const data = {
    labels,
    datasets: [
      {
        label: "Debt Payoff Progress",
        data: values,
        fill: false,
        borderColor: "rgba(93, 116, 241, 1)",
        borderWidth: 4,
        tension: 0.1,
      },

      {
        label: "Debt Payoff Progress (Increased)",
        data: values2,
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 4,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
      <h2>Debt Projection</h2>
      <div style={{ width: "100%", height: "100%" }}>
        <Line data={data} options={config} />
      </div>
    </div>
  );
}

export default Graph;
