import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup"
import Login from "./components/Login"
import Account  from "./components/Account"
import ResetPassword from "./components/ResetPassword";
import Restaurant from "./components/Restaurant";
import Navbar from "./components/Navbar"
import  Menu  from "./components/Menu/Menu";
import Combo from "./components/COMBO";
import Sandwich from "./components/SANDWICH"
import Drink from "./components/DRINK"
import About from "./components/Navbar/about"
import Gallary from "./components/Gallary"



const App = () => {
  return (
    <> 
    <Navbar/>
      <Routes>
      <Route exact path="/gall" element={<Gallary />} />
      <Route exact path="/" element={<Restaurant />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/item/:id" element={<Menu />} />
      <Route exact path="/combo/:id" element={<Combo />} />
      <Route exact path="/sandwich/:id" element={<Sandwich />}/>
      <Route exact path="/drinks/:id" element={<Drink />}/>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/verifyAccount/:id" element={<Account />} />
        <Route exact path="/resetPassword/:id" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
