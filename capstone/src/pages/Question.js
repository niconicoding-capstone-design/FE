import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { uploadScript } from "../api/scriptApi";
import "../styles/Interview.css";

function Question({ userEmail }) {
  const videoRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false); // ✅ 모달 상태
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("웹캠 연결 실패:", err));
  }, []);

  useEffect(() => {
    const exampleScript = `안녕하세요. 오늘 발표할 주제는 인공지능입니다. 인공지능은 컴퓨터가 인간처럼 학습하고 추론할 수 있도록 하는 기술입니다.`;

    const fetchQuestions = async () => {
      try {
        const response = await uploadScript(exampleScript);
        const questionsArray = Object.values(response);
        setQuestions(questionsArray);
      } catch (error) {
        console.error("질문을 불러오는 데 실패했습니다.", error);
        setQuestions([]);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setShowModal(true); // ✅ 모달 열기
  };

  const handleSaveYes = () => {
    setShowModal(false);
    alert("저장 기능은 추후 구현 예정입니다.");
  };

  const handleSaveNo = () => {
    setShowModal(false);
    navigate("/"); // ✅ 홈(App.js)으로 이동
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div>
      {/* ✅ 헤더 */}
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

      <div className="interview-container">
        {/* 🎥 웹캠 */}
        <div className="video-section">
          <div className="video-header">
            <span>웹캠</span>
            <span className="timer">녹화 시간 {formatTime(time)}</span>
          </div>
          <video className="video" ref={videoRef} autoPlay muted playsInline />

          <div className="button-group">
            {!isRecording ? (
              <button className="start-button" onClick={handleStartRecording}>
                녹화 시작하기
              </button>
            ) : (
              <button className="finish-button" onClick={handleStopRecording}>
                녹화 끝내기
              </button>
            )}
          </div>
        </div>

        {/* ❓ 질문 리스트 */}
        <div className="script-section">
          <h2>질문 목록</h2>
          <ul style={{ paddingLeft: "20px" }}>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <li key={index} style={{ marginBottom: "10px", fontSize: "16px" }}>
                  {question}
                </li>
              ))
            ) : (
              <p>질문이 아직 없습니다.</p>
            )}
          </ul>
        </div>
      </div>

      {/* ✅ 모달창 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>수고하셨습니다. 영상 저장하겠습니까?</p>
            <div className="modal-buttons">
              <button onClick={handleSaveYes}>네</button>
              <button onClick={handleSaveNo}>아니요</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;
