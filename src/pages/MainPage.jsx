import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebard from "../components/Sidebar.jsx";
import "../styles/MainPage.css";
import Suggestion from "../components/Suggestion.jsx";
import Footer from "../components/Footer.jsx";
import Posts from "../components/Posts.jsx";

function MainPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (term) => {
        setSearchTerm(term);
        console.log("Recherche :", term); // à remplacer par un vrai filtre
    };

    return (
        <>
            <Navbar onSearch={handleSearch} />
            
            <div className="main-layout">
                <Sidebard />
                <div className="center-layout">
                    
                    <Posts searchTerm={searchTerm} />
                </div>
                <Suggestion />
            </div>
        
            <Footer />
        </>
    );
}

export default MainPage;
