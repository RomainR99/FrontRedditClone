import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Search } from "lucide-react";
import "../Navbar.css"
import CreatePost from "./CreatePost.jsx";
import Main from "./Main.jsx";

function Navbar() {
    const [showCreate, setShowCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    function handleSearch() {
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        <>
            <header className="navbar">
                <div className="navbar-left">
                    <Link to={"/"}>
                        <h1 className="logo">Reddit</h1>
                    </Link>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }} className="navbar-center">
                    <input 
                        type="text" 
                        placeholder="Rechercher..." 
                        className="search" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button type="submit" className="hidden md:block hover:text-gray-300 transition">
                        <Search size={24}/>
                    </button>
                </form>

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
                <CreatePost onClose={() => setShowCreate(false)}/>
            )}
        </>
        
        
    )
}

export default Navbar