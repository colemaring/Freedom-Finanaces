import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar"; //import icons
import AddAccount from "./components/AddAccount";
import "bootstrap-icons/font/bootstrap-icons.css";
// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/Main";

function App() {
  return (
    <>
      <Header />
      <SideBar />

      <Main />
      <AddAccount />
    </>
  );
}

export default App;
