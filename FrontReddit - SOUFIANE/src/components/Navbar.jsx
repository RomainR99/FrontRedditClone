import React from 'react';
import "../Navbar.css"
import Notifications from './Notifications';
import ThemeSettings from './ThemeSettings';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="logo">Reddit</div>
                <input type="text" className="search" placeholder="Rechercher..." />
            </div>
            <div className="navbar-right">
                <Notifications />
                <ThemeSettings />
                <button className="login-btn">Se connecter</button>
            </div>
        </nav>
    )
}

export default Navbar