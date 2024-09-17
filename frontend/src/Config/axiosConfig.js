import axios from "axios";

const api = axios.create({
  baseURL: "https://apex-bets.vercel.app/api",
  withCredentials: true,
});

export default api;
