import axios from "axios";

const API = process.env.REACT_APP_API_URL;

console.log("API URL:", API);

// 로그인 요청
export const login = async (email, password) => {
  console.log("Login 요청 URL:", `${API}/api/auth/login`);

  const res = await axios.post(`${API}/api/auth/login`, {
    userEmail: email,
    userPasswd: password,
  });

  // 응답 확인용 콘솔 출력
  console.log("Login 응답 데이터:", res.data);

  const { accessToken, refreshToken } = res.data;
  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  return res.data;
};

// 회원가입 요청
export const register = async (data) => {
  console.log("Register 요청 URL:", `${API}/api/auth/register`);

  const res = await axios.post(`${API}/api/auth/register`, data);

  // 응답 확인용 콘솔 출력
  console.log("Register 응답 데이터:", res.data);

  const { accessToken, refreshToken } = res.data;
  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  return res.data;
};

// 토큰 재발급 요청
export const refresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("Refresh 요청 URL:", `${API}/api/auth/refresh`);
  console.log("보낼 Refresh Token 헤더:", refreshToken);

  const res = await axios.post(
    `${API}/api/auth/refresh`,
    {},
    {
      headers: {
        "Refresh-Token": refreshToken,
      },
    }
  );

  // 응답 확인용 콘솔 출력
  console.log("Refresh 응답 데이터:", res.data);

  return res.data;
};
