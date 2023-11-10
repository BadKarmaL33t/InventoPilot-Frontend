import './App.css'
import AppLoaderSplash from "./components/appLoaderSplash/AppLoaderSplash.jsx";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/homepage/Home.jsx";
import Register from "./components/register/Register.jsx"
import AuthNav from "./components/authNavigation/AuthNav.jsx";
import UserNav from "./components/userNavigation/UserNav.jsx"
import Login from "./components/login/Login.jsx";
// import {AuthContext} from "./context/AuthContext.jsx";
// import {useContext} from "react";
import UserDetails from "./pages/userDetailsPage/UserDetailsPage.jsx";

function App() {
    // const { isAuth } = useContext(AuthContext);

    return (
        <div className="page-container">
            <AppLoaderSplash />

            <AuthNav/>
            <UserNav/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/signin" element={<Login/>}/>
                <Route path="app/users/:username" element={<UserDetails/>} />
                {/*<Route path="/admin/dashboard" element={<Dashboard />}/>*/}

                {/*<Route*/}
                {/*    path="/new-post"*/}
                {/*    element={isAuth ? <NewPost/> : <Home/>}*/}
                {/*/>*/}
                {/*<Route path="/posts/:postId" element={<PostDetail/>}/>*/}
            </Routes>
        </div>
    )
}

export default App