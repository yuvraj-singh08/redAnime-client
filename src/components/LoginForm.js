import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/LoginForm.css';

function LoginForm() {
  const navigate = useNavigate(); // initialize the useNavigate hook
  const session = localStorage.getItem("sessionToken");
  useEffect(() => {
    if (session === "myToken") {
      navigate('/home');
      console.log("MKC navigate nahi hua");
    }
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setIsValid(data.message === "true");
    if (data.message === "true") {
      console.log(data);
      localStorage.setItem("sessionToken", "myToken");
      localStorage.setItem("id", data._id);
      navigate("/home"); // redirect to "/home" on successful login
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
  };

  return (
    <div className="container">
      {localStorage.getItem("sessionToken") ? (
        <div>

          <button
            onClick={handleLogout}
            className=""
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="form-container">
          <div className="image-container">
            <img alt="Anime girl" src="./images/ladki.png" className="image" width="480px" height={"650px"}></img>
          </div>
          {/* <div className="image-container2">
            <img src="./images/ladki.png" className="image2" width="480px" height={"650px"} ></img>
          </div> */}
          <form className="form-login" onSubmit={handleSubmit}>
            <h1 className=" heading ">Welcome to KISSANIME </h1>

            <label htmlFor="email" className="form-label ">
              Username or Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" form-input"
              required
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" form-input"
            />

            <div className="form-btn-container">
            <button
              type="submit"
              className="form-button"
            >
              Submit
            </button>
            </div>

            <div>
              <a className="link" href="/">Sign Up?</a>
            </div>
          </form>
        </div>

      )}
      {!isValid && localStorage.getItem("sessionToken") && (
        <p className="text-red-500 mt-4">Invalid email or password.</p>
      )}
      <div>hello</div>
    </div>
  );
}

export default LoginForm;