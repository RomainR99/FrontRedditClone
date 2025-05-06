import { Link } from "react-router-dom"
import { useState } from "react"
import "../Navbar.css"

function Navbar() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showCreateMenu, setShowCreateMenu] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar-left">
                <h1 className="logo">Reddit</h1>
            </div>

            <div className="navbar-center">
                <input type="text" placeholder="Rechercher..." className="search"/>
            </div>

            <div className="navbar-right">
                <div className="icon-wrapper" onClick={() => setShowNotifications(!showNotifications)}>
                    <i className="bi bi-bell-fill"></i>
                    {showNotifications && (
                        <div className="dropdown">
                            <p>Aucune notification</p>
                        </div>
                    )}
                </div>
                <div className="create-btn" onClick={() => setShowCreateMenu(!showCreateMenu)}>
                    <i className="bi bi-plus-lg"></i> <span>Create</span>
                    {showCreateMenu && (
                        <div className="dropdown">
                            <p>Nouveau post</p>
                            <p>Importer une image</p>
                        </div>
                    )}

                </div>
                <Link to={"/connexion"}>
                    <button className="login-btn">Connexion</button>
                </Link>
            </div>
        </header>
    )
}

export default Navbar