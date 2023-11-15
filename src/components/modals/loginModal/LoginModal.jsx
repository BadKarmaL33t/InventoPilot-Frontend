import styles from "./LoginModal.module.css"
import axios from "../../../api/axios.js";
import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import Input from "../../input/Input.jsx";
import PasswordInput from "../../passwordInput/PasswordInput.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";

function LoginModal({open, modalVisible}) {
    const {signIn} = useContext(AuthContext);
    const {handleSubmit, formState: {errors, isDirty, isValid}, register} = useForm({mode: 'onChange'});
    const navigate = useNavigate();
    const [status, setStatus] = useState("idle");
    const [errorTimeout, setErrorTimeout] = useState(0);

    async function signInHandler(data) {
        const controller = new AbortController();
        setStatus("loading");

        if (errorTimeout) {
            clearTimeout(errorTimeout);
        }

        try {
            const response = await axios.post(
                '/secure/auth/signin', {
                    username: data.username,
                    password: data.password,
                },
                {
                    signal: controller.signal,
                }
            );
            signIn(response.data["jwt"]);
            console.log("LoginModal successful");
            navigate('/');
            modalVisible(false);
            setStatus("idle");

        } catch (error) {
            setStatus("error");
            // Set a timeout to clear the error status after 3 seconds
            const timeoutId = setTimeout(() => {
                setStatus("idle");
                modalVisible(false);
            }, 2000);

            // Save the timeout ID in state
            setErrorTimeout(timeoutId);
            if (controller.signal.aborted) {
                console.error('Request cancelled:', error.response?.status);
            } else {
                console.error(error.response?.status)
            }
        }
        controller.abort();
    }

    // Clear the error timeout when the component is unmounted
    useEffect(() => {
        return () => {
            if (errorTimeout) {
                clearTimeout(errorTimeout);
            }
        };
    }, [errorTimeout]);

    return (
        <div className={`${styles["modal-background"]} modal-background-${open ? "visible" : "invisible"}`}>
            <div className={`${styles["modal-container"]} modal-container-${open ? "opened" : "closed"}`}>
                {status === "loading" && (
                    <p className={styles["loading"]}>
                        Loading...
                    </p>
                )}
                {status === "error" && (
                    <p className={styles["error"]}>
                        Something went wrong, please try again later.
                    </p>
                )}
                {status !== "loading" && (
                    <form onSubmit={handleSubmit(signInHandler)} className={styles["login-form"]}>
                        <h3 className={styles["modal-title"]}>Sign In</h3>

                        <label htmlFor="username-field" className={styles["label"]}>Username:</label>
                        <Input
                            id="username-field"
                            name="username"
                            register={register}
                            errors={errors}
                            customValidateParams={{
                                matchPattern: (v) => /^[a-zA-Z]*[a-zA-Z0-9-_]{2,23}$/.test(v) || "Only text, numbers and - or _ are allowed",
                                minLength: (v) => v.length >= 2 || "Invalid name",
                                maxLength: (v) => v.length <= 50 || "Max. number of characters is 50",
                            }}
                        />
                        <label htmlFor="password-field" className={styles["label"]}>Password:</label>
                        <PasswordInput
                            id="password-field"
                            name="password"
                            register={register}
                            errors={errors}
                            validationParams={{
                                required: {
                                    value: true,
                                    message: 'This field is required',
                                },
                                validate: {
                                    matchPattern: (v) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9';<>&|/\\]).{8,24}$/.test(v) || "Invalid password"
                                }
                            }}
                        />
                        <div className={styles["button-row"]}>
                            <button
                                className={`${styles["modal-button"]} ${styles["modal-button-sign-in"]}`}
                                id="sign-in-button"
                                type="submit"
                                disabled={!isDirty || !isValid}
                            >
                                Sign In
                            </button>
                            <button
                                className={`${styles["modal-button"]} ${styles["modal-button-cancel"]}`}
                                onClick={() => modalVisible(false)}
                            >
                                <span className={styles["button-text"]}>
                                    Cancel
                                </span>
                            </button>
                        </div>
                        <p className={styles["modal-footer-note"]}>Need an account? Ask your app administrator</p>
                    </form>
                )}
            </div>
        </div>
    );
}

export default LoginModal;