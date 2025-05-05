import React from 'react';
import PostList from '../components/PostList';

const Home = () => {
  // Données de test pour les posts
  const testPosts = [
    {
      id: '1',
      title: 'Mon premier post sur Reddit Clone',
      content: 'Je suis ravi de partager mon premier post sur cette plateforme ! J\'espère que vous l\'apprécierez.',
      author: 'john_doe',
      subreddit: 'programming',
      upvotes: 42,
      comments: 5,
      createdAt: 'Il y a 2 heures',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: '2',
      title: 'Quel est votre langage de programmation préféré ?',
      content: 'Je suis curieux de savoir quels langages de programmation vous préférez et pourquoi. Personnellement, j\'adore TypeScript pour sa sécurité de type et sa grande communauté.',
      author: 'code_lover',
      subreddit: 'programming',
      upvotes: 128,
      comments: 32,
      createdAt: 'Il y a 5 heures',
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: '3',
      title: 'Conseils pour débuter en développement web',
      content: 'Je partage quelques conseils pour ceux qui veulent commencer dans le développement web : 1. Commencez par HTML/CSS 2. Apprenez JavaScript 3. Découvrez un framework comme React 4. Pratiquez régulièrement',
      author: 'web_dev',
      subreddit: 'webdev',
      upvotes: 256,
      comments: 48,
      createdAt: 'Il y a 1 jour',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <div className="home">
      <PostList posts={testPosts} />
    </div>
  );
};

export default Home; 