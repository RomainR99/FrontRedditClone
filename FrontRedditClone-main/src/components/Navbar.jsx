const Navbar = () => {
    return (
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">Reddit Clone</h1>
        <input
          type="text"
          placeholder="Search"
          className="border px-2 py-1 rounded w-1/3"
        />
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Login</button>
      </nav>
    );
  };
  
  export default Navbar;
  