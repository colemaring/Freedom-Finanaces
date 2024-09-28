import React, { useState, useEffect } from "react";
import SuggestionsCard from "./SuggestionsCard";
import "./suggestions.css";
import OpenAI from "openai";
import image from "../../assets/images/sparkles.png";

const Suggestions = ({ handleState }) => {
  const [suggestion1, setSuggestion1] = useState(null);
  const [suggestion2, setSuggestion2] = useState(null);
  const [suggestion3, setSuggestion3] = useState(null);

  const [data, setData] = useState(null);
  const [chatResponse, setChatResponse] = useState("");

  const getData = async () => {
    console.log("getData called");

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

    console.log(transactionsData);
    setData(transactionsData);

    // Fetch liabilities data
    const liabilitiesResponse = await fetch(
      `http://localhost:8000/api/liabilities`,
      {
        method: "GET",
      }
    );

    const liabilitiesData = await liabilitiesResponse.json();
    if (liabilitiesData.error != null) {
      console.log(liabilitiesData.error);
      return;
    }

    console.log(liabilitiesData);

    // Combine transactions and liabilities data
    // const combinedData = {
    //   ...transactionsData,
    //   liabilities: liabilitiesData,
    // };
  };

  useEffect(() => {
    getData();
  }, []);

  const openai = new OpenAI({
    apiKey:
      "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",
    dangerouslyAllowBrowser: true,
  });

  const chatWithGPT3 = async (transactionData) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: `given the transactions list, respond with ONLY ONE suggestion baseed on these strict criteria.
1. Use the avalanche method to pay off high interest loans first
2. Give a recommendation to cut down on one of the spending categories, and how much to cut down by. be reasonable with your suggestions.
3. Increase the amount you are paying of the loan/debt by

format the responses as 1. suggestion 1, 2. suggestion 2, 3. suggestion 3. Do not include any other text other then the 3 bullet points. Each bullet point should be two sentences

${JSON.stringify(transactionData)}`,
          },
        ],
      });

      console.log(response); // Log the entire response for debugging

      // Check if response has data and choices
      if (response && response.choices && response.choices.length > 0) {
        const suggestions = response.choices[0].message.content
          .split("\n")
          .filter((line) => line.trim() !== "");
        setSuggestion1(suggestions[0]);
        setSuggestion2(suggestions[1]);
        setSuggestion3(suggestions[2]);
      } else {
        console.error("Unexpected response structure:", response);
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

  return (
    <div className="card">
      <h2>
        Personalized AI Suggestions to Reduce Your Debt
        <img
          src={image}
          alt="AI"
          width="20"
          height="20"
          style={{ display: "inline-block", marginLeft: "0.5rem" }}
        />
      </h2>
      <div className="content-box">
        <div className="details">
          <SuggestionsCard content={suggestion1} handleState={handleState} />
          <SuggestionsCard content={suggestion2} handleState={handleState} />
          <SuggestionsCard content={suggestion3} handleState={handleState} />
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
