import styles from './UserNav.jsx.css';
import {useContext} from "react";
import {NavLink} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import logo from '../../assets/InventoPilotVector.png';

function AuthNav() {
    const {isAuth, isAdmin, user} = useContext(AuthContext);

    return (
        <nav className={styles["user-nav-container"]}>
            <ul className={styles["nav-list"]}>
                {isAuth ?
                    <>
                        <span className={styles["menu-img"]}>
                            <img src={logo} alt="profile-img"/>
                        </span>
                        <li>
                            <h2>Navigation</h2>
                        </li>
                        <li>
                            <NavLink
                                className={styles["link_nav-menu"]}
                                to="/dashboard">
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={styles["link_nav-menu"]}
                                to="/orders">
                                Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={styles["link_nav-menu"]}
                                to="/items">
                                Items
                            </NavLink>
                        </li>
                        <li>
                            <h2>User</h2>
                        </li>
                        <li>
                            <NavLink
                                className={styles["link_nav-menu"]}
                                to={`/users/${user.username}`}>
                                Profile
                            </NavLink>
                        </li>
                    </>
                    :
                    <>
                        <span className={styles["menu-img"]}>
                            <img src={logo} alt="company-logo"/>
                        </span>
                    </>
                }
                {
                    isAdmin ?
                        <>
                            <li>
                                <h2>Admin</h2>
                            </li>
                            <li>
                                <NavLink
                                    className={styles["link_nav-menu"]}
                                    to="/secure/admin/users">
                                    Admin Dashboard
                                </NavLink>
                            </li>
                        </>
                        :
                        <>
                        </>
                }
            </ul>
        </nav>
    );
}

export default AuthNav;