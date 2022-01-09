import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import MainRouts from "./components/Routs/MainRoutes";

import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";

function App() {
  return (
    <>
      <Header />
      <MainRouts />
      <ToastContainer autoClose={3000} position="top-center" />
    </>
  );
}

export default App;
