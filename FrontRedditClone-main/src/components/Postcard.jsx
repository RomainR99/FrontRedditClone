const PostCard = ({ title, content, author }) => {
    return (
      <div className="bg-white shadow p-4 rounded mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">par {author}</p>
        <p>{content}</p>
      </div>
    );
  };
  
  export default PostCard;
  