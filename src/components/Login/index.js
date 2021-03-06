import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Loginn } from "./../../reducers/Login";
import "./style.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);
// const popupTools = require("popup-tools");
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emilOrUserName, setEmilOrUserName] = useState("");
 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });
  console.log(state);
  const login = async () => {
    setMessage("");
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email: emilOrUserName,
        password,
        userName: emilOrUserName,
      });
      console.log(res.data.result._id);
      dispatch(
        Loginn({
          role: res.data.result.role,
          token: res.data.token,
          id: res.data.result._id,
        })
      );
      localStorage.setItem("newUser", emilOrUserName);
      localStorage.setItem("id", res.data.result._id);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged in successfully ",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.message);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong email or password, please try again.",
        confirmButtonColor: "black",
      });
    }
  };

 

  const forgotPassword = async () => {
    const { value: email } = await MySwal.fire({
      title: "Forgot Password",
      input: "email",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (email) {
      try {
        await axios.post(`${BASE_URL}/email_check`, {
          email,
        });
        MySwal.fire({
          icon: "success",
          text: "Check your email to reset the password",
          confirmButtonColor: "black",
        });
      } catch (error) {
        MySwal.fire({
          icon: "error",
          text: "Something went wrong!",
          confirmButtonColor: "black",
        });
      }
    }
  };

  return (
    <div className="loginWrapper">
      {state.token ? (
        <>
          <div>
            <div>
              <p>You already loggedin, you don't need to login</p>
            </div>
            <div className="homeButtons">
              <button onClick={() => navigate("/")}>home</button>
            </div>
          </div>
        </>
      ) : (
        <main className="panel">
          <div>
            <h2>Login</h2>
            {message ? <div className="message">{message}</div> : ""}
            <form
              className="input"
              onSubmit={(e) => {
                e.preventDefault();
                login(e);
              }}
            >
              <input
                className="signupInput1"
                type="text"
                placeholder="Email/Username"
                onChange={(e) => setEmilOrUserName(e.target.value)}
                required
              />
              <input
                className="signupInput1"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="forgotPassword" onClick={forgotPassword}>
                forgot your password?
              </p>
              <input id="submitButton" type="submit" value="Submit" />
            </form>
          </div>
          <div className="signUpDiv">
            <h2 className="gotosignUp">Hello, friend!</h2>
            <p className="gotosignUp">
              if you haven't registered yet, sign up to receive our weekly
              offers
            </p>
            <button
              className="gotosignUp"
              id="signupButton"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default Login;
