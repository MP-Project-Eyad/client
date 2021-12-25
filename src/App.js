import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup"
import Login from "./components/Login"



const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
  
        
        
      </Routes>
    </>
  );
};

export default App;
