import React, { useState } from "react";
import { uploadScript } from "../api/scriptApi";

function ScriptUploadPage() {
  const [scriptText, setScriptText] = useState("");
  const [response, setResponse] = useState(null);

  const handleUpload = async () => {
    try {
      const result = await uploadScript(scriptText);
      setResponse(result);
    } catch (err) {
      console.error("스크립트 업로드 실패:", err);
    }
  };

  return (
    <div>
      <h2>스크립트 업로드</h2>
      <textarea
        value={scriptText}
        onChange={(e) => setScriptText(e.target.value)}
        rows={10}
        cols={60}
        placeholder="스크립트 내용을 입력하세요..."
      />
      <br />
      <button onClick={handleUpload}>업로드</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default ScriptUploadPage;
