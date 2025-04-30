import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const uploadScript = async (scriptText) => {
  const token = localStorage.getItem("accessToken");

  console.log("💬 [uploadScript] API URL:", `${API}/api/scripts/upload`);
  console.log("💬 [uploadScript] accessToken:", token);
  console.log("💬 [uploadScript] 원본 script 내용:", scriptText.slice(0, 100), "...");

  // 줄바꿈을 JSON 문자열에 맞게 \\n 으로 이스케이프 처리
  const escapedScript = scriptText.replace(/\n/g, "\\n");

  const payload = { scripts: escapedScript };
  console.log("📦 [uploadScript] 전송 payload:", JSON.stringify(payload, null, 2));

  try {
    const res = await axios.post(
      `${API}/api/scripts/upload`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ [uploadScript] 서버 응답 성공");
    console.log("📨 응답 전체 객체:", res);  // 응답 객체 전체 출력
    console.log("📨 응답 데이터 (res.data):", res.data);  // 응답 데이터 확인

    return res.data;  // 응답 데이터 반환
  } catch (error) {
    if (error.response) {
      console.error("❌ [uploadScript] 서버 응답 오류:");
      console.error("🔻 상태 코드:", error.response.status);
      console.error("🔻 응답 데이터:", error.response.data);
    } else {
      console.error("❌ [uploadScript] 네트워크 또는 기타 오류:", error.message);
    }
    throw error;
  }
};
