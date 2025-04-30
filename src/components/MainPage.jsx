import Navbar from "./Navbar.jsx";
import Sidebard from "./Sidebar.jsx";
import PostList from "./PostList.jsx";
import "../Mainpage.css"
import Suggestion from "./Suggestion.jsx";
import Footer from "./Footer.jsx";


function MainPage() {
    return (
        <>
            <Navbar/>
            <div className="main-layout">
                <Sidebard/>
                <div className="center-layout">
                <PostList/>
                </div>
                <Suggestion/>
            </div>
            <Footer/>
        </>
    )
}

export default MainPage