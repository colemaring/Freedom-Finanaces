// import "./App.css";

// import Test from "./components/Test";
// import Link from "./components/Link";
// import "bootstrap-icons/font/bootstrap-icons.css";
// // index.js or App.js
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useState } from "react";
// import Dashboard from "./components/dashboard/Dashboard";
// function App() {
//   const [token, setToken] = useState(null);
//   return (
//     <>
//       <Link token={token} setToken={setToken}></Link>
//       <Test token={token} setToken={setToken} />
//       <Dashboard />
//     </>
//   );
// }

// export default App;

/////////////////////////
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login"; // Assuming you have a Login component
import Dashboard from "./pages/Dashboard"; // Assuming you have a Dashboard component
import { useState } from "react";
import TransactionHistory from "./pages/TransactionHistory";

const App = () => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [date, setDate] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/login"
        element={
          <Login
            token={token}
            setToken={setToken}
            setName={setName}
            setDate={setDate}
            date={date}
            name={name}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            token={token}
            setToken={setToken}
            name={name}
            date={date}
          />
        }
      />
      <Route path="/history" element={<TransactionHistory />} />
      {/* <Route 
        path="/survey" 
        element={
        <Survey 
        />
      }  */}
    </Routes>
  );
};

export default App;
