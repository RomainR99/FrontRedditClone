import { useState } from "react";
import "../PostCard.css";

function PostCard({ title, content, image }) {
  
    return (
        <div className="post-card">
            <div className="post-header">
              <img src="https://i.etsystatic.com/20335141/r/il/eb2b91/3883806172/il_570xN.3883806172_mk03.jpg" alt="avatar" className="avatar" />
              <div className="meta">
                <span className="subreddit">r/linux</span>
                <span className="dot">•</span>
                <span className="time">il y a 3 h</span>
              </div>
              <button className="join-btn">Rejoindre</button>
            </div>

            <h3 className="post-title">{title}</h3>

            {image && (
              <div className="post-image">
                <img src={image} alt="content" />
              </div>
            )}
            <p className="post-content">{content}</p>
            <div className="post-footer">
              <span><i className="bi bi-hand-thumbs-up"></i> 457 <i className="bi bi-hand-thumbs-down"></i></span>
              <span><i className="bi bi-chat"></i> 68</span>
              <span><i className="bi bi-share"></i> Partager</span>
            </div>
        </div>
    )
}

export default PostCard