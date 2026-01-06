import axios from "axios";

const api = axios.create({
  baseURL: "https://desserts-api-sandy.vercel.app",
  timeout: 5000,
});

export default api;
