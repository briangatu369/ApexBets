import axios from "axios";

const api = axios.create({
  baseURL: "https://apexbets.vercel.app/api",
  withCredentials: true,
});

export default api;
