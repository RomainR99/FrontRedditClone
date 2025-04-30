import PostCard from "./PostCard.jsx";
import "../PostList.css";


function PostList() {
    return (
        <div className="post-list">
            <PostCard title="Mon premier post" content="Bienvenue sur Reddit"/>
            <PostCard title="Nouveau design" content="J'ai refait la page principale en React."/>
        </div>
    )
}

export default PostList