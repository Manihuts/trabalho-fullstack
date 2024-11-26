import axios from "axios";
import { useAuth } from "../context/authContext";

const { authToken } = useAuth();

const createAxiosInstance = () => {
  const apiClient = axios.create({
    baseURL: "http://localhost:5071",
    headers: {
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.request.use(
    (config) => {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createAxiosInstance;
