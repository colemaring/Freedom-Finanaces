import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css"; // Adjust the path as necessary
import Typewriter from "typewriter-effect";

const Landing = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="row">
        {/* Left side: Text Content */}
        <div className="col-md-4 text-content">
          <div
            className="typewriter-text"
            style={{ fontSize: "36px", color: "white" }}
          >
            <Typewriter
              options={{
                delay: 4, // Speed of typing (lower means faster)
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("The Easier ")
                  .typeString("<span style='color: #5D74F1;'>Solution</span>")
                  .typeString(" to Manage Your ")
                  .typeString("<span style='color: #5D74F1;'>Debt</span>")
                  .typeString(".")
                  .pauseFor(2000)
                  .deleteAll()
                  .pauseFor(500) // Short pause before typing the next string
                  .typeString("Click below to begin!")
                  .pauseFor(2000)
                  .deleteAll()
                  .pauseFor(500) // Short pause before typing the next string
                  .typeString("The Easier ")
                  .typeString("<span style='color: #5D74F1;'>Solution</span>")
                  .typeString(" to Manage Your ")
                  .typeString("<span style='color: #5D74F1;'>Debt</span>")
                  .typeString(".")
                  .pauseFor(10000)
                  .start();
              }}
            />
          </div>

          <p className="description-text">
            Discover new ways to manage your debt, connect with other motivated
            individuals, and achieve your financial goals.
          </p>
          <button className="start-button" onClick={handleStartClick}>
            Start Now
          </button>
        </div>

        {/* Right side: Image Content */}
        <div className="col-md-8 image-content">
          <img
            src="https://i.ibb.co/GWgD3ds/Bananana.png"
            alt="Illustration representing debt management"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }} // Keeps the image within the column width
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
