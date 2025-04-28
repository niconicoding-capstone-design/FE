import axios from "axios";

const API = process.env.REACT_APP_API_URL;

console.log("API URL:", API);

export const login = async (email, password) => {
  console.log("Login 요청 URL:", `${API}/api/auth/login`);
  const res = await axios.post(`${API}/api/auth/login`, {
    userEmail: email,
    userPasswd: password,
  });
  return res.data;
};

export const register = async (data) => {
  console.log("Register 요청 URL:", `${API}/api/auth/register`); 
  const res = await axios.post(`${API}/api/auth/register`, data);
  return res.data;
};

export const refresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await axios.post(
    `${API}/auth/refresh`,
    {},
    { headers: { "Refresh-Token": refreshToken } }
  );
  return res.data;
};
