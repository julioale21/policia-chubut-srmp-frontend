import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
  headers: { "content-type": "application/json" },
});

export const updateAxiosToken = (token: string) => {
  instance.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
};

instance.interceptors.response.use(
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

export default instance;
