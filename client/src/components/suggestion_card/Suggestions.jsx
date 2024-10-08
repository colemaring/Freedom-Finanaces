import React, { useState, useEffect } from "react";
import SuggestionsCard from "./SuggestionsCard";
import "./suggestions.css";
import OpenAI from "openai";
import Tooltip from "../tool_tip/Tooltip";
import image from "../../assets/images/sparkles.png";
import { FaFontAwesome } from "react-icons/fa";

const Suggestions = ({ handleState, setSum, sum }) => {
  const [suggestion1, setSuggestion1] = useState(null);
  const [suggestion2, setSuggestion2] = useState(null);
  const [suggestion3, setSuggestion3] = useState(null);
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [enabled3, setEnabled3] = useState(false);

  const [data, setData] = useState(null);
  const [chatResponse, setChatResponse] = useState("");

  const tip =
    "Personalized budgeting and debt reduction tips to help you find financial freedom. Powered by AI.";

  const getData = async () => {
    // Fetch transactions data
    const transactionsResponse = await fetch(
      `http://localhost:8000/api/transactions`,
      {
        method: "GET",
      }
    );

    const transactionsData = await transactionsResponse.json();
    if (transactionsData.error != null) {
      console.log(transactionsData.error);
      return;
    }

    setData(transactionsData);
  };

  useEffect(() => {
    getData();
  }, []);

  const chatWithGPT3 = async (transactionData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionData }),
      });

      const responseData = await response.json(); // Parse the JSON data

      // Check if response has data and choices
      if (
        responseData &&
        responseData.choices &&
        responseData.choices.length > 0
      ) {
        const suggestions = responseData.choices[0].message.content
          .split("\n")
          .filter((line) => line.trim() !== "");
        setSuggestion1(suggestions[0]);
        setSuggestion2(suggestions[1]);
        setSuggestion3(suggestions[2]);
      } else {
        console.error("Unexpected response structure:", responseData);
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
  };

  useEffect(() => {
    if (data) {
      chatWithGPT3(data);
    }
  }, [data]);

  const getArbVal1 = async (suggestion1) => {
    try {
      const storedData = JSON.parse(localStorage.getItem("surveyData"));
      const response = await fetch(`http://localhost:8000/api/chat2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ storedData, suggestion1 }),
      });

      const responsenum = await response.json();
      let val = responsenum.choices[0].message.content.trim();
      let numberVal = parseFloat(val); // Convert the response to a number
      console.log(numberVal);

      if (isNaN(numberVal)) {
        throw new Error("The response is not a valid number");
      }

      return numberVal;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      return null; // Return null in case of an error
    }
  };

  // const getArbVal1 = async (suggestion1) => {
  //   try {
  //     const storedData = JSON.parse(localStorage.getItem("surveyData"));
  //     const response = await openai.chat.completions.create({
  //       model: "gpt-3.5-turbo",
  //       messages: [
  //         {
  //           role: "system",
  //           content: "You are a helpful assistant.",
  //         },
  //         {
  //           role: "user",
  //           content: `Based on the following suggestion, return a number that represents the amount per month you would be saving if you followed the suggestion's advice. The number should fit a realistic person's timeline for paying back a loan with the following amount of debt: ${storedData.current_debt}. Here is the suggestion to follow: ${suggestion1}. ONLY RETURN A SINGLE NUMBER, AND NOTHING ELSE. NO DOLLAR SIGN OR PERIOD`,
  //         },
  //       ],
  //     });
  //     console.log(response.choices[0].message.content.trim());
  //     let val = response.choices[0].message.content.trim();
  //     let numberVal = parseFloat(val); // Convert the response to a number

  //     if (isNaN(numberVal)) {
  //       throw new Error("The response is not a valid number");
  //     }

  //     return numberVal;
  //   } catch (error) {
  //     console.error("Error calling OpenAI API:", error);
  //     return null; // Return null in case of an error
  //   }
  // };

  useEffect(() => {
    const calculateSum = async () => {
      let newSum = 0;
      if (enabled1) {
        const val1 = await getArbVal1(suggestion1);
        newSum += val1 || 0; // Add value if it's not null
      }
      if (enabled2) {
        const val2 = await getArbVal1(suggestion2);
        newSum += val2 || 0; // Add value if it's not null
      }
      if (enabled3) {
        const val3 = await getArbVal1(suggestion3);
        newSum += val3 || 0; // Add value if it's not null
      }
      setSum(newSum);
    };

    calculateSum();
  }, [enabled1, enabled2, enabled3, suggestion1, suggestion2, suggestion3]);

  return (
    <div className="card">
      <div
        className="header_suggestions"
        style={{ display: "flex", alignItems: "center" }}
      >
        <h2 style={{ marginRight: "8px" }}>
          Select Personalized AI Suggestions to Reduce Your Debt
          <img
            src={image}
            alt="AI"
            width="20"
            height="20"
            style={{ display: "inline-block", marginLeft: "0.5rem" }}
          />
          {"    "}
          <span style={{ marginLeft: "auto", fontSize: 16, fontWeight: 300 }}>
            <Tooltip id="tip" tip={tip} />
          </span>
        </h2>
      </div>
      <div className="content-box">
        <div className="details">
          <SuggestionsCard
            setEnabled={setEnabled1}
            enabled={enabled1}
            content={suggestion1}
            handleState={handleState}
          />
          <SuggestionsCard
            setEnabled={setEnabled2}
            enabled={enabled2}
            content={suggestion2}
            handleState={handleState}
          />
          <SuggestionsCard
            setEnabled={setEnabled3}
            enabled={enabled3}
            content={suggestion3}
            handleState={handleState}
          />
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
