import styles from './AuthNav.module.css';
import {useContext, useState} from "react";
import {NavLink} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import LoginModal from "../modals/loginModal/LoginModal.jsx";

function AuthNav() {
    const {isAuth, signOut, user} = useContext(AuthContext);
    const [modalOpen, toggleModalOpen] = useState(false);


    return (
        <nav id={styles["nav-container"]}>
            <ul className={styles["nav-list"]}>
                <li>
                    <NavLink
                        className={styles["link_nav"]}
                        to="/">
                        Home
                    </NavLink>
                </li>
                {isAuth ?
                    <>
                        <li>
                            <NavLink
                                className={styles["link_nav"]}
                                to={`/app/users/${user.username}`}>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <div className={styles["user"]}>
                                <h5 className={styles["user-email"]}>{user.email}</h5>
                                <button type="button" onClick={signOut} className={styles["nav-button-signout"]}>
                                    Sign Out
                                </button>
                            </div>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <button
                                className=
                                    {`${styles["modal-button"]} 
                            ${styles["modal-button-sign-in"]}`}
                                onClick={() => toggleModalOpen(true)}
                            >
                                Sign In
                            </button>

                            {modalOpen &&
                                <LoginModal
                                    open={modalOpen}
                                    modalVisible={toggleModalOpen}
                                />
                            }
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
}

export default AuthNav;