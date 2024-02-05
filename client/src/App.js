import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Headers from "./components/header";
import Login from "./components/loging";
import Sucess from "./components/sucess";
import Data from "./components/data";
import Error from "./components/error";
function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sucess" element={<Sucess />} />
        <Route path="/data" element={<Data />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
