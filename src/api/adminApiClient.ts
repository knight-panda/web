import axios from "axios";

const adminApiClient = axios.create({
    baseURL:
        "http://64.227.148.177:8080/api",

    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ ADMIN TOKEN INTERCEPTOR
adminApiClient.interceptors.request.use(
    (config) => {

        const adminToken =
            localStorage.getItem("token");

        // skip token for upload api
        if (config.url?.includes("/upload-photo")) {
            delete config.headers.Authorization;
            return config;
        }

        if (adminToken) {

            config.headers = config.headers || {};

            config.headers.Authorization =
                `Bearer ${adminToken}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR (Handle errors globally)
adminApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Example: Handle unauthorized globally
        if (error?.response?.status === 401) {
            console.log("Unauthorized! Redirect to login.");

            // // optional: clear token
            // localStorage.removeItem("token");

            // // optional: redirect
            // window.location.href = "/";
        }

        return Promise.reject(error);
    }
);


export default adminApiClient;