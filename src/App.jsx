import React from 'react';
import Main from './components/Main';
import "./index.css";



function App() {
  return (
    <>
      <Main/>
    </>
    
  )
}
//function App() {
//  const [posts, setPosts] = useState([]);
//
//  useEffect(() => {
//    // Remplacez l'URL par celle de votre Strapi local
//    fetch('http://localhost:1337/api/posts') 
//      .then((response) => response.json())
//      .then((data) => setPosts(data.data));
//  }, []);
//
//  return (
//    <div className="container mx-auto p-4">
//      <p></p>
//      <h1 className="text-3xl font-bold">Posts</h1>
//      <div>
//        {posts.map((post) => (
//          <div key={post.id} className="p-4 border-b">
//            <h2 className="text-xl">{post.attributes.title}</h2>
//            <p>{post.attributes.description}</p>
//          </div>
//        ))}
//      </div>
//    </div>
//  );
//}

export default App;

