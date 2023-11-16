import './App.css'
import AppLoaderSplash from "./components/appLoaderSplash/AppLoaderSplash.jsx";
import {Routes, Route, useLocation} from 'react-router-dom';
import AuthNav from "./components/authNavigation/AuthNav.jsx";
import UserNav from "./components/userNavigation/UserNav.jsx"
import LoginModal from "./components/modals/loginModal/LoginModal.jsx";
// import Home from "./pages/homepage/Home.jsx";
// import RegisterPage from "./pages/registerPage/RegisterPage.jsx";
// import AdminDashboard from "./pages/adminDashboardPage/AdminDashboardPage.jsx";
import {useEffect, useState} from "react";
import AppViewport from "./pages/appViewport/AppViewport.jsx";
// import {AuthContext} from "./context/AuthContext.jsx";
// import {useContext} from "react";

function App() {
    const location = useLocation();

    const [pagePath, setPagePath] = useState(location.pathname);

    useEffect(() => {
        setPagePath(location.pathname);
    }, [location.pathname]);

    return (
        <div className="window-container">
            <AppLoaderSplash />

            <div className="menu-container">
                <UserNav />
            </div>
            <div className="page-container">
                <div className="navbar-container">
                    <AuthNav />
                </div>
                <div className="content-outer-container">
                    <Routes>
                        <Route path="/signin" element={<LoginModal />} />
                        <Route path="/" element={<AppViewport page={pagePath} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;


            {/*<Routes>*/}
            {/*    <Route*/}
            {/*        path="/"*/}
            {/*        element={<Home title="Welcome to the Home Page" />}*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*        path="/about"*/}
            {/*        element={<About title="About Us" />}*/}
            {/*    />*/}
            {/*</Routes>*/}


            {/*voorbeeld routes*/}

            {/*<Routes>*/}


            {/*    <Route path="/signin" element={<LoginModal/>}/>*/}
            {/*    <Route*/}
            {/*        path="/app/users/:username"*/}
            {/*        element={isAuth ? <UserDetails/> : <Home/>} />*/}
            {/*<Route path="/secure/admin/users" element={<Dashboard />}/>*/}
            {/*<Route path="/registerPage"*/}
            {/*element={isAdmin ? <RegisterPage/> : <Home/>}/>*/}

            {/*<Route*/}
            {/*    path="/orders"*/}
            {/*    element={isAuth ? <NewPost/> : <Home/>}*/}
            {/*/>*/}
            {/*<Route path="/posts/:postId" element={<PostDetail/>}/>*/}
            {/*</Routes>*/}