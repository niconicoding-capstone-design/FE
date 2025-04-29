// src/api/scriptApi.js
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const uploadScript = async (scriptText) => {
  const token = localStorage.getItem("accessToken");

  console.log("💬 [uploadScript] API URL:", `${API}/api/scripts/upload`);
  console.log("💬 [uploadScript] accessToken:", token);
  console.log("💬 [uploadScript] script 내용:", scriptText.slice(0, 100), "...");

  try {
    const res = await axios.post(
      `${API}/api/scripts/upload`,
      { script: scriptText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ [uploadScript] 응답 성공:", res.data);
    return res.data;

  } catch (error) {
    if (error.response) {
      console.error("❌ [uploadScript] 서버 응답 오류:", error.response.status, error.response.data);
    } else {
      console.error("❌ [uploadScript] 네트워크 오류 또는 기타:", error.message);
    }
    throw error;
  }
};
