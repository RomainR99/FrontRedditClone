import { useState } from "react";
import "../PostCard.css";

function PostCard() {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [votes, setVotes] = useState(457);
    const [saved, setSaved] = useState(false);

    const handleVote = (type) => {
        if (type === 'up') {
            if (upvoted) {
                setVotes(votes - 1);
                setUpvoted(false);
            } else {
                setVotes(votes + 1);
                setUpvoted(true);
                if (downvoted) {
                    setVotes(votes + 2);
                    setDownvoted(false);
                }
            }
        } else {
            if (downvoted) {
                setVotes(votes + 1);
                setDownvoted(false);
            } else {
                setVotes(votes - 1);
                setDownvoted(true);
                if (upvoted) {
                    setVotes(votes - 2);
                    setUpvoted(false);
                }
            }
        }
    };

    return (
        <div className="post-card">
            <div className="post-header">
                <img src="https://i.etsystatic.com/20335141/r/il/eb2b91/3883806172/il_570xN.3883806172_mk03.jpg" alt="avatar" className="avatar" />
                <div className="meta">
                    <span className="subreddit">r/linux</span>
                    <span className="dot">•</span>
                    <span className="time">il y a 3 h</span>
                    <span className="dot">•</span>
                    <span className="author">u/archlinux_user</span>
                </div>
                <button className="join-btn">Rejoindre</button>
            </div>

            <h3 className="post-title">This guy has been installing Arch for almost 300 days</h3>

            <div className="post-image">
                <img src="https://preview.redd.it/i-think-i-like-posting-selfies-on-reddit-too-much-v0-0b32spbi41ob1.jpg?width=640&crop=smart&auto=webp&s=7f60363157bc6721b69c511de368b31473cbefc8" alt="content" />
            </div>

            <div className="post-footer">
                <div className="vote-buttons">
                    <button 
                        className={`vote-btn ${upvoted ? 'upvoted' : ''}`}
                        onClick={() => handleVote('up')}
                    >
                        <i className="bi bi-arrow-up"></i>
                    </button>
                    <span className="vote-count">{votes}</span>
                    <button 
                        className={`vote-btn ${downvoted ? 'downvoted' : ''}`}
                        onClick={() => handleVote('down')}
                    >
                        <i className="bi bi-arrow-down"></i>
                    </button>
                </div>
                <span><i className="bi bi-chat"></i> 68 commentaires</span>
                <span><i className="bi bi-share"></i> Partager</span>
                <span 
                    className={saved ? 'saved' : ''}
                    onClick={() => setSaved(!saved)}
                >
                    <i className={`bi bi-${saved ? 'bookmark-fill' : 'bookmark'}`}></i> Sauvegarder
                </span>
            </div>
        </div>
    )
}

export default PostCard