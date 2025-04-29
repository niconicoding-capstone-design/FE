// App.js
import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { uploadScript } from "./api/scriptApi"; // axios 버전 사용
import Login from "./pages/Login";
import Register from "./pages/Register";
import Interview from "./pages/Interview";
import ScriptUploadPage from "./pages/ScriptUploadPage";
import "./App.css";

function Home({ userEmail }) {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();

  const handleUploadBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const scriptText = e.target.result;
      try {
        const responseData = await uploadScript(scriptText);
        console.log("서버 응답:", responseData);
        alert("스크립트가 서버에 성공적으로 업로드되었습니다.");
      } catch (error) {
        console.error("스크립트 업로드 실패:", error.response || error);
        const status = error.response?.status || "오류";
        alert(`스크립트 업로드 실패: ${status}`);
      }
    };

    reader.onerror = () => {
      alert("파일 읽기 중 오류 발생");
    };

    reader.readAsText(file);
  };

  const handleGoToInterview = () => {
    if (uploadedFile) {
      navigate("/Interview", { state: { file: uploadedFile } });
    } else {
      alert("파일을 먼저 업로드해주세요!");
    }
  };

  return (
    <div className="home">
      <div className="background-overlay" />
      <header className="header">
        <div className="logo">SpiCoach</div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/mypage">MyPage</Link>
          {userEmail ? (
            <span className="user-email">{userEmail}</span>
          ) : (
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          )}
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <h1>
            면접이나 발표처럼 중요한 순간,<br />말하기가 걱정되시나요?
          </h1>
          <p>SpiCoach는 여러분의 발표 연습을 도와드리겠습니다.</p>
        </section>

        <div className="upload-box" onClick={handleUploadBoxClick}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {uploadedFile ? (
            <div className="upload-info">
              <div className="file-name">{uploadedFile.name}</div>
              <div className="upload-success">업로드 완료!</div>
            </div>
          ) : (
            <>
              <div className="plus">+</div>
              <p className="upload-text">
                발표 대본 / 자기소개서(이력서) 등을 업로드한 후 <br />
                아래 버튼을 눌러주세요.
              </p>
            </>
          )}
        </div>

        <div className="button-group">
          <button className="action-button" onClick={handleGoToInterview}>
            면접 SpiCoach
          </button>
          <button className="action-button" disabled>
            발표 SpiCoach
          </button>
        </div>
      </main>

      <footer className="footer"></footer>

      <section className="footer-section">
        <div className="footer-text">
          We believe in produce. Tasty produce. Produce like: <br /><br />
          Apples. Oranges. Limes. Lemons. Guavas...
        </div>
      </section>
    </div>
  );
}

function App() {
  const [userEmail, setUserEmail] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home userEmail={userEmail} />} />
        <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
        <Route path="/register" element={<Register setUserEmail={setUserEmail} />} />
        <Route path="/Interview" element={<Interview userEmail={userEmail} />} />
        <Route path="/upload" element={<ScriptUploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
