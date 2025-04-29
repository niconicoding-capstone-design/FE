import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import '../styles/Interview.css';

const Interview = ({ userEmail }) => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { file } = location.state || {}; // Home 페이지에서 넘긴 파일

  const [scriptText, setScriptText] = useState(""); // 파일 내용 저장
  const [time, setTime] = useState(0); // 카운트업 타이머 (초단위)
  const [isStarted, setIsStarted] = useState(false); // 타이머 시작 여부
  const [isPaused, setIsPaused] = useState(false); // 타이머 일시 정지 여부
  const [isBlurred, setIsBlurred] = useState(false); // 스크립트 블러 여부

  useEffect(() => {
    // 웹캠 연결
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("웹캠 연결 실패:", err));

    // 타이머 카운트업
    let timer;
    if (isStarted && !isPaused) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1); // 시간이 1초씩 증가
      }, 1000);
    }

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [isStarted, isPaused]); // isStarted, isPaused가 변경될 때마다 타이머 시작/중지

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setScriptText(e.target.result); // 파일 내용 읽기
      };
      reader.readAsText(file);
    }
  }, [file]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleStart = () => {
    setIsStarted(true); // 타이머 시작
    setIsPaused(false); // 일시 정지 상태 해제
  };

  const handleStop = () => {
    setIsPaused(true); // 타이머 일시 정지
  };

  const handleResume = () => {
    setIsPaused(false); // 타이머 재시작
  };

  const handleFinish = () => {
    alert("발표가 종료되었습니다!");
    navigate("/"); // 홈으로 이동
  };

  const handleToggleBlur = () => {
    setIsBlurred((prev) => !prev); // 블러 효과 토글
  };

  return (
    <div className="interview-container">
      <header className="interview-header">
        <div className="interview-logo">SpiCoach</div>
        <nav className="interview-nav">
          <Link to="/">Home</Link>
          <Link to="/mypage">MyPage</Link>
          {userEmail ? (
            <span className="interview-user-email">{userEmail}</span>
          ) : (
            <Link to="/login">
              <button className="interview-login-button">Login</button>
            </Link>
          )}
        </nav>
      </header>

      <div className="video-section">
        <div className="video-header">
          <span><input type="text" placeholder="제목을 입력하세요"></input></span>
          <span className="timer">진행 시간 {formatTime(time)}</span>
        </div>
        <video className="video" ref={videoRef} autoPlay muted playsInline />
      </div>

      <div className="script-section">
        <div className="script-header">
          <span>발표 스크립트</span>
          <label className="toggle-switch">
            <input type="checkbox" onChange={handleToggleBlur} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="script-content" style={{ filter: isBlurred ? "blur(5px)" : "none" }}>
          {scriptText ? scriptText : "스크립트 파일을 불러오는 중..."}
        </div>
        <div className="button-group">
          {!isStarted ? (
            <button className="start-button" onClick={handleStart}>
              시작하기
            </button>
          ) : isPaused ? (
            <>
              <button className="resume-button" onClick={handleResume}>
                다시 시작하기
              </button>
              <button className="finish-button" onClick={handleFinish}>
                발표 마치기
              </button>
            </>
          ) : (
            <>
              <button className="stop-button" onClick={handleStop}>
                멈추기
              </button>
              <button className="finish-button" onClick={handleFinish}>
                발표 마치기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;