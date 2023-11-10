import {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import axios from "../api/axios.js";
import isTokenValid from "../helpers/tokenValidation.js";
import RefreshTokenUtil from "../authHooks/RefreshTokenUtil.jsx";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({isAuth: false, user: {}, status: "pending"});
    const navigate = useNavigate();

    useEffect (() => {
        async function fetchData() {
            const token = window.localStorage.getItem("jwt");

            if (token != null) {
                const decoded = jwt_decode(token);

                if (isTokenValid(decoded)) {

                    signIn(token);
                } else {
                    // Token is expired; attempt to refresh it
                    const refreshToken = await RefreshTokenUtil();

                    try {
                        const refreshedToken = await refreshToken(); // Call the refreshToken function

                        if (refreshedToken) {
                            // Successfully refreshed token, re-check if the user is authenticated
                            const refreshedDecoded = jwt_decode(refreshedToken);
                            if (isTokenValid(refreshedDecoded)) {
                                // testlog of er gerefreshed wordt
                                console.log("Refresh successful")
                                signIn(refreshedToken);
                            } else {
                                clearAuth();
                            }
                        } else {
                            clearAuth();
                        }
                    } catch (error) {
                        // Handle the error that occurred during token refresh
                        console.error(error?.response?.status + ": Both tokens have expired");
                        clearAuth();
                    }
                }
            } else {
                clearAuth();
            }
        }
        fetchData().then();
    }, []);

    function clearAuth() {
        setAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
        window.localStorage.clear();
    }

    function signIn(jwt) {
        window.localStorage.setItem("jwt", jwt);
        const decoded = jwt_decode(jwt);

        try {
            getUserDetails(decoded.sub, jwt, "/").then();
            { auth.isAuth &&
            console.log("User is signed in!") }
        } catch (error) {
            console.error("User does not exist!")
        }
    }

    function signOut() {
        clearAuth();
        console.log("User is signed out!");
        navigate("/");
    }

    async function getUserDetails(username, jwt, navUrl) {
        const controller = new AbortController();

        try {
            const userDetails = await axios.get(`/app/users/${username}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                },
                withCredentials: true,
                signal: controller.signal,
            });

            setAuth((prevAuth) => ({
                ...prevAuth,
                isAuth: true,
                user: {
                    email: userDetails.data.email,
                    firstname: userDetails.data.firstname,
                    lastname: userDetails.data.lastname,
                    username: userDetails.data.username,
                    password: userDetails.data.password,
                },
                status: "done",
            }));

            if (navUrl) {
                navigate(navUrl);
            }
        } catch (error) {
            if (controller.signal.aborted) {
                console.error('Request cancelled:', error.response.status);
            } else {
                console.error(error?.response?.status +
                    ": You either don't have permission to fetch user details " +
                    "or the user does not exist at all. " +
                    "This error usually occurs during testing, " +
                    "when a valid token still exists in localstorage, " +
                    "but the backend restarted and with that a database reset has been executed");
                clearAuth();
                window.localStorage.clear();
            }
        }

        controller.abort();
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={contextData}>
            { auth.status === "done" ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;