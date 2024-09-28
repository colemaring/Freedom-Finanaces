import React, { useEffect, useState } from "react";
const OpenAI = require("openai");

const Test = () => {
  const [data, setData] = useState(null);
  const [chatResponse, setChatResponse] = useState("");

  useEffect(() => {
    console.log("Test component mounted");
    const getData = async () => {
      console.log("getData called");
      // setIsLoading(true);
      const response = await fetch(`/api/transactions`, { method: "GET" });
      const data = await response.json();
      if (data.error != null) {
        // setError(data.error);
        // setIsLoading(false);
        console.log(data.error);
        return;
      }
      // setTransformedData(props.transformData(data)); // transform data into proper format for each individual product
      console.log(data);
      setData(data);
      // if (data.pdf != null) {
      //   setPdf(data.pdf);
      // }
      // setShowTable(true);
      // setIsLoading(false);
    };

    getData();
  }, []);

  const openai = new OpenAI({
    apiKey: "hehehe",
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
            content: `Given this transaction data, generate financial advice: ${JSON.stringify(
              transactionData
            )}`,
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
      <h1>Transactions Data:</h1>
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
        : "Loading..."}
      <h2>ChatGPT Response:</h2>
      <p>{chatResponse}</p>
    </div>
  );
};

export default Test;
