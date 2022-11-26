import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-ov5ba256y-brunowbbs.vercel.app",
});

export default api;
