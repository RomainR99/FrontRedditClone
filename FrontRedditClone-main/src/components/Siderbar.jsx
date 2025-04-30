const Sidebar = () => {
    return (
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold mb-4">Communautés</h2>
        <ul>
          <li className="mb-2 hover:underline cursor-pointer">r/ReactJS</li>
          <li className="mb-2 hover:underline cursor-pointer">r/France</li>
          <li className="mb-2 hover:underline cursor-pointer">r/Programmation</li>
        </ul>
      </aside>
    );
  };
  
  export default Sidebar;
  