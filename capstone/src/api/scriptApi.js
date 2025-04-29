// src/api/scriptApi.js
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const uploadScript = async (scriptText) => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.post(
    `${API}/api/scripts/upload`,
    { script: scriptText }, // key 이름이 Swagger에 맞는지 확인!
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
