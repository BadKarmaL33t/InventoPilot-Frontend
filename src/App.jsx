import './App.css'
import AppLoaderSplash from "./components/appLoaderSplash/AppLoaderSplash.jsx";
import {Routes, Route, useLocation} from 'react-router-dom';
import AuthNav from "./components/authNavigation/AuthNav.jsx";
import UserNav from "./components/userNavigation/UserNav.jsx"
import {useEffect, useState} from "react";
import AppViewport from "./components/appViewport/AppViewport.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";
import UpdateModal from "./components/modals/updateModal/UpdateModal.jsx";
import {SelectedItemContext} from "./context/SelectedItemContext.jsx";

function App() {
    const { isAuth, isAdmin, user } = useContext(AuthContext);
    const { selectedItem } = useContext(SelectedItemContext);
    const location = useLocation();
    const [pagePath, setPagePath] = useState(location.pathname);

    useEffect(() => {
        setPagePath(location.pathname);
    }, [location.pathname]);

    return (
        <div className="window-container">
            <AppLoaderSplash/>

            <div className="menu-container">
                <UserNav/>
            </div>
            <div className="page-container">
                <div className="navbar-container">
                    <AuthNav/>
                </div>
                <div className="content-outer-container">
                    <Routes>
                        <Route path="/" element={<AppViewport page={pagePath}/>}/>
                        <Route path="/loading" element={<UpdateModal page={pagePath}/>}/>
                        {isAuth &&
                            <>
                                <Route path="/app/dashboard" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/orders" element={<AppViewport page={pagePath}/>}/>
                                <Route path={`/app/orders/${selectedItem.id}`} element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/orders/new" element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/products" element={<AppViewport page={pagePath}/>}/>
                                <Route path={`/app/products/${selectedItem.name}`} element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/components" element={<AppViewport page={pagePath}/>}/>
                                <Route path={`/app/components/${selectedItem.name}`} element={<AppViewport page={pagePath}/>}/>
                                <Route path="/app/raws" element={<AppViewport page={pagePath}/>}/>
                                <Route path={`/app/raws/${selectedItem.name}`} element={<AppViewport page={pagePath}/>}/>
                                <Route path={`/app/users/${user.username}`} element={<AppViewport page={pagePath}/>}/>
                            </>
                        }
                        {isAdmin &&
                        <>
                            <Route path="/admin/users" element={<AppViewport page={pagePath}/>}/>
                            <Route path="/admin/users/register" element={<AppViewport page={pagePath}/>}/>
                        </>
                        }
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;