import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
  headers: { "content-type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config)  => {
    const session = await getSession();

    console.log("session", session);

    if (true) {
      // @ts-ignore
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${session?.token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        if (!error.config.skipAuthRedirect) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
