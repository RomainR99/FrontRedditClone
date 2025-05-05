import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-votes">
            <button className="vote-button">▲</button>
            <span className="vote-count">{post.upvotes}</span>
            <button className="vote-button">▼</button>
          </div>
          <div className="post-content">
            <div className="post-header">
              <span className="subreddit-name">r/{post.subreddit}</span>
              <span className="post-author">Posté par u/{post.author}</span>
              <span className="post-time">{post.createdAt}</span>
            </div>
            <Link to={`/r/${post.subreddit}/${post.id}`} className="post-title">
              {post.title}
            </Link>
            <p className="post-text">{post.content}</p>
            {post.imageUrl && (
              <div className="post-image-container">
                <img src={post.imageUrl} alt={post.title} className="post-image" />
              </div>
            )}
            <div className="post-actions">
              <button className="action-button">
                💬 {post.comments} commentaires
              </button>
              <button className="action-button">Partager</button>
              <button className="action-button">Sauvegarder</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList; 