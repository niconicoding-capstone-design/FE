import React, { useState } from "react";
import { register } from "../api/auth";
import { setTokens } from "../utils/token";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = ({ setUserEmail }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    userName: "",
    userGender: "",
    userEmail: "",
    userMobile: "",
    userBirth: "",
    userPasswd: "",
    userPasswdConfirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const isEmailValid = emailRegex.test(form.userEmail);
  const isPasswordValid = passwordRegex.test(form.userPasswd);
  const doPasswordsMatch = form.userPasswd === form.userPasswdConfirm;

  const isStep1Valid =
    form.userName && form.userGender && form.userMobile && form.userBirth;
  const isStep2Valid =
    form.userEmail &&
    form.userPasswd &&
    form.userPasswdConfirm &&
    isEmailValid &&
    isPasswordValid &&
    doPasswordsMatch;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "userEmail") {
      setEmailError(emailRegex.test(value) ? "" : "올바른 형식이 아닙니다");
    }

    if (name === "userPasswd") {
      setPasswordError(
        passwordRegex.test(value)
          ? ""
          : "영문자, 숫자, 특수기호를 모두 포함 & 8자리 이상 입력해주세요"
      );
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isStep2Valid) return;

    try {
      const registerData = {
        userName: form.userName,
        userGender: form.userGender,
        userEmail: form.userEmail,
        userMobile: form.userMobile,
        userBirth: form.userBirth,
        userPasswd: form.userPasswd,
      };

      console.log("보낼 회원가입 데이터:", registerData);

      const { accessToken, refreshToken } = await register(registerData);
      setTokens(accessToken, refreshToken);
      setUserEmail(form.userEmail);
      alert("회원가입 성공!");
      navigate("/");
    } catch (err) {
      alert("회원가입 실패");
      console.error(err);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-image"></div>
        <div className="register-form-box">
          <h1 className="register-logo-text">SpiCoach</h1>
          <h2 className="signup-title">Sign up</h2>

          <form
            onSubmit={step === 1 ? handleNext : handleRegister}
            className="form-container"
          >
            {step === 1 && (
              <>
                <div className="name-group">
                  <label className="reg_name">이름</label>
                  <input
                    name="userName"
                    placeholder="이름을 입력해주세요"
                    value={form.userName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>생년월일</label>
                    <input
                      name="userBirth"
                      placeholder="YYYY-MM-DD"
                      value={form.userBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>성별</label>
                    <select
                      name="userGender"
                      value={form.userGender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">선택</option>
                      <option value="female">여성</option>
                      <option value="male">남성</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>전화번호</label>
                  <input
                    name="userMobile"
                    placeholder="전화번호를 입력해주세요"
                    value={form.userMobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-group">
                  <label>이메일</label>
                  <input
                    name="userEmail"
                    placeholder="email@example.com"
                    value={form.userEmail}
                    onChange={handleChange}
                    required
                  />
                  {emailError && <p className="error-text">{emailError}</p>}
                </div>

                <div className="form-group password-group">
                  <label>비밀번호</label>
                  <div className="input-with-icon">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="userPasswd"
                      placeholder="비밀번호를 입력해주세요"
                      value={form.userPasswd}
                      onChange={handleChange}
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
                </div>

                <div className="form-group password-group">
                  <label>비밀번호 확인</label>
                  <div className="input-with-icon">
                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      name="userPasswdConfirm"
                      placeholder="비밀번호를 다시 입력해주세요"
                      value={form.userPasswdConfirm}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-visibility"
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    >
                      <img
                        src={showPasswordConfirm ? "/eye.png" : "/eye-off.png"}
                        alt="비밀번호 보기 토글"
                        className="eye-icon"
                      />
                    </button>
                  </div>
                  {form.userPasswdConfirm &&
                    form.userPasswd !== form.userPasswdConfirm && (
                      <p className="error-text">비밀번호가 일치하지 않습니다</p>
                    )}
                </div>
              </>
            )}

            <button
              type="submit"
              className={`register-button ${step === 1
                  ? isStep1Valid
                    ? "active"
                    : ""
                  : isStep2Valid
                    ? "active"
                    : ""
                }`}
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
            >
              {step === 1 ? "다음" : "회원가입"}
            </button>
          </form>

          <p className="login-link">
            계정이 있으신가요? <Link to="/login">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
