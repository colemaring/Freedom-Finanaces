import React, { useEffect, useState } from "react";
const Test = ({ token }) => {
  const [data, setData] = useState(null);
  const [chatResponse, setChatResponse] = useState("");

  const getData = async () => {
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

  const chatWithGPT3 = async (transactionData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      const chatResponseData = await response.json();
      setChatResponse(chatResponseData);
    } catch (error) {
      console.error("Error fetching chat response:", error);
    }
  };

  useEffect(() => {
    if (data) {
      chatWithGPT3(data);
    }
  }, [data]);

  return (
    <div>
      <h2 style={{ color: "white" }}>ChatGPT Response:</h2>
      <p style={{ color: "white" }}>{chatResponse}</p>
    </div>
  );
};

export default Test;
