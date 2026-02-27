// service.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4002/api/v1",
});

export const getProducts = () => API.get("/products");
export const createProduct = (data) => API.post("/create/products", data);
export const updateProduct = (id, data) => API.put(`/update/${id}`, data);
export const deleteProduct = (id) => API.delete(`/delete/${id}`);

// ADD THIS: For the Sidebar filters
export const filterProducts = (params) => API.get("/filter", { params });