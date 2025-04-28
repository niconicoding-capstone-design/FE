import React, { useState } from "react";
import { register } from "../api/auth";
import { setTokens } from "../utils/token";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import "../styles/Register.css";

const Register = ({ setUserEmail }) => {
  const [form, setForm] = useState({
    userName: "",
    userGender: "",
    userEmail: "",
    userMobile: "",
    userBirth: "",
    userPasswd: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 서버에서 요구하는 데이터 구조로 form 데이터 재구성
      const registerData = {
        userName: form.userName,
        userGender: form.userGender, 
        userEmail: form.userEmail,
        userMobile: form.userMobile,
        userBirth: form.userBirth,
        userPasswd: form.userPasswd,
      };
      const { accessToken, refreshToken } = await register(registerData);
      setTokens(accessToken, refreshToken);
      setUserEmail(form.userEmail); // 회원가입 성공 시 이메일 저장
      alert("회원가입 성공!");
      navigate("/");
    } catch (err) {
      alert("회원가입 실패");
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h1 className="logo-text">SpiCoach</h1>
      <h2 className="signup-title">Sign up</h2>

      <form onSubmit={handleRegister} className="form-container">
        <div className="form-group">
          <label>이름</label>
          <input name="userName" placeholder="이름" onChange={handleChange} required />
        </div>
        {/* 성별 입력 필드 추가 (선택 또는 라디오 버튼 등) */}
        {/* 예시: */}
        <div className="form-group">
          <label>성별</label>
          <select name="userGender" onChange={handleChange} value={form.userGender} required>
            <option value="female">여성</option>
            <option value="male">남성</option>
          </select>
        </div>
        <div className="form-group">
          <label>이메일</label>
          <input name="userEmail" type="email" placeholder="이메일" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>전화번호</label>
          <input name="userMobile" placeholder="전화번호" onChange={handleChange} required />
          <small>010-1234-5678 형식으로 입력해주세요</small>
        </div>
        <div className="form-group">
          <label>생년월일</label>
          <input name="userBirth" placeholder="YYYY-MM-DD" onChange={handleChange} required />
          <small>YYYY-MM-DD 형식으로 입력해주세요.</small>
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input name="userPasswd" type="password" placeholder="비밀번호" onChange={handleChange} required />
        </div>

        <button type="submit" className="register-button">회원가입</button>
      </form>

      <p className="login-link">
        전에 회원가입을 하셨나요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
};

export default Register;