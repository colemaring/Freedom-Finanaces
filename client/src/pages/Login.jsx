import React, { useCallback, useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useNavigate } from "react-router-dom";
import Survey from "../components/survey/Survey";

const Login = ({ setToken, token, setName, setDate, date, name }) => {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isItemAccess, setIsItemAccess] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);

  // Get link_token from your server when component mounts
  useEffect(() => {
    console.log("SimplePlaidLink component mounted");
    const createLinkToken = async () => {
      const response = await fetch(
        "http://localhost:8000/api/create_link_token",
        {
          method: "POST",
        }
      );
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, [setToken]);

  const onSuccess = useCallback(
    (public_token) => {
      // If the access_token is needed, send public_token to server
      const exchangePublicTokenForAccessToken = async () => {
        const response = await fetch(
          "http://localhost:8000/api/set_access_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: `public_token=${public_token}`,
          }
        );
        if (!response.ok) {
          setItemId("no item_id retrieved");
          setAccessToken("no access_token retrieved");
          setIsItemAccess(false);
          return;
        }
        const data = await response.json();
        setItemId(data.item_id);
        setAccessToken(data.access_token);
        setIsItemAccess(true);
        // Navigate to /dashboard after successfully exchanging the token
        navigate("/dashboard");
      };

      exchangePublicTokenForAccessToken();

      setLinkSuccess(true);
    },
    [navigate]
  );

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    // onEvent,
    // onExit
  });

  return (
    <div styles={{ marginTop: "3rem" }}>
      <Survey openBankLink={open} isBankLinkReady={ready} />
    </div>
  );
};

export default Login;
