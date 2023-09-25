import React, { useState, useEffect } from "react";
import styles from './SnapshotUpload.module.css';
import axios from "axios";


function SnapshotUpload() {

  const [bannerInfo, setbannerInfo]=useState({
    bannerthumb:'',
    banneryear:'',
    bannerseason:'',
    bannerbutton:'',
    bannercomment:'',
  });
  


  const [year, setYear] = useState("");
  const [season, setSeason] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleUpload = () => {
    const data = {
      year: year,
      season: season,
      content: content
    };

    axios.post("/api/snapshot", data)
      .then(response => {
        // 업로드 성공 시 처리할 로직
        console.log("Upload successful:", response);
      })
      .catch(error => {
        // 업로드 실패 시 처리할 로직
        console.error("Upload failed:", error);
      });
  };

  useEffect(() => {
    // 서버로 세션 데이터 요청
    fetch('/api/getSessionData', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        const userId = data.userId;
        setUserId(userId); // userId 업데이트
        if (userId === 'zero5k') {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch session data:', error);
      });
  }, []);

  const onInput = (e) => {
    const { name, value } = e.target;
    setbannerInfo({
      ...bannerInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/snapbanner', bannerInfo);
      console.log(response.data); // 서버 응답 처리
    } catch (error) {
      console.error(error); // 에러 처리
    }
  };

  function DownloadTemplate() {
    // 파일의 경로와 이름 설정
    var fileName = "snapupload.html";
    var filePath = "/uploadtemplate/";
  
    // 다운로드 링크 생성
    var link = document.createElement("a");
    link.href = filePath + fileName;
    link.download = fileName;
  
    // 링크 클릭 및 삭제
    link.click();
    link.remove();
  }

  
  return (
    <div className={styles.SnapshotUp}>
    {admin?(
      <div className={styles.upBox}>
        <div className={styles.snapBanner}>
          <h1>Snapshot 배너 세팅</h1>
          <div className={styles.inputTollbox}>
             <p>배너 이미지(파일명)</p><input type="text" name="bannerthumb" onChange={onInput} placeholder="2023_season" />
          </div>
          <div className={styles.inputTollbox}>
            <p>연도 입력</p><input type="text" name="banneryear" onChange={onInput} placeholder="2023"/>
          </div>
          <div className={styles.inputTollbox}>
            <p>링크 옵션 선택</p>
          <select name="bannerseason" onChange={onInput}>
            <option>시즌을 선택하세요</option>
            <option value="spring">봄</option>
            <option value="summer">여름</option>
            <option value="autumn">가을</option>
            <option value="winter">겨울</option>
          </select>
          <select name="bannerbutton" onChange={onInput}>
            <option>버튼 유형 선택하세요</option>
            <option value="Spring 더보기+">봄</option>
            <option value="Summer 더보기+">여름</option>
            <option value="Sutumn 더보기+">가을</option>
            <option value="Winter 더보기+">겨울</option>
            <option value="Spring waiting">봄 대기</option>
            <option value="Summer waiting">여름 대기</option>
            <option value="Autumn waiting">가을 대기</option>
            <option value="Winter waiting">겨울 대기</option>
          </select>
          </div>
          <div className={`${styles.inputTollbox} ${styles.bannerComment}`}>
            <p>배너 코멘트 입력</p>
          <textarea type="text" name="bannercomment" onChange={onInput} />
          </div>
          <div className={styles.uploadBtn}>
             <button onClick={handleSubmit}>전송</button>
          </div>
        </div>
        <div className={styles.snapContent}>
          <h1>Snapshot Upload</h1>
          <div className={styles.inputTollbox}>
            <p>업로드 연도 / 시즌 선택</p>
          <select onChange={handleYearChange}>
            <option>연도를 선택하세요</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          <select onChange={handleSeasonChange}>
            <option>시즌을 선택하세요</option>
            <option value="spring">봄</option>
            <option value="summer">여름</option>
            <option value="autumn">가을</option>
            <option value="winter">겨울</option>
          </select>
          </div>
          <div className={styles.snapContentInput}>
             <p>Snapshot 태그 업로드 <font color="gray"> | 템플렛은 하단에서 다운로드</font></p>
             <textarea name="content" onChange={handleContentChange}></textarea>
          </div>
          <div className={styles.uploadBtn}>
             <button onClick={handleUpload}>등록</button>
             <button className={styles.DownloadButton} onClick={DownloadTemplate}>
                 템플릿 태그 다운로드
             </button>
          </div>
      </div>    
    </div>
    ):(
      <div><p>권한이 없습니다!</p></div>
    )
  }
  </div>
  );
}

export default SnapshotUpload;
