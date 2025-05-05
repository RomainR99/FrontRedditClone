import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Post = () => {
  const { subreddit, postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:1337/api/comments`,
        {
          content: newComment,
          post: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (post) {
        setPost({
          ...post,
          comments: [...post.comments, response.data],
        });
      }
      setNewComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (!post) {
    return <div className="text-center py-8">Post non trouvé</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <div className="text-sm text-gray-500">
          <span>Posté par u/{post.author.username}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Commentaires ({post.comments.length})</h2>

        {isAuthenticated && (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-orange"
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 bg-reddit-orange text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Commenter
            </button>
          </form>
        )}

        <div className="space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <p className="text-gray-700">{comment.content}</p>
              <div className="text-sm text-gray-500 mt-2">
                <span>Commenté par u/{comment.author.username}</span>
                <span className="mx-2">•</span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post; 