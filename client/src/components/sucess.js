import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sucess = () => {
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/sucess", {
        withCredentials: true,
      });
      console.log("response", response);
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    getUser();
  });

  return (
    <div>
      <h1>Sucess Page</h1>
      <button onClick={() => navigate("/data")}>form</button>
    </div>
  );
};

export default Sucess;
