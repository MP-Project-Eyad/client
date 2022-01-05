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
import "./style.css";
import { useState, useEffect } from "react";
import { Logoutt } from "./../../reducers/Login";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  const logOut = () => {
    dispatch(Logoutt({ role: "", token: "" }));
    localStorage.clear();
    setNumber(number + 1);
    navigate("/login");
  };
  const getCart = async () => {
    const item = await axios.get(`${BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    setCart(item.data.cart);
  
  };

  useEffect(() => {
    if (state.token) {
      setVisible(true);
      getCart();
    } else {
      setVisible(false);
    }
    // eslint-disable-next-line
  }, [state]);

  return (
    <div className="navWrapper">
      <Nav>
        <NavLogo to="/">
          <div className="imgLogo">
            <img src="/foodhub.png" alt="logo"></img>
          </div>
        </NavLogo>
        <Bars />

        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>

          {!visible ? (
            <>
              <NavLink to="/login" activeStyle>
                Sign In
              </NavLink>
              <NavBtn>
                <NavBtnLink to="/signup">Sign Up</NavBtnLink>
              </NavBtn>
            </>
          ) : (
            <>
              {" "}
              {cart && (
                <NavLink to="/cart" activeStyle>
                  Cart{" "}
                  <span className="spanNumOfItem">
                    <i>{cart.length}</i>
                  </span>
                </NavLink>
              )}
              <NavLink to="/profile" activeStyle>
                Profile
              </NavLink>
              <NavBtn onClick={logOut}>
                <NavBtnLink to="/signup">Log Out</NavBtnLink>
              </NavBtn>
            </>
          )}
        </NavMenu>
      </Nav>
    </div>
  );
};
export default Navbar;
