import React, { useState } from "react";
import { login } from "../api/auth";
import { setTokens } from "../utils/token";
import { useNavigate } from 'react-router-dom';

import "../styles/Login.css";

const Login = ({ setUserEmail }) => {
  const [userEmail, setuserEmail] = useState("");
  const [userPasswd, setuserPasswd] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, refreshToken } = await login(userEmail, userPasswd);
      setTokens(accessToken, refreshToken);
      setUserEmail(userEmail); // 로그인 성공 시 이메일 저장
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      alert("로그인 실패");
    }
  };

  return (
    <div className="login-container">
      <div className="login-purple"></div>

      <div className="loginbox">
        <h1 className="logo-text">SpiCoach</h1>
        <h2 className="signin-title">Sign In</h2>
        <p className="signin-subtitle">이메일과 비밀번호를 입력해 주세요</p>

        <form onSubmit={handleLogin} className="form-container">
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="이메일" 
              value={userEmail} 
              onChange={(e) => setuserEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Passwd</label>
            <input 
              type="password" 
              placeholder="비밀번호" 
              value={userPasswd} 
              onChange={(e) => setuserPasswd(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-button">로그인</button>
        </form>

        <p className="signup-link">
          아직 회원가입을 안하셨나요? <a href="/register">회원가입</a>
        </p>
      </div>
    </div>
  );
};

export default Login;