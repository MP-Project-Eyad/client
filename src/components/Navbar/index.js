import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
import "./style.css"
import  { useState, useEffect } from "react";
import { Logoutt } from "./../../reducers/Login";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [local, setLocal] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const state = useSelector((state) => {
        return {
          token: state.Login.token,
        };
      });
    
    const logOut =()=>{

    dispatch(Logoutt({role:"",token:""}));
  localStorage.clear()
  navigate('/login')

 }

 useEffect(() => {
    const getToken = localStorage.getItem("token");
    setLocal(getToken);
 }, [])
 
    return (
        <div className="navWrapper">
           <Nav>
            <NavLogo to="/">
                Logo
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink to="/" activeStyle>
                    Home
                </NavLink>
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="/contact" activeStyle>
                    Contact
                </NavLink>
                <NavLink to="/login" activeStyle>
                    Sign In
                </NavLink>
                <NavBtn>
                    <NavBtnLink  to="/signup">{local ? "Log Out" : "Sign Up"}</NavBtnLink>                
                </NavBtn>
            </NavMenu> 
           </Nav> 
        </div>
    );
};
export default Navbar;