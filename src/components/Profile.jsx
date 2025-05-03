import PostCard from "./PostCard";
import "../Profile.css";
import { useParams } from "react-router-dom";
import { use } from "react";




function Profile() {
    const { username } = useParams()
    const user = {
        username: username,
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        karmaPost: 1,
        karmaComment: 0,
        cakeDay: "2023-10-01",
        achievements: [' Banana Baby', 'Hometown Hero', 'Feed Finder']
    }

    return (
        <div className="profile-wrapper">
            <div className="profile-main">
                <div className="profile-header">
                    <img className="profile-avatar" src={user.avatar} alt="" />
                    <h2>{user.username}</h2>
                    <span className="tag">@{user.username}</span>
                </div>

                <div className="profile-tabs">
                    <button className="active-tab">Overview</button>
                    <button>Posts</button>
                    <button>Comment</button>
                    <button>Saved</button>
                </div>

                <div className="profile-content">
                    <p className="no-post">u/{user.username} n'a encore rien posté</p>
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
    )
}

export default Profile