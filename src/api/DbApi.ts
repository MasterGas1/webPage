import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = Cookies.get("mg-23-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
