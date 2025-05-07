import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Subreddit = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:1337/api/posts?filters[subreddits][id][$eq]=${slug}&populate=*`)
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.error(err));
  }, [slug]);

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl mb-4">Posts du subreddit</h1>
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-700 p-4 rounded mb-2">
          <h2 className="text-xl font-bold">{post.attributes.title}</h2>
          <img src={post.attributes.imageUrl} alt="" className="w-full max-h-64 object-cover mt-2" />
        </div>
      ))}
    </div>
  );
};

export default Subreddit;
