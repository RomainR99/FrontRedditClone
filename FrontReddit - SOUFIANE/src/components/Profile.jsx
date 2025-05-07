import PostCard from "./PostCard";
import "../Profile.css";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import React, { useState } from "react";





function Profile() {
    const { username } = useParams()
    const [activeTab, setActiveTab] = useState("overview");
    const user = {
        username: username,
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        karmaPost: 1,
        karmaComment: 0,
        cakeDay: "2023-10-01",
        achievements: [' Banana Baby', 'Hometown Hero', 'Feed Finder']
    }

    return (
        <>
            <Navbar/>
            <div className="profile-wrapper">
                <div className="profile-main">
                    <div className="profile-header">
                        <img className="profile-avatar" src={user.avatar} alt="" />
                        <h2>{user.username}</h2>
                        <span className="tag">@{user.username}</span>
                    </div>

                    <div className="profile-tabs">
                        <button
                            className={activeTab === "overview" ? "active-tab" : ""}
                            onClick={() => setActiveTab("overview")}
                        >
                            Overview
                        </button>
                        <button
                            className={activeTab === "posts" ? "active-tab" : ""}
                            onClick={() => setActiveTab("posts")}
                        >
                            Posts
                        </button>
                        <button
                            className={activeTab === "comments" ? "active-tab" : ""}
                            onClick={() => setActiveTab("comments")}
                        >
                            Comments
                        </button>
                        <button
                            className={activeTab === "saved" ? "active-tab" : ""}
                            onClick={() => setActiveTab("saved")}
                        >
                            Saved
                        </button>
                    </div>


                    <div className="profile-content">
                        {activeTab === "overview" && (
                            <p className="no-post">Bienvenue sur le profil de u/{user.username}</p>
                        )}
                        {activeTab === "posts" && (
                            <p className="no-post">u/{user.username} n'a encore rien posté.</p>
                        )}
                        {activeTab === "comments" && (
                            <p className="no-post">Aucun commentaire pour l’instant.</p>
                        )}
                        {activeTab === "saved" && (
                            <p className="no-post">Aucune sauvegarde trouvée.</p>
                        )}
                    </div>
                </div>
                <div className="profile-sidebar">
                    <div className="info-card">
                        <h3>{user.username}</h3>
                        <div className="stat"> {user.karmaPost} post karma</div>
                        <div className="stat"> {user.karmaComment} comment karma</div>
                        <div className="stat"> Cake Day: {user.cakeDay}</div>
                    </div>

                    <div className="info-card">
                        <h4>Achivements</h4>
                        <ul>
                            {user.achievements.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                    </div>

                    <div className="info-card">
                        <h4>Settings</h4>
                        <button className="update-btn">Update Profile</button>
                        <button className="update-btn">Style Avatar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile