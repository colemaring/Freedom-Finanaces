import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TransactionHistory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      // Fetch transactions data
      const transactionsResponse = await fetch(
        `https://freedomfinances.xyz/api/transactions`,
        {
          method: "GET",
        }
      );

      const transactionsData = await transactionsResponse.json();
      if (transactionsData.error != null) {
        console.log(transactionsData.error);
        setError(transactionsData.error);
        return;
      }
      setData(transactionsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ margin: "6rem", marginTop: "2rem" }}>
      <h1 style={{ color: "white" }}>Transaction History</h1>

      {loading && <p style={{ color: "white" }}>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#333", color: "white" }}>
            <tr>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Date
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Amount
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Merchant
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {data.latest_transactions.map((transaction, index) => (
              <tr key={transaction.transaction_id}>
                <td
                  style={{
                    color: "white",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  {new Date(transaction.authorized_date).toLocaleDateString()}
                </td>
                <td
                  style={{
                    color: "white",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  ${transaction.amount.toFixed(2)}
                </td>
                <td
                  style={{
                    color: "white",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  {transaction.merchant_name || transaction.name}
                </td>
                <td
                  style={{
                    color: "white",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  {transaction.category.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "1rem",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default TransactionHistory;
