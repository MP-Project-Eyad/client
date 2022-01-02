import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PasswordChecklist from "react-password-checklist";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const MySwal = withReactContent(Swal);
const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  const signup = async () => {
    try {
      setMessage("");
      const res = await axios.post(`${BASE_URL}/signUp`, {
        userName: username,
        email: email,
        password: password,
        
      });
      
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'You will receive a confirmation email ',
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/login");
      
      
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        // iconColor:"blue",
        text: "Email already exist!",
        confirmButtonColor: "black",
      });
      // setMessage(res.data.message);
    }
   
      

  
  };

  return (
    <div className="signupWrapper">
      {state.token ? (
        <h1>
          <div className="centerWrapper">
            <div className="homeSignupTitle">
              <p>You already loggedin, you don't need to signup</p>
            </div>
            <div className="homeSignupButtons">
              <button onClick={() => navigate("/")}>HOME</button>
            </div>
          </div>
        </h1>
      ) : (
        <main className="signupPanel">
          
          <div className="loginDiv">
            <h1>check Password:</h1>
            <PasswordChecklist
              rules={[
                "minLength",
                "specialChar",
                "number",
                "capital",
                "lowercase",
              ]}
              minLength={6}
              value={password}
              onChange={(isValid) => {
                if (isValid) {
                  const button = document.querySelector("#signupSubmitButton");
                  button.disabled = false;
                } else {
                  const button = document.querySelector("#signupSubmitButton");
                  button.disabled = true;
                }
              }}
            />
            <button id="loginButton" className="btnBK" onClick={() => navigate("/login")}>
              or go to login
            </button>
          </div>
          <div  className="signupDiv">
            <h2>Signup</h2>
            {message ? <div className="message">{message}</div> : ""}
            <form
              className="signupInput"
              onSubmit={(e) => {
                e.preventDefault();
                signup(e);
              }}
            >
              <input
              className="signupInput1"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
              className="signupInput1"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
              className="signupInput1"
              defaultValue=""
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                id="signupSubmitButton"
                type="submit"
                value="Submit"
                disabled
              />
            </form>
          </div>
        </main>
      )}
    </div>
  );
};

export default Signup;
