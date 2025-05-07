import React from 'react';
import { Link } from 'react-router-dom';
import "../Navbar.css"
import Notifications from './Notifications';
import ThemeSettings from './ThemeSettings';
import CreatePost from './CreatePost';

const fackeBackendLogin = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5; // Simulate a 50% chance of success
            if (isSuccess) {
                resolve({ message: "Login successful" });
            }
            else {
                reject({ message: "Login failed" });
            }
        }
        , 1000);
    }
    )
}


function Navbar() {
    const handleLogin = async () => {
        const res = await fackeBackendLogin();
        console.log("Login button clicked");


    }

    const [showCreate, setShowCreate] = React.useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <Link to={"/"}>
                        <div className="logo">Reddit</div>
                    </Link>
                    <input type="text" className="search" placeholder="Rechercher..." />
                </div>
                <div className="navbar-right">
                    <Notifications />
                    <ThemeSettings />
                    <div className="create-btn" onClick={() => setShowCreate(true)}>
                        <i className="bi bi-plus-lg"></i> <span>Create</span>
                    </div>
                    <Link to={"/connexion"}>
                        <button className="login-btn" onClick={handleLogin}>Se connecter</button>
                    </Link>
                </div>
            </nav>
            {showCreate && (
                <CreatePost onClose={() => setShowCreate(false)}/>
            )}
        </>
        
    )
}

export default Navbar