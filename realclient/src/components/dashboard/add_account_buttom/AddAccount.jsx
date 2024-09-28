import React from "react";
import { useNavigate } from "react-router-dom";
import "./addAccount.css";

function OtherButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/history");
  };

  return (
    <div className="button-container">
      <button
        style={{ marginLeft: "20rem" }}
        type="button"
        className="add"
        onClick={handleClick}
      >
        Transactions
      </button>
    </div>
  );
}

export default OtherButton;
///////////////////
// export default AddAccount;

// import React from "react";
// import "./addAccount.css";

// function AddAccount() {
//   return (
//     <div className="button-container">

//       <button type="button" className="add" >
//         Add Account
//       </button>
//     </div>
//   );
// }

// export default AddAccount;
