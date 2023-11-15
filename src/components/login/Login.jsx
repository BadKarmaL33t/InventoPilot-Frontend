import styles from "./Login.module.css"
import axios from "../../api/axios.js";
import {useNavigate, Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input.jsx";
import PasswordInput from "../../components/passwordInput/PasswordInput.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Login() {
    const { signIn } = useContext(AuthContext);
    const {handleSubmit, formState: {errors, isDirty, isValid}, register} = useForm({mode: 'onChange'});
    const navigate = useNavigate();

    async function signInHandler(data) {
        const controller = new AbortController();

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
            console.log("Login successful");
            navigate('/');
        } catch (error) {
            if (controller.signal.aborted) {
                console.error('Request cancelled:', error.response.status);
            } else {
                console.error(error.response.status);
            }
        }
        controller.abort();
    }

    return (
        <>
            <form onSubmit={handleSubmit(signInHandler)} className={styles["login-form"]}>
                <h2>Sign In</h2>

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

                <button className={styles["sign-in-button"]}
                        type="submit"
                        id="register-button"
                        disabled={!isDirty || !isValid}
                >
                    Sign In
                </button>
                <p><Link to="/register" className={styles["sign-in-link"]}>Need an account? Sign up here</Link></p>
            </form>
        </>
    );
}

export default Login;