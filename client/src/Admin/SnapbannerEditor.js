import { useEffect, useState } from 'react';
import styles from './SnapshotEditor.module.css';
import Axios from 'axios';

function SnapbannerEditor() {
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [selectedBanner, setselectedBanner] = useState("");
  const [searchedBanner, setsearchedBanner] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedContent, setselectedContent] = useState("");
  const [searchedContent, setsearchedContent] = useState([]);
  const [selectedPostcontent, setSelectedPostcontent] = useState(null);


  const [postingBanner, setpostingBanner] = useState({
    bannerthumb: '',
    banneryear: '',
    bannerseason: '',
    bannerbutton: '',
    bannercomment:'',
  });
  const [postingContent, setpostingContent] = useState({
    year: '',
    season: '',
    content: '',
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
    setpostingBanner({
      ...postingBanner,
      [name]: value
    });
  };
  const getSeason = e => {
    const { name, value } = e.target;
    setpostingContent({
      ...postingContent,
      [name]: value
    });
  };

  function handleSelect(event) {
    setselectedBanner(event.target.value);
  }

  function handleSelectcontent(event) {
    setselectedContent(event.target.value);
  }

  const searchPosts = (e) => {
    e.preventDefault();
    // Replace this code block with your direct request logic
    fetch(`/api/searchSnapbanner?banneryear=${selectedBanner}`)
      .then(response => response.json())
      .then(data => {
        setsearchedBanner(data.posts);
      })
      .catch(error => {
        console.error('Failed to fetch posts:', error);
      });
  };

  const searchContent = (e) => {
    e.preventDefault();
    // Replace this code block with your direct request logic
    fetch(`/api/searchSnapcontent?year=${selectedContent}`)
      .then(response => response.json())
      .then(data => {
        setsearchedContent(data.posts);
      })
      .catch(error => {
        console.error('Failed to fetch posts:', error);
      });
  };

  const selectPost = post => {
    setSelectedPost(post);
    setpostingBanner({
      bannerthumb: post.bannerthumb,
      banneryear: post.banneryear,
      bannerseason:post.bannerseason,
      bannerbutton:post.bannerbutton,
      bannercomment: post.bannercomment,
    });
  };

  const selectContent = cont => {
    setSelectedPostcontent(cont);
    setpostingContent({
      year: cont.year,
      season: cont.season,
      content: cont.content,
    });
  };

  const updateSnapbanner = () => {
    // Perform the update logic to update the selectedPost with the new values
  
    const updatedPost = {
      ...selectedPost,
      bannerthumb: postingBanner.bannerthumb,
      banneryear: selectedBanner,
      bannerseason: postingBanner.bannerseason,
      bannerbutton: postingBanner.bannerbutton,
      bannercomment: postingBanner.bannercomment,
    };
  
    Axios.put(`/api/updateSnapbanner/${selectedPost.id}`, updatedPost)
      .then(response => {
        // Update successful logic
        alert('수정완료!')
      })
      .catch(error => {
        // Update failed logic
        console.error('Update failed:', error);
      });
  };
  
  const updateSnapContent = () => {
    // Perform the update logic to update the selectedPost with the new values
  
    const updatedContent = {
      ...selectedPostcontent,
      year: postingContent.year,
      season: postingContent.season,
      content: postingContent.content,
    };
  
    Axios.put(`/api/updateSnapcontent/${selectedPostcontent.id}`, updatedContent)
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
        <div className={styles.snapBanners}>
          <form className='form-wrapper'>
            <div className={styles.formHead}>
              <select onChange={handleSelect} className={styles.boardSelect}>
                <option value="">연도 선택</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
              <button onClick={searchPosts}>검색</button>
            </div>
          </form>
          {searchedBanner.length > 0 && (
            <div className={styles.searchList}>
              <h2>검색 결과:</h2>
              <ul>
                {searchedBanner.map(post => (
                  <li key={post.id} onClick={() => selectPost(post)}>
                    {post.bannerseason}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedPost && (
            <div className={styles.selectedBox}>
              <h2>선택된 게시글:</h2>
              <div>
                <label htmlFor="selectedBanner">배너 이름 입력</label>
                <input
                  id="selectedBanner"
                  type="text"
                  name="bannerthumb"
                  value={postingBanner.bannerthumb}
                  onChange={getValue}
                />
                <select name="bannerseason" onChange={getValue}>
                    <option>시즌 선택</option>
                    <option value="spring">봄</option>
                    <option value="summer">여름</option>
                    <option value="autumn">가을</option>
                    <option value="winter">겨울</option>
                </select>
                <select name="bannerbutton" onChange={getValue}>
                     <option>버튼 유형 선택</option>
                     <option value="Spring 더보기+">봄</option>
                     <option value="Summer 더보기+">여름</option>
                     <option value="Autumn 더보기+">가을</option>
                     <option value="Winter 더보기+">겨울</option>
                     <option value="Spring waiting">봄 대기</option>
                     <option value="Summer waiting">여름 대기</option>
                     <option value="Autumn waiting">가을 대기</option>
                     <option value="Winter waiting">겨울 대기</option>
                </select>
              </div>
              <div>
                <label htmlFor="selectedComment">배너 코멘트</label>
                <textarea
                  id="selectedComment"
                  type="text"
                  name="bannercomment"
                  value={postingBanner.bannercomment}
                  onChange={getValue}
                />
              </div>
              <div>
              </div>
              <button onClick={updateSnapbanner}>수정</button>
            </div>
            
          )}
        </div>
        <div className={styles.snapBanners}>
          <form className='form-wrapper'>
            <div className={styles.formHead}>
              <select onChange={handleSelectcontent} className={styles.boardSelect}>
                <option value="">연도 선택</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
              <button onClick={searchContent}>검색</button>
            </div>
          </form>
          {searchedContent.length > 0 && (
            <div className={styles.searchList}>
              <h2>검색 결과:</h2>
              <ul>
                {searchedContent.map(cont => (
                  <li key={cont.id} onClick={() => selectContent(cont)}>
                    {cont.season}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedPostcontent && (
            <div className={styles.selectedBox}>
              <h2>선택된 게시글:</h2>
              <div>
                <select name="year" onChange={getSeason}>
                     <option value="">연도 선택</option>
                     <option value="2026">2026</option>
                     <option value="2025">2025</option>
                     <option value="2024">2024</option>
                     <option value="2023">2023</option>
                     <option value="2022">2022</option>
                     <option value="2021">2021</option>
                </select>
                <select name="season" onChange={getSeason}>
                     <option>시즌 선택</option>
                     <option value="spring">봄</option>
                     <option value="summer">여름</option>
                     <option value="autumn">가을</option>
                     <option value="winter">겨울</option>
                </select>
              </div>
              <div className={styles.snapContentinput}>
                <label htmlFor="selectedContent">Snapshot 태그 업로드</label>
                <textarea
                  id="selectedContent"
                  type="text"
                  name="content"
                  value={postingContent.content}
                  onChange={getSeason}
                />
              </div>
              <div>
              </div>
              <button onClick={updateSnapContent}>수정</button>
            </div>
            
          )}
        </div>  
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

export default SnapbannerEditor;
