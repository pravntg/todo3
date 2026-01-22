import axios from "axios";

/*
  Use Render backend in production
  Use localhost in development
*/
const API = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://YOUR-BACKEND-NAME.onrender.com/api"
      : "http://localhost:5000/api",
});

/* ================= AUTO ATTACH TOKEN ================= */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
