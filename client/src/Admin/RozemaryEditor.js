import { useEffect, useState } from 'react';
import styles from './RozemaryEditor.module.css';
import Axios from 'axios';

function RozemaryEditor() {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const [postingrmcontent, setPostingrmcontent] = useState({
    rmbanner:'',
    rmsubject: '',
    rmcontent: '',
  });

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


  const getValue = e => {
    const { name, value } = e.target;
    setPostingrmcontent({
      ...postingrmcontent,
      [name]: value
    });
  };


  const searchPosts = (e) => {
    e.preventDefault();
    // Replace this code block with your direct request logic
    fetch(`/api/searchrmbanner?rmsubject=${postingrmcontent.rmsubject}`)
      .then(response => response.json())
      .then(data => {
        setSearchedPosts(data.posts);
      })
      .catch(error => {
        console.error('Failed to fetch posts:', error);
      });
  };

  const selectPost = post => {
    setSelectedPost(post);
    setPostingrmcontent({
      rmbanner: post.rmbanner,
      rmsubject: post.rmsubject,
      rmcontent: post.rmcontent,
    });
  };

  const updatePost = () => {
    // Perform the update logic to update the selectedPost with the new values
  
    const updatedPost = {
      ...selectedPost,
      rmbanner: postingrmcontent.rmbanner,
      rmsubject: postingrmcontent.rmsubject,
      rmcontent: postingrmcontent.rmcontent,
    };
  
    Axios.put(`/api/updatermbanner/${selectedPost.idx}`, updatedPost)
      .then(response => {
        // Update successful logic
        alert('수정완료!')
      })
      .catch(error => {
        // Update failed logic
        console.error('Update failed:', error);
      });
  };
  

  return (
    <div className={styles.adminMain}>
      {admin ? (
        <>
          <form className='form-wrapper'>
            <div className={styles.formHead}>
              <label htmlFor="rmsubject">배너 이름</label>
              <input
                id="rmsubject"
                className="rmsubject-input"
                type="text"
                placeholder="검색할 제목을 입력하세요"
                onChange={getValue}
                name="rmsubject"
              />
              <button onClick={searchPosts}>검색</button>
            </div>
          </form>
          {searchedPosts.length > 0 && (
            <div className={styles.searchList}>
              <h2>검색 결과:</h2>
              <ul>
                {searchedPosts.map(post => (
                  <li key={post.idx} onClick={() => selectPost(post)}>
                    {post.rmsubject}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedPost && (
            <div className={styles.selectedBox}>
              <h2>선택된 게시글:</h2>
              <div>
                <label htmlFor="selectedrmbanner">썸네일</label>
                <textarea
                  id="selectedrmbanner"
                  type="text"
                  name="rmbanner"
                  value={postingrmcontent.rmbanner}
                  onChange={getValue}
                />
              </div>
              <div>
                <label htmlFor="selectedrmsubject">제목</label>
                <input
                  id="selectedrmsubject"
                  type="text"
                  name="rmsubject"
                  value={postingrmcontent.rmsubject}
                  onChange={getValue}
                />
              </div>
              <div className={styles.rmcontentEdit}>
                <label htmlFor="selectedrmcontent">컨텐츠 태그 입력</label>
                <textarea
                  id="selectedrmcontent"
                  type="text"
                  name="rmcontent"
                  value={postingrmcontent.rmcontent}
                  onChange={getValue}
                />
              </div>
              <button onClick={updatePost}>수정</button>
            </div>
          )}
        </>
      ) : (
        <div>
          <p>권한이 없습니다!</p>
        </div>
      )
    }
  </div>
);

}

export default RozemaryEditor;
