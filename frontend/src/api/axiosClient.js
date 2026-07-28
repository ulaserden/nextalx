import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});

// Normalize errors so callers can surface the backend's ApiErrorResponse
// message (falling back to the network/error message) via `error.userMessage`.
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        error.userMessage =
            error?.response?.data?.message ||
            error?.message ||
            "An unexpected error occurred.";

        return Promise.reject(error);
    }
);

export default axiosClient;
