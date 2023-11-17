import styles from "./UserDetailsPage.module.css";
import {useContext, useEffect, useState} from "react";
import {privateAxios} from "../../api/axios.js";
import Input from "../../components/input/Input.jsx";
import PasswordInput from "../../components/passwordInput/PasswordInput.jsx";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {SelectedUserContext} from "../../context/SelectedUserContext.jsx";

function UserDetails() {
    const {handleSubmit, formState: {errors, isDirty, isValid}, register, watch} = useForm({mode: 'onChange'});
    const watchPassword = watch("password");
    const PW_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9';<>&|/\\]).{8,24}$/
    const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const UN_REGEX = /^[a-zA-Z]*[a-zA-Z0-9-_]{3,23}$/;
    const NAME_REGEX = /^[a-zA-Z-]+$/;
    const {selectedUser, setSelectedUser} = useContext(SelectedUserContext);
    const {signOut, auth, setAuth, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [editModes, setEditModes] = useState({
        email: false,
        firstname: false,
        lastname: false,
        username: false,
        password: false,
    });

    const toggleEditMode = (field) => {
        setEditModes({
            ...editModes,
            [field]: !editModes[field],
        });
    };

    async function handleFormSubmit(data) {
        const {username, email, firstname, lastname, password, matchingPassword} = data;
        const isPasswordValid = PW_REGEX.test(password);
        const isPasswordMatching = password === matchingPassword;
        const controller = new AbortController();

        try {
            await privateAxios.patch(`${location.pathname}/${selectedUser.username}`, {
                    ...(editModes.email && email ? {email} : {}),
                    ...(editModes.firstname && firstname ? {firstname} : {}),
                    ...(editModes.lastname && lastname ? {lastname} : {}),
                    ...(editModes.username && username ? {username} : {}),
                    ...(editModes.password && isPasswordValid && isPasswordMatching ? {password} : {})
                },
                {
                    signal: controller.signal,
                });

            if (selectedUser.username === user.username) {
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: {
                        ...(editModes.email && email ? {email} : {}),
                        ...(editModes.firstname && firstname ? {firstname} : {}),
                        ...(editModes.lastname && lastname ? {lastname} : {}),
                        ...(editModes.username && username ? {username} : {}),
                        ...(editModes.password && isPasswordValid && isPasswordMatching ? {password} : {})
                    }
                }));
                setSelectedUser(auth.user)
                signOut();
            }

            console.log("Update successful");
            navigate("/loading");
        } catch (error) {
            console.error("Axios request failed:", error);
        }
    }

    useEffect(() => {
        // If the current URL is "/app/users/{username}", set the selectedUser to user
        if (location.pathname === `/app/users/${user.username}`) {
            setSelectedUser(user);
        }
    }, [location.pathname, setSelectedUser, user]);

    return (
        <>
            {selectedUser ? (
                <form onSubmit={handleSubmit(handleFormSubmit)} className={styles["user-details-form"]}>
                    <h2>User Details</h2>
                    <div className={styles["user-details-item"]}>
                        <div className={styles["user-details"]}>
                            <label htmlFor="username-field" className={styles["label"]}>Username:</label>
                            {editModes.username ? (
                                <Input
                                    label="username-field"
                                    labelText="Username:"
                                    name="username"
                                    register={register}
                                    errors={errors}
                                    customValidateParams={{
                                        minLength: (v) => v.length >= 3 || "Invalid username",
                                        maxLength: (v) => v.length <= 23 || "Max. number of characters is 23",
                                        matchPattern: (v) => UN_REGEX.test(v) || "Only text, numbers and - or _ are allowed",
                                    }}
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedUser.username}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("username")}>{editModes.username ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["user-details-item"]}>
                        <div className={styles["user-details"]}>
                            <label htmlFor="email-field" className={styles["label"]}>Email:</label>
                            {editModes.email ? (
                                <Input
                                    id="email-field"
                                    name="email"
                                    register={register}
                                    errors={errors}
                                    customValidateParams={{
                                        matchPattern: (v) => EMAIL_REGEX.test(v) || "Invalid email",
                                    }}
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedUser.email}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("email")}>{editModes.email ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["user-details-item"]}>
                        <div className={styles["user-details"]}>
                            <label htmlFor="firstname-field" className={styles["label"]}>First name:</label>
                            {editModes.firstname ? (
                                <Input
                                    label="firstname-field"
                                    labelText="First name:"
                                    name="firstname"
                                    register={register}
                                    errors={errors}
                                    customValidateParams={{
                                        matchPattern: (v) => NAME_REGEX.test(v) || "Only text and - are allowed",
                                        minLength: (v) => v.length >= 2 || "Invalid name",
                                        maxLength: (v) => v.length <= 25 || "Max. number of characters is 25",
                                    }}
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedUser.firstname}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("firstname")}>{editModes.firstname ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["user-details-item"]}>
                        <div className={styles["user-details"]}>
                            <label htmlFor="lastname-field" className={styles["label"]}>Last name:</label>
                            {editModes.lastname ? (
                                <Input
                                    label="lastname-field"
                                    labelText="Last name:"
                                    name="lastname"
                                    register={register}
                                    errors={errors}
                                    customValidateParams={{
                                        matchPattern: (v) => NAME_REGEX.test(v) || "Only text and - are allowed",
                                        minLength: (v) => v.length >= 2 || "Invalid name",
                                        maxLength: (v) => v.length <= 50 || "Max. number of characters is 50",
                                    }}
                                />
                            ) : (
                                <p className={styles["input"]}>{selectedUser.lastname}</p>
                            )}
                        </div>
                        <button className={styles["edit-button"]}
                                onClick={() => toggleEditMode("lastname")}>{editModes.lastname ? "Cancel" : "Edit"}</button>
                    </div>
                    <div className={styles["edit-password-wrapper"]}>
                        {editModes.password ? (
                            <div className={styles["user-password-item"]}>
                                <div className={styles["user-password"]}>
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
                                <div className={styles["user-password"]}>
                                    <label htmlFor="matching-password-field" className={styles["label"]}>Confirm
                                        password:</label>
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
                            </div>
                        ) : (
                            <div className={styles["user-details-item"]}>
                                <label htmlFor="hidden-password-field" className={styles["label"]}>Password:</label>
                                <p className={styles["input"]} id="hidden-password-field">************</p>
                            </div>
                        )}
                        <button
                            className={styles["password-edit-button"]}
                            onClick={() => toggleEditMode("password")}>{editModes.password ? "Cancel" : "Edit"}
                        </button>
                    </div>
                    <button className={styles["update-userdetails-button"]}
                            type="submit"
                            id="update-button"
                            disabled={!isDirty || !isValid}
                    >
                        Update Profile
                    </button>
                </form>
            ) : (
                <p>Something went wrong</p>
            )}
        </>
    );
}

export default UserDetails;