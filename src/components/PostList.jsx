import PostCard from "./PostCard.jsx";
import { usePosts } from "./PostContext.jsx";
import "../PostList.css";


function PostList() {
    const { posts } = usePosts()
    return (
        <div className="post-list">
            {posts.length === 0 ? (
                <p>Aucune publication pour le moment</p>
            ) : (
                posts.map((post, index) => (
                    <PostCard key={index} title={post.title} content={post.content} image={post.image}/>
                ))
            )}
        </div>
    )
}

export default PostList