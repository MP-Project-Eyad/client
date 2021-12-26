import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup"
import Login from "./components/Login"
import Account  from "./components/Account"



const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/verifyAccount/:id" element={<Account />} />
  
        
        
      </Routes>
    </>
  );
};

export default App;
