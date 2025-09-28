import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

if (!url) {
  console.error(" VITE_BACKEND_URL is not defined in your environment variables");
}

const axiosInstance = axios.create({
  baseURL: `${url}/api`,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
