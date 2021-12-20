import React from 'react';
import '../styles/main.css';
import logo from '../images/logo.png';

function Main() {
    return(
        <div className="Main">
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>
            <div className="message-container">
                <p>Welcome to Cook's Treat. Where you will find hundreds of delicious recipes.</p>
            </div> 
        </div>
    )
}

export default Main;