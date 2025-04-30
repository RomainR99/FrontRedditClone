import "../PostCard.css";

function PostCard() {
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

            <h3 className="post-title">This guy has been installing Arch for almost 300 days</h3>

            <div className="post-image">
              <img src="https://preview.redd.it/i-think-i-like-posting-selfies-on-reddit-too-much-v0-0b32spbi41ob1.jpg?width=640&crop=smart&auto=webp&s=7f60363157bc6721b69c511de368b31473cbefc8" alt="content" />
            </div>

            <div className="post-footer">
              <span><i className="bi bi-arrow-up"></i> 457</span>
              <span><i className="bi bi-chat"></i> 68</span>
              <span><i className="bi bi-share"></i> Partager</span>
            </div>
        </div>
    )
}

export default PostCard