import React, { useEffect, useState } from "react";
import axios from "axios";

const Data = () => {
  const [address, setAddress] = useState("");
  //
  const [userdata, setUserdata] = useState({});
  // console.log("responseeeee", userdata)

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/sucess", {
        withCredentials: true,
      });
      setUserdata(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  //
  const id = userdata._id;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Making a POST request to the server
    try {
      const response = await fetch("http://localhost:6005", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, id }),
      });

      const data = await response.json();

      console.log("Server response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Submit Your data</h1>
      <form onSubmit={handleSubmit}>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Data;
