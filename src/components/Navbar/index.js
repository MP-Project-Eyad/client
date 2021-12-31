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

const Navbar = () => {
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
                    <NavBtnLink to="/signup">Sign Up</NavBtnLink>                
                </NavBtn>
            </NavMenu> 
           </Nav> 
        </div>
    );
};
export default Navbar;