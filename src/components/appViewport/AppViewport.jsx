import Home from "../../pages/homepage/Home.jsx";
import PresentationPage from "../../pages/presentationPage/PresentationPage.jsx";
import AdminDashboard from "../../pages/adminDashboardPage/AdminDashboardPage.jsx";
import UserDetails from "../../pages/userDetailsPage/UserDetailsPage.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Register from "../../pages/registerPage/RegisterPage.jsx";
import UserInfo from "../../pages/userInfoPage/UserInfoPage.jsx";

function AppViewport({ page }) {
    const { isAuth, isAdmin, user } = useContext(AuthContext);

    return (
        <>
            {page === "/" &&
                <div className="content-outer-container">
                    <div className="content-left-inner-container">
                        <Home />
                    </div>
                    <div className="content-right-inner-container">
                        <PresentationPage />
                    </div>
                </div>
            }

            { page === "/admin/users" && isAdmin && (
                <div className="content-outer-container">
                    <div className="content-left-inner-container">
                        <AdminDashboard />
                    </div>
                    <div className="content-right-inner-container">
                        <UserDetails />
                    </div>
                </div>
            )}

            { page === "/admin/users/register" && isAdmin && (
                <div className="content-outer-container">
                    <div className="content-left-inner-container">
                        <AdminDashboard />
                    </div>
                    <div className="content-right-inner-container">
                        <Register />
                    </div>
                </div>
            )}

            { page === `/app/users/${user.username}` && (
                <div className="content-outer-container">
                    <div className="content-left-inner-container">
                        <UserDetails />
                    </div>
                    <div className="content-right-inner-container">
                        <UserInfo />
                    </div>
                </div>
            )}
        </>
    );
}

export default AppViewport;