import {useEffect} from "react";
import styles from "./Input.module.css";

function Input({id, name, register, errors, customValidateParams}) {
    useEffect(() => {
        register(name);
    }, [name, register, errors]);

    const validationParams = {
        required: {
            value: true,
            message: 'Dit veld is verplicht',
        },
        validate: {}
    };

    if (customValidateParams) {
        validationParams.validate = customValidateParams;
    }

    const inputProps = {
        id: id,
        ...register(name, validationParams)
    };

    return (
        <div className={styles["input-wrapper"]}>
            {id === "content-area" ? (
                <textarea
                    {...inputProps}
                    className={styles["input__content-textarea"]}
                    rows="8"
                    cols="50"
                    placeholder="Plaats hier jouw blog post"
                />
            ) : (
                <input
                    {...inputProps}
                    className={styles["input"]}
                />
            )}
            {errors[name] && <small className={styles["errors"]}>{errors[name].message}</small>}
        </div>
    );
}

export default Input;