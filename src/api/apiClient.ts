import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://64.227.148.177:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR (Attach token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (config.url?.includes("/upload-photo")) {
      delete config.headers.Authorization;
      return config;
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR (Handle errors globally)
apiClient.interceptors.response.use(
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

export default apiClient;