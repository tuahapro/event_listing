import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor removed as authentication is no longer used

export default api;
