import styles from "../loginModal/LoginModal.module.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function UpdateModal({ open, modalVisible }) {
    const navigate = useNavigate();
    const [status, setStatus] = useState("idle");

    // Reset status when the component renders
    useEffect(() => {
        setStatus("loading");
    }, []);

    useEffect(() => {
        if (status === "loading") {
            const timeoutId = setTimeout(() => {
                setStatus("idle");
                navigate(-1);
            }, 1);

            // Clear the timeout if the component unmounts or status changes
            return () => clearTimeout(timeoutId);
        }
    }, [status, modalVisible, navigate]);

    return (
        <div className={`${styles["modal-background"]} modal-background-${open ? "visible" : "invisible"}`}>
            <div className={`${styles["modal-container"]} modal-container-${open ? "opened" : "closed"}`}>
                {status === "loading" && (
                    <p className={styles["loading"]}>
                        Loading...
                    </p>
                )}
            </div>
        </div>
    );
}

export default UpdateModal;