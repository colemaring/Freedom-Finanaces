import React, { useEffect, useState } from "react";
import { OpenAI } from "openai";

const Test = ({ token }) => {
  const [data, setData] = useState(null);
  const [chatResponse, setChatResponse] = useState("");

  const getData = async () => {
    console.log("getData called");

    try {
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

      console.log(libilitiesData);

      setData(transactionsData + libilitiesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getData();
    } else {
      console.log("Token is null");
    }
  }, [token]);

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
            content: `given this transaction history and current liabilities and debt, put transactions into 4 categories, shopping, dining, essentials, and experiences. For each category transactions, list the average monthly spend. 
After creating the list, respond with 3 suggestion baseed on these strict criteria.
1. Use the avalanche method to pay off high interest loans first
2. Give a recommendation to cut down on one of the spending categories, and how much to cut down by. be reasonable with your suggestions.
3. Increase the amount you are paying of the loan/debt by

format the responses as 1. suggestion 1, 2. suggestion 2, 3. suggestion 3.

${JSON.stringify(transactionData)}`,
          },
        ],
      });

      console.log(response); // Log the entire response for debugging

      // Check if response has data and choices
      if (response && response.choices && response.choices.length > 0) {
        setChatResponse(response.choices[0].message.content);
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
    <div>
      {/* <h1>Transactions Data:</h1>
      {data
        ? data.latest_transactions.map((transaction, index) => (
            <div key={index}>
              <p>Amount: {transaction.amount}</p>
              <p>Categories: {transaction.category.join(", ")}</p>
              <p>Date: {transaction.date}</p>
              <p>
                Name/Website:{" "}
                {transaction.counterparties[0].name ||
                  transaction.counterparties[0].website}
              </p>
              <hr />
            </div>
          ))
        : "Loading..."} */}
      <h2 style={{ color: "white" }}>ChatGPT Response:</h2>
      <p style={{ color: "white" }}>{chatResponse}</p>
    </div>
  );
};

export default Test;
