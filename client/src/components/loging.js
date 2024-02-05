import React from "react";
import "./loging.css";

const loging = () => {
  const loginwithgoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };
  return (
    <div>
      <>
        <div className="login-page">
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <div className="from">
            <form className="login-form">
              <input type="text" name="" id="" placeholder="username" />
              <input type="password" name="" id="" placeholder="password" />
              <button>Login</button>
              <p className="message">
                Not Registerd? <a href="/">Create an account</a>
              </p>
            </form>
            <button className="login-with-google-btn" onClick={loginwithgoogle}>
              Sign In with Google
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default loging;
