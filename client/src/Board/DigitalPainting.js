import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import HTMLReactParser from 'html-react-parser';
import styles from "./DigitalPainting.module.css";

function DigitalPainting() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [optionShow, setOptionshow]=useState(false);
  const [contentShow, setContentshow]=useState(false);
  const [thumbNum, setThumbNum]=useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios
      .get('/api/posts', { params: { board: 1 } })
      .then((response) => {
        setPosts(response.data);
        setSelectedPost(response.data[0]); // 첫 번째 게시글 선택
      })
      .catch((error) => {
        console.log(error);
      });

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


  const handlePostClick = (post) => {
    setSelectedPost(post);
    setContentshow(true);
  };
 
  const toggleOption=(clickedNum)=>{
   setOptionshow(!optionShow);
   setThumbNum(clickedNum);
   if(thumbNum!==clickedNum){
    setOptionshow(true);
   }
  }
  const closeContent=()=>{
    scrollRef.current.scrollTop=0;
    setContentshow(false);
  }



  return (
    <div className={`${styles.boardViewBox} ${isMobile&&styles.mobileViewBox}`}>
      <div className={`${styles.thumbBox} ${styles.dpthumbBox}`}>
        {/* 모든 썸네일 보여주기 */}
        {posts.map((post) => (
         <div className={styles.thumbList} key={post.id}>
             <div className={styles.listThumb} dangerouslySetInnerHTML={{ __html: post.thumb }} onClick={() => handlePostClick(post)}></div>
              <ul className={styles.options}>
                <li className={styles.optionBtn} onClick={()=>toggleOption(post.id)}>. . .
                  <ul className={`${thumbNum===post.id&&optionShow&&styles.optionShow}`}>
                    {admin?
                    <li><Link to='/PostingEditor/'>Edit</Link></li>:''
                    }
                    <li>공유</li>
                  </ul>
                </li>
              </ul>
          </div>
        ))}
      </div>
      {/* 선택된 게시글 내용 보여주기 */}
      {contentShow?
      <div className={`${styles.contentBox} ${styles.dpcontentBox}`} ref={scrollRef} onClick={closeContent}>
      {selectedPost && (
        <div>
          <div className={styles.contentDetail}>
            <div> {HTMLReactParser(selectedPost.content)}</div>
            <button className={styles.closeContent} onClick={closeContent}>+</button>
          </div>
        </div>
      )}
      </div>
      :null}
    </div>
  );
}

export default DigitalPainting;
