import axios from "axios";

const API = axios.create({
  baseURL: "https://tic-tac-toe-vercel-backend.vercel.app",
});

// token are added every request
API.interceptors.request.use((req: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// sign up
export const signup = (formData: { username: string; password: string }) =>
  API.post("/users/signup", formData);

// login
export const login = (formData: { username: string; password: string }) =>
  API.post("/users/login", formData);

// logout
export const logout = () => API.post("/users/logout");
