import axios from "axios";

const userApiClient = axios.create({
    baseURL: "https://api.crazoweb.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// REQUEST INTERCEPTOR
userApiClient.interceptors.request.use(
    (config) => {

        // skip upload api
        if (config.url?.includes("/upload-photo")) {
            delete config.headers.Authorization;
            return config;
        }

        // store tokens
        const storeTokens = JSON.parse(
            localStorage.getItem("storeTokens") || "{}"
        );

        // active store
        const activeStoreId =
            localStorage.getItem("activeStoreId");

        // current token
        const token =
            storeTokens[activeStoreId || ""];

        // attach token
        if (token) {

            config.headers = config.headers || {};

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
userApiClient.interceptors.response.use(

    (response) => response,

    (error) => {

        // Unauthorized
        if (error?.response?.status === 401) {

            const activeStoreId =
                localStorage.getItem("activeStoreId");

            // remove only current store token

            if (activeStoreId) {

                const storeTokens = JSON.parse(
                    localStorage.getItem("storeTokens") || "{}"
                );

                delete storeTokens[activeStoreId];

                localStorage.setItem(
                    "storeTokens",
                    JSON.stringify(storeTokens)
                );
            }

            // redirect home
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default userApiClient;