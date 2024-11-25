import axios from "axios";

console.log("Backend API URL:", process.env.REACT_APP_BACKEND_API_URL);

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Não autorizado - redirecionando para login");
      localStorage.removeItem("authToken");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export const getProducts = () => api.get("/products/getAll");
export const createProduct = (data) => api.post("/products/create", data);
export const updateProduct = (data) => api.put(`/products/update`, data);
export const deleteProduct = (id) => api.delete(`/products/delete`, { data: { id } });

export const getManufacturers = () => api.get("/manufacturers/getAll");


export default api;
