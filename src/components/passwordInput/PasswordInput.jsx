import {useEffect} from 'react';
import styles from "../input/Input.module.css";

function PasswordInput({ id, name, register, errors, validationParams }) {

    useEffect(() => {
        register(name);
    }, [name, register, errors]);

    return (
        <div className={styles["input-wrapper"]}>
            <input
                className={styles["input"]}
                type="password"
                id={id}
                {...register(name, validationParams)}
            />
            {errors[name] && <small className={styles["errors"]}>{errors[name].message}</small>}
        </div>
    )
}

export default PasswordInput;