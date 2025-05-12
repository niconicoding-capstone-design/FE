import React, { useState } from "react";
import { login } from "../api/auth";
import { setTokens } from "../utils/token";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setUserEmail }) => {
  const [userEmail, setuserEmail] = useState("");
  const [userPasswd, setuserPasswd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setEmailError("유효하지 않은 이메일입니다.");
      valid = false;
    }

    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!pwdRegex.test(userPasswd)) {
      setPasswordError("숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요.");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { accessToken, refreshToken } = await login(userEmail, userPasswd);
      setTokens(accessToken, refreshToken);
      setUserEmail(userEmail);
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      alert("로그인 실패");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-purple"></div>
        <div className="loginbox">
          <h1 className="login-logo-text">SpiCoach</h1>
          <h2 className="signin-title">Sign In</h2>

          <form onSubmit={handleLogin} className="form-container">
            <label className="email-input-label">이메일</label>
            <div className={`input-wrapper ${emailError ? "error" : ""}`}>
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
                required
              />
            </div>
            {emailError && <p className="error-text">{emailError}</p>}

            <label className="pw-input-label">비밀번호</label>
            <div className={`input-wrapper password-wrapper ${passwordError ? "error" : ""}`}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                value={userPasswd}
                onChange={(e) => setuserPasswd(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? "/eye.png" : "/eye-off.png"}
                  alt="비밀번호 보기 토글"
                  className="eye-icon"
                />
              </button>
            </div>
            {passwordError && <p className="error-text">{passwordError}</p>}

            <button type="submit" className="loginButton">로그인</button>
          </form>

          <p className="signup-link">
            아직 계정이 없으신가요? <a href="/register">회원가입</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
