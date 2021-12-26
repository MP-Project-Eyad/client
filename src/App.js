import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup"
import Login from "./components/Login"
import Account  from "./components/Account"
import ResetPassword from "./components/ResetPassword";



const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/verifyAccount/:id" element={<Account />} />
        <Route exact path="/resetPassword/:id" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
