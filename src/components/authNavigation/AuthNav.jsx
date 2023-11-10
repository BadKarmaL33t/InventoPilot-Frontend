import styles from './AuthNav.module.css';
import {useContext} from "react";
import {NavLink} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";

function AuthNav() {
    const {isAuth, signOut, user} = useContext(AuthContext);

    return (
        <nav className={styles["nav-container"]}>
            <ul className={styles["nav-list"]}>
                <li>
                    <NavLink
                        className={styles["link_nav-menu"]}
                        to="/">
                        Home
                    </NavLink>
                </li>
                {isAuth ?
                    <>
                        <li>
                            <NavLink
                                className={styles["link_nav-menu"]}
                                to={`/app/users/${user.username}`}>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <div className={styles["user"]}>
                                <h5 className={styles["username"]}>{user.username}</h5>
                                <button type="button" onClick={signOut} className={styles["nav-button-signout"]}>
                                    Sign Out
                                </button>
                            </div>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <NavLink
                                className={styles["link_nav-menu"]}
                                to="/signin">
                                Sign In
                            </NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
}

export default AuthNav;