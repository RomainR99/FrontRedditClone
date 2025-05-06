import { Link } from "react-router-dom"
import { useState } from "react"
import "../Navbar.css"
import CreatePost from "./CreatePost.jsx";

function Navbar() {
    const [showCreate, setShowCreate] = useState(false);

    return (
        <>
            <header className="navbar">
                <div className="navbar-left">
                    <h1 className="logo">Reddit</h1>
                </div>

                <div className="navbar-center">
                    <input type="text" placeholder="Rechercher..." className="search"/>
                </div>

                <div className="navbar-right">
                    <div className="icon-wrapper">
                        <i className="bi bi-bell-fill"></i>
                    </div>
                    <div className="create-btn" onClick={() => setShowCreate(true)}>
                        <i className="bi bi-plus-lg"></i> <span>Create</span>
                    </div>
                    <Link to={"/connexion"}>
                        <button className="login-btn">Connexion</button>
                    </Link>
                </div>
            </header>
            {showCreate && (
                <CreatePost onCLose={() => setShowCreate(false)}/>
            )}
        </>
        
        
    )
}

export default Navbar