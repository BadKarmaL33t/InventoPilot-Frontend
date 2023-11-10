import styles from './AppLoaderSplash.module.css'
import {useEffect} from "react";
import splashAnimator from '../../helpers/splashAnimator.js'
import logo from "../../assets/InventoPilotVector.png";

function PageLoaderSplash() {

    useEffect(() => {
        splashAnimator(styles);
    },[]);

    return (
        <div className={styles["page-loader"]}>
            <h1 className={styles["text-container"]}>
                <span className={`${styles["logo"]} ${styles["logo-white"]}`}><img src={logo} alt="Company logo" className={styles["img"]} /></span>
                <span className={`${styles["logo"]} ${styles["logo-white"]}`}>Invento</span>
                <span className={styles["logo"]}>Pilot</span>
            </h1>
        </div>
    );
}

export default PageLoaderSplash;