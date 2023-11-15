import {useEffect, useState} from 'react';
import styles from "../input/Input.module.css";
import passwordStrengthChecker from "../../helpers/passwordStrengthChecker.js";

function PasswordInput({ id, name, register, errors, validationParams }) {
    const [passwordStrength, setPasswordStrength] = useState("");

    useEffect(() => {
        register(name);
    }, [name, register, errors]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setPasswordStrength(passwordStrengthChecker(value));
    };

    return (
        <div className={styles["input-wrapper"]}>
            <input
                className={styles["input"]}
                type="password"
                id={id}
                {...register(name, validationParams)}
                onInput={id === "password-field" ? handleInputChange : undefined}
            />
            {errors[name] && <small className={styles["errors"]}>{errors[name].message}</small>}
            { id === "password-field" &&
                <p className={styles["password-strength"]}>{passwordStrength && <span>{`${passwordStrength} password`}</span>}</p>
            }
        </div>
    )
}

export default PasswordInput;