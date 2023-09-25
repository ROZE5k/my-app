import { useEffect, useState } from 'react';
import styles from './PostingBoard.module.css';
import Axios from 'axios';

function PostingBoard() {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);




  const [postingContent, setpostingContent] = useState({
    title: '',
    content: '',
    thumb:'',
  })


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

  const submitPost = () => {
    const data = {
      title: postingContent.title,
      content: postingContent.content,
      thumb: postingContent.thumb,
      board:selectedBoard,
    };

    Axios.post('/api/insert', data)
    .then(response => {
      // 업로드 성공 시 처리할 로직
      console.log("Upload successful:", response);
    })
    .catch(error => {
      // 업로드 실패 시 처리할 로직
      console.error("Upload failed:", error);
    });
  };
  

  const getValue = e => {
    const { name, value } = e.target;
    setpostingContent({
      ...postingContent,
      [name]: value
    })
  };


function handleSelect(event) {
  setSelectedBoard(event.target.value);
}

function DownloadTemplate() {
  // 파일의 경로와 이름 설정
  var fileName = "uploadtemplate.html";
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
  <div className={styles.adminMain}>
    {admin?(<>
    <form className='form-wrapper'>
      <div className={styles.formHead}>
      <select onChange={handleSelect} className={styles.boardSelect}>
        <option value="">게시판 선택</option>
        <option value="1">디지털드로잉</option>
        <option value="2">컨셉아트</option>
        <option value="3">드로잉</option>
        <option value="4">일러스트</option>
        <option value="5">Special Stage</option>
        <option value="6">웹디자인</option>
        <option value="7">그래픽디자인</option>
        <option value="8">패키지디자인</option>
        <option value="9">제품 상세페이지</option>
        <option value="10">모션그래픽</option>
        <option value="11">풍경사진</option>
        <option value="12">제품촬영</option>
        <option value="13">스페셜촬영</option>
        <option value="14">사진이야기</option>
      </select>
      <label htmlFor="title">제목</label>
      <input
        id="title"
        className="title-input"
        type='text'
        placeholder='제목을 입력하세요'
        onChange={getValue}
        name='title'
      />
      </div>
      <div className={styles.contentInputs}>
        <div className={styles.thumbInput}>
           <label htmlFor="thumb">썸네일</label>
           <textarea
             id="thumb"
             type="text"
             name="thumb"
             onChange={getValue}
             placeholder="이미지 태그 입력 <img src='/uploads/이미지'/>"
           />
        </div>
        <div className={styles.contentInput}>
            <label htmlFor="content">컨텐츠 태그 입력</label>
            <textarea
              id="content"
              type="text"
              placeholder="컨텐츠 태그 입력"
              name="content"
              onChange={getValue}
            />
          </div>
      </div>
      <div className={styles.submitButtons}>
      <button className={styles.DownloadButton} onClick={DownloadTemplate}>
        템플릿 태그 다운로드
      </button>
      <button className={styles.submitButton} onClick={submitPost}>
        입력
      </button>
      </div>
    </form>
    </>
      ):(
        <div>
          <p>권한이 없습니다!</p>
        </div>
      )
    }
  </div>
);

}

export default PostingBoard;
