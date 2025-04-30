import Navbar from "./Navbar.jsx";
import Sidebard from "./Sidebar.jsx";
import PostList from "./PostList.jsx";
import "../Mainpage.css"


function MainPage() {
    return (
        <div className="main-container">
            <Navbar/>
            <div className="content">
                <Sidebard/>
                <PostList/>
            </div>
        </div>
    )
}

export default MainPage