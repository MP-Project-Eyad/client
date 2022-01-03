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
const About = () => {
    return (
        <div className="navWrapper"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, totam.</h1>
        </div>
    );
};

export default About;