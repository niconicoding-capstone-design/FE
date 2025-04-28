import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/Interview.css';

const Interview = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { file } = location.state || {}; // Home 페이지에서 넘긴 파일

  const [scriptText, setScriptText] = useState(""); // 파일 내용 저장
  const [time, setTime] = useState(30);

  useEffect(() => {
    // 웹캠 연결
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("웹캠 연결 실패:", err));

    // 타이머 카운트다운
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const handleFinish = () => {
    alert("발표가 종료되었습니다!");
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className="interview-container">
      <div className="video-section">
        <div className="video-header">
          <span>캡스톤 1차 발표 연습</span>
          <span className="timer">진행 시간 {formatTime(time)}</span>
        </div>
        <video className="video" ref={videoRef} autoPlay muted playsInline />
      </div>

      <div className="script-section">
        <div className="script-header">
          <span>발표 스크립트</span>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <div className="script-content">
          {scriptText ? scriptText : "스크립트 파일을 불러오는 중..."}
        </div>
        <button className="finish-button" onClick={handleFinish}>
          발표 마치기 ➔
        </button>
      </div>
    </div>
  );
};

export default Interview;
