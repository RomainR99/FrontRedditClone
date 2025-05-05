import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Subreddit = () => {
  const { subreddit } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/posts?subreddit=${subreddit}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [subreddit]);

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">r/{subreddit}</h1>
        {isAuthenticated && (
          <Link
            to="/create-post"
            className="bg-reddit-orange text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Créer un post
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <Link to={`/r/${subreddit}/${post.id}`} className="block">
              <h2 className="text-xl font-semibold text-reddit-blue hover:underline">
                {post.title}
              </h2>
              <p className="text-gray-600 mt-2">{post.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Posté par u/{post.author.username}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{post.commentsCount} commentaires</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subreddit; 