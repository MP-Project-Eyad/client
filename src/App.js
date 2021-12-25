import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup"



const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Signup />} />
  
        
        
      </Routes>
    </>
  );
};

export default App;
