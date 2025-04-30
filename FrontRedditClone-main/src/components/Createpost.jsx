const CreatePost = () => {
    return (
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Titre du post"
          className="w-full mb-2 border p-2 rounded"
        />
        <textarea
          placeholder="Contenu..."
          className="w-full border p-2 rounded mb-2"
          rows="4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Poster</button>
      </div>
    );
  };
  
  export default CreatePost;
  