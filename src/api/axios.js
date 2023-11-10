import axios from "axios";
import refreshTokenUtil from "../authHooks/RefreshTokenUtil.jsx";
const baseUrl = 'http://localhost:8080'

export default axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

const privateAxios = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

privateAxios.interceptors.request.use(
    (config) => {
        if (!config.headers['Authorization']) {
            const accessToken = window.localStorage.getItem('jwt');
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Define the response interceptor to handle token refresh.
privateAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const refreshedJwt = await refreshTokenUtil();
            // Update the Authorization header with the new token.
            prevRequest.headers['Authorization'] = `Bearer ${refreshedJwt}`;
            return privateAxios(prevRequest);
        }
        return Promise.reject(error);
    }
);

export { privateAxios };