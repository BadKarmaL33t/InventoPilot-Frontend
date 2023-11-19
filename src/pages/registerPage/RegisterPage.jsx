import styles from "./RegisterPage.module.css"
import axios from "../../api/axios.js";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input.jsx";
import PasswordInput from "../../components/passwordInput/PasswordInput.jsx";
import {useNavigate} from "react-router-dom";


function Register() {
    const {handleSubmit, formState: {errors, isDirty, isValid}, register, watch} = useForm({mode: 'onChange'});
    const watchPassword = watch("password");
    const PW_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9';<>&|/\\]).{8,24}$/
    const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const UN_REGEX = /^[a-zA-Z]*[a-zA-Z0-9-_]{3,23}$/;
    const NAME_REGEX = /^[a-zA-Z-]+$/;
    const navigate = useNavigate();

    async function handleFormSubmit(data) {
        const v1 = UN_REGEX.test(data.username);
        const v2 = PW_REGEX.test(data.password);
        const controller = new AbortController();

        try {
            // only request if button is not enabled with JS hack
            if (v1 && v2 && data.password === data["matching-password"]) {
                await axios.post('/secure/auth/register', {
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    password: data.password,
                }, {
                    signal: controller.signal,
                });
                console.log("Registration successful");
                navigate("/loading");
            }
        } catch (error) {
            if (controller.signal.aborted) {
                console.error('Request cancelled:', error.message);
            } else {
                console.error(error);
            }
        }
        controller.abort();
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles["register-page-form"]}>
                <h2>Register</h2>
                <div className={styles["input-container"]}>
                    <label htmlFor="email-field" className={styles["label"]}>Email:</label>
                    <Input
                        id="email-field"
                        name="email"
                        register={register}
                        errors={errors}
                        customValidateParams={{
                            matchPattern: (v) => EMAIL_REGEX.test(v) || "Invalid email",
                        }}
                    />
                </div>
                <div className={styles["input-container"]}>
                    <label htmlFor="firstname-field" className={styles["label"]}>First name:</label>
                    <Input
                        id="firstname-field"
                        name="firstname"
                        register={register}
                        errors={errors}
                        customValidateParams={{
                            matchPattern: (v) => NAME_REGEX.test(v) || "Only text and - are allowed",
                            minLength: (v) => v.length >= 2 || "Invalid name",
                            maxLength: (v) => v.length <= 25 || "Max. number of characters is 25",
                        }}
                    />
                </div>
                <div className={styles["input-container"]}>
                    <label htmlFor="lastname-field" className={styles["label"]}>Last name:</label>
                    <Input
                        id="lastname-field"
                        name="lastname"
                        register={register}
                        errors={errors}
                        customValidateParams={{
                            matchPattern: (v) => NAME_REGEX.test(v) || "Only text and - are allowed",
                            minLength: (v) => v.length >= 2 || "Invalid name",
                            maxLength: (v) => v.length <= 50 || "Max. number of characters is 50",
                        }}
                    />
                </div>
                <div className={styles["input-container"]}>
                    <label htmlFor="username-field" className={styles["label"]}>Username:</label>
                    <Input
                        id="username-field"
                        name="username"
                        register={register}
                        errors={errors}
                        customValidateParams={{
                            minLength: (v) => v.length >= 3 || "Invalid username",
                            maxLength: (v) => v.length <= 23 || "Max. number of characters is 23",
                            matchPattern: (v) => UN_REGEX.test(v) || "Only text, numbers and - or _ are allowed",
                        }}
                    />
                </div>
                <div className={styles["input-container"]}>
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
                                matchPattern: (v) => PW_REGEX.test(v) || "Password should be at least 8 characters long,\n" +
                                    "and have at least one uppercase letter,\n" +
                                    "one lowercase letter,\n" +
                                    "one digit,\n" +
                                    "and one special character,\n" +
                                    "' ; < > & | / \\ are not allowed"
                            }
                        }}
                    />
                </div>
                <div className={styles["input-container"]}>
                    <label htmlFor="matching-password-field" className={styles["label"]}>Confirm password:</label>
                    <PasswordInput
                        id="matching-password-field"
                        name="matching-password"
                        register={register}
                        errors={errors}
                        validationParams={{
                            required: {
                                value: true,
                                message: 'This field is required',
                            },
                            validate: {
                                matchPattern: (v) => PW_REGEX.test(v) || "Password does not meet the requirements",
                                match: (v) => v === watchPassword || 'Passwords do not match'
                            }
                        }}
                    />
                </div>
                <button className={styles["registerPage-button"]}
                        type="submit"
                        id="register-button"
                        disabled={!isDirty || !isValid}
                >
                    Sign Up
                </button>
            </form>
        </>
    );
}

export default Register;