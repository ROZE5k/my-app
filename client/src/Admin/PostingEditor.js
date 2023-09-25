import { useEffect, useState } from 'react';
import styles from './PostingBoard.module.css';
import Axios from 'axios';

function PostingEditor() {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const [postingContent, setPostingContent] = useState({
    title: '',
    content: '',
    thumb: '',
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

  const submitEditor = () => {
    const data = {
      title: postingContent.title,
      content: postingContent.content,
      thumb: postingContent.thumb,
      board: selectedBoard,
    };

    Axios.post('/api/postupdate', data)
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
    setPostingContent({
      ...postingContent,
      [name]: value
    });
  };

  function handleSelect(event) {
    setSelectedBoard(event.target.value);
  }

  const searchPosts = (e) => {
    e.preventDefault();
    // Replace this code block with your direct request logic
    fetch(`/api/searchPosts?board=${selectedBoard}&title=${postingContent.title}`)
      .then(response => response.json())
      .then(data => {
        setSearchedPosts(data.posts);
      })
      .catch(error => {
        console.error('Failed to fetch posts:', error);
      });
      console.log(searchPosts);
  };

  const selectPost = post => {
    setSelectedPost(post);
    setPostingContent({
      title: post.title,
      content: post.content,
      thumb: post.thumb,
    });
  };

  const updatePost = () => {
    // Perform the update logic to update the selectedPost with the new values
  
    const updatedPost = {
      ...selectedPost,
      title: postingContent.title,
      content: postingContent.content,
      thumb: postingContent.thumb,
    };
  
    Axios.put(`/api/updatePost/${selectedPost.id}`, updatedPost)
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
                <option value="9">상세페이지</option>
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
                type="text"
                placeholder="검색할 제목을 입력하세요"
                onChange={getValue}
                name="title"
              />
              <button onClick={searchPosts}>검색</button>
            </div>
          </form>
          {searchedPosts.length > 0 && (
            <div className={styles.searchList}>
              <h2>검색 결과:</h2>
              <ul>
                {searchedPosts.map(post => (
                  <li key={post.id} onClick={() => selectPost(post)}>
                    {post.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedPost && (
            <div className={styles.selectedBox}>
              <h2>선택된 게시글:</h2>
              <div>
                <label htmlFor="selectedTitle">제목</label>
                <input
                  id="selectedTitle"
                  type="text"
                  name="title"
                  value={postingContent.title}
                  onChange={getValue}
                />
              </div>
              <div>
                <label htmlFor="selectedThumb">썸네일</label>
                <textarea
                  id="selectedThumb"
                  type="text"
                  name="thumb"
                  value={postingContent.thumb}
                  onChange={getValue}
                />
              </div>
              <div>
                <label htmlFor="selectedContent">컨텐츠 태그 입력</label>
                <textarea
                  id="selectedContent"
                  type="text"
                  name="content"
                  value={postingContent.content}
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

export default PostingEditor;
