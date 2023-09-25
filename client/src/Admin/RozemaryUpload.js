import React,{useState, useEffect} from "react";
import styles from "./RozemaryUpload.module.css";

function RozemaryUpload(){
    const [userId, setUserId] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [rminput, setrmInput] = useState({
        rmbanner:"",
        rmsubject:"",
        rmcontent:"",
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

      const onChange=(e)=>{
         const {name, value}=e.target;
         setrmInput({
            ...rminput,
            [name]:value,
         })
      }
    
      const rmUpload = () => {
        fetch('/api/rmbanner/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rmbanner: rminput.rmbanner,
            rmsubject: rminput.rmsubject,
            rmcontent: rminput.rmcontent,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle response data if needed
            alert('등록 완료!')
          })
          .catch((error) => {
            console.error('Failed to upload RM banner:', error);
          });
      };

      function DownloadRMtemplate() {
        // 파일의 경로와 이름 설정
        var fileName = "rozemaryupload.html";
        var filePath = "/uploadtemplate/";
      
        // 다운로드 링크 생성
        var link = document.createElement("a");
        link.href = filePath + fileName;
        link.download = fileName;
      
        // 링크 클릭 및 삭제
        link.click();
        link.remove();
      }

    return(
        <>
        {admin?(
        <div className={styles.RMupload}>
            <h1>RozeMary 롤링배너 업로드</h1>
            <div className={styles.rmbanner}>
                 <p>배너 경로: </p><input type="text" name="rmbanner" placeholder="<img src='/rozemary/배너이름.jpg'>" onChange={onChange}/>
            </div>
            <div className={styles.rmbanner}>
                 <p>배너 이름: </p><input type="text" name="rmsubject" placeholder="배너 이름을 입력하세요" onChange={onChange}/>
            </div>
            <div className={styles.rmbanner_content}>
                 <p>배너 info: </p>
                 <textarea name="rmcontent" type="text" onChange={onChange}/>
            </div>
            <div className={styles.rmbutton}>
                <button onClick={DownloadRMtemplate}>템플렛 태그 다운로드</button>
                <button onClick={rmUpload}>등록</button>
            </div>
        </div>
        
        ):(
            <div className={styles.RMupload}>
                <p>권한이 없습니다!</p>
            </div>
         )
        }
        </>
    );
};

export default RozemaryUpload;