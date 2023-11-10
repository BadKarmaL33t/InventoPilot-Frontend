import {useEffect, useState} from 'react';
import styles from "../input/Input.module.css";

function PasswordInput({ id, name, register, errors, validationParams }) {
    const [passwordStrength, setPasswordStrength] = useState("");

    useEffect(() => {
        register(name);
    }, [name, register, errors]);

    function passwordStrengthChecker(v) {
        const strongRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9';<>&|/\\]).{12,24}$/;
        const mediumRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9';<>&|/\\]).{10,24}$/;

        if (strongRegex.test(v)) {
            return "Strong";
        } else if (mediumRegex.test(v)) {
            return "Average";
        } else {
            return "Weak";
        }
    }

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
                onInput={name === "password" ? handleInputChange : undefined}
            />
            <p className="strengthCheck">{passwordStrength && <span>{`${passwordStrength} password`}</span>}</p>
            {errors[name] && <small className={styles["errors"]}>{errors[name].message}</small>}
        </div>
    )
}

export default PasswordInput;