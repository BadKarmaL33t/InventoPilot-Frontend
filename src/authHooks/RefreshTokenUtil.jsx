import axios from "../api/axios.js";

async function refreshTokenUtil() {
    const controller = new AbortController();

    try {
        const response = await axios.post('secure/auth/refresh', null, {
            withCredentials: true,
            signal: controller.signal,
        });
        return response.data["jwt"];
    } catch (error) {
        if (controller.signal.aborted) {
            console.error('Request cancelled:', error.message);
        } else {
            console.error("No valid token available");
            window.localStorage.clear();
        }
    }
    controller.abort()
}

export default refreshTokenUtil;