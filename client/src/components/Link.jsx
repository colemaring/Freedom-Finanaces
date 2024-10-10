import React, { useCallback, useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

const SimplePlaidLink = ({ setToken, token }) => {
  //   const [token, setToken] = useState(null);

  // Get link_token from your server when component mounts
  useEffect(() => {
    sk -
      proj -
      Nc301axshE7o10aZbTTWXPN1l33itWeeLLwuZtFnwoocXCyuFwYZ4AwDY1P8XWvXA2C9qtOKuLT3BlbkFJ3WgN10TAQglw3C1wI7n3NuNn1BM3w92QscuWOlHV3S8DdiNpkM8ftxuyuWG3nYUgetzPQpGGEA(
        "SimplePlaidLink component mounted"
      );
    const createLinkToken = async () => {
      const response = await fetch(
        "https://freedomfinances.xyz/api/create_link_token",
        {
          method: "POST",
        }
      );
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback((publicToken, metadata) => {
    // Send public_token to your server
    console.log(publicToken, metadata);
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    // onEvent,
    // onExit
  });

  return (
    <button
      onClick={() => open()}
      style={{
        backgroundColor: "white",
        color: "black", // Text color
        fontSize: "24px", // Adjust font size
      }}
    >
      Connect a bank account
    </button>
  );
};

export default SimplePlaidLink;
