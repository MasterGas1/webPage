import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("mg-23-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
