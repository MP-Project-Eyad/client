import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup"
import Login from "./components/Login"
import Account  from "./components/Account"
import ResetPassword from "./components/ResetPassword";
import Restaurant from "./components/Restaurant";
import Nav from "./components/Nav"



const App = () => {
  return (
    <>
    {/* <Nav/> */}
      <Routes>
      <Route exact path="/" element={<Restaurant />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/verifyAccount/:id" element={<Account />} />
        <Route exact path="/resetPassword/:id" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
