import React, { useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import "./survey.css";
import Typewriter from "typewriter-effect";
//import ParticlesComponent from "./components/particles";
const Survey = ({ openBankLink, isBankLinkReady }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState({
    name: "",
    employment: "",
    goal_date: new Date(),
    current_debt: 0,
    monthly_payoff: 0,
  });

  const questions = [
    { question: "Hi there! What is your name?", name: "name" },
    { question: "How much debt do you currently have?", name: "current_debt" },
    {
      question: "How much do you pay off your debt monthly?",
      name: "monthly_payoff",
    },
    { question: "When is your goal to be debt-free?", name: "goal_date" },
  ];

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  // check if there is a next question, if there is update index. if not, open the connect to bank function
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setInputValue("");
    } else {
      // store survey results in local storage
      store();
      // open the banking function
      if (isBankLinkReady) {
        openBankLink();
      } else {
        console.log("Bank link not ready");
      }
    }
  };

  const store = () => {
    console.log("storing data");
    // store the object in local storage as a JSON string
    localStorage.setItem("surveyData", JSON.stringify(data));
  };

  return (
    <>
      <div className="allofsurvey">
        {/* <ParticlesComponent id="particles" />{" "} */}
        <div className="st">
          <h2>Almost there... Just a few questions!</h2>
        </div>
        <div className="quiz-container">
          <div className="question-box">
            <h2 className="question">
              {questions[currentQuestionIndex].question}
            </h2>
            <input
              className="input-admin"
              type={
                questions[currentQuestionIndex].name === "goal_date"
                  ? "date"
                  : "text"
              }
              placeholder={
                questions[currentQuestionIndex].name === "goal_date"
                  ? ""
                  : "Type here..."
              }
              name={questions[currentQuestionIndex].name}
              value={inputValue}
              onChange={handleChange}
            />
          </div>

          <button className="next-button" onClick={handleNext}>
            {currentQuestionIndex < questions.length - 1
              ? "Continue"
              : "Connect to Bank"}
          </button>
        </div>
      </div>
    </>
  );
};
/* <body>
      <div className="wrapper">
        <span></span>
        <span></span>
        <span></span>

        <span></span>
      </div>
      <div className = "banner">
          <div class="content">
            <h2>
              </h2>
      </div>
</body> */
export default Survey;
