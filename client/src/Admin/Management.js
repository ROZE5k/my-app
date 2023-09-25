import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import styles from './Management.module.css';

function Management() {
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [totalSnaps, setTotalSnaps] = useState(null);
  const [totalRm, setTotalRm] = useState(null);
  const [boardCount, setBoardCount] = useState([
    {
      boardname: 'Landscape Photography',
      boardLength: 0,
    },
    {
      boardname: 'Product Photography',
      boardLength: 0,
    },
    {
      boardname: 'Special Photography',
      boardLength: 0,
    },
    {
      boardname: 'Behind Story',
      boardLength: 0,
    },
  ]);
  const [ArtCount, setArtCount] = useState([
    {
      boardname: 'Digital Painting',
      boardLength: 0,
    },
    {
      boardname: 'Concept Art',
      boardLength: 0,
    },
    {
      boardname: 'Drawing',
      boardLength: 0,
    },
    {
      boardname: 'Illustration',
      boardLength: 0,
    },
    {
      boardname: 'Specail Stage',
      boardLength: 0,
    },
  ]);
  const [VDCount, setVDCount] = useState([
    {
      boardname: 'Web Design',
      boardLength: 0,
    },
    {
      boardname: 'Graphic Design',
      boardLength: 0,
    },
    {
      boardname: 'Package Design',
      boardLength: 0,
    },
    {
      boardname: 'Product Detail',
      boardLength: 0,
    },
    {
      boardname: 'Motion Graphic',
      boardLength: 0,
    },
  ]);

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

    fetch('/api/postslength', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedBoardCount = [...boardCount]; // 기존의 boardCount 배열 복사
        const updatedArtCount = [...ArtCount]; // 기존의 boardCount 배열 복사
        const updatedVDCount = [...VDCount]; // 기존의 boardCount 배열 복사
      
        for (let i = 11; i <= 14; i++) {
          const boardCountObj = data.find((item) => item.board === i);
          const boardCount = boardCountObj ? boardCountObj.count : 0;
          updatedBoardCount[i - 11].boardLength = [boardCount];
        }
      
        setBoardCount(updatedBoardCount);

        for (let j = 1; j <= 5; j++) {
          const ArtCountObj = data.find((item) => item.board === j);
          const ArtCount = ArtCountObj ? ArtCountObj.count : 0;
          updatedArtCount[j - 1].boardLength = [ArtCount];
        }

        setArtCount(updatedArtCount);

        for (let k = 6; k <= 10; k++) {
          const VDCountObj = data.find((item) => item.board === k);
          const VDCount = VDCountObj ? VDCountObj.count : 0;
          updatedVDCount[k - 6].boardLength = [VDCount];
        }

        setVDCount(updatedVDCount);

      })
      .catch((error) => {
        console.error('Failed to fetch session data:', error);
      });

      fetch('/api/snapshotlength',{
        method:'GET',
      })
      .then(response => response.json())
      .then(data => {
        setTotalSnaps(data.count);
      })
      .catch(error => {
        console.error('Error fetching total post count:', error);
      });

      fetch('/api/rmbannerlength',{
        method:'GET',
      })
      .then(response => response.json())
      .then(data => {
        setTotalRm(data.count);
      })
      .catch(error => {
        console.error('Error fetching total post count:', error);
      });

  }, []);

  return (
    <div className={styles.rozeManagement}>
      {admin ? (
        <div className={styles.managementList}>
          <ul className={`${styles.boardBox} ${styles.photoGraphy}`}>
            <h1 className={styles.boardTitle}>ArtWork</h1>
                {ArtCount.map((Artboard, index) => (
                    <li key={index}> <b>{Artboard.boardname} </b><span>게시글 <font color="yellow">{Artboard.boardLength}</font> 개</span> {Artboard.content}<Link to='/PostingEditor/'>Edit</Link><Link to='/PostingBoard/'>등록</Link></li>  
                ))}
          </ul>
          <ul className={`${styles.boardBox} ${styles.photoGraphy}`}>
            <h1 className={styles.boardTitle}>Photography</h1>
                {boardCount.map((photoboard, index) => (
                    <li key={index}> <b>{photoboard.boardname} </b><span>게시글 <font color="yellow">{photoboard.boardLength}</font> 개</span> {photoboard.content}<Link to='/PostingEditor/'>Edit</Link><Link to='/PostingBoard/'>등록</Link></li>  
                ))}
          </ul>
          <ul className={`${styles.boardBox} ${styles.Snapshot}`}>
            <h1 className={styles.boardTitle}>Snapshot</h1>
                 <li><b>Snapshot List</b><span>게시글 <font color="yellow">{totalSnaps}</font> 개</span><Link to='/SnapbannerEditor/'>Edit</Link><Link to='/SnapshotUpload/'>등록</Link></li>  
          </ul>
          <ul className={`${styles.boardBox} ${styles.photoGraphy}`}>
            <h1 className={styles.boardTitle}>Visual Design</h1>
                {VDCount.map((vdboard, index) => (
                    <li key={index}> <b>{vdboard.boardname} </b><span>게시글 <font color="yellow">{vdboard.boardLength}</font> 개</span> {vdboard.content}<Link to='/PostingEditor/'>Edit</Link><Link to='/PostingBoard/'>등록</Link></li>  
                ))}
          </ul>
          <ul className={`${styles.boardBox} ${styles.Snapshot}`}>
            <h1 className={styles.boardTitle}>RozeMary</h1>
                 <li><b>Mainbanner List</b><span>배너 <font color="yellow">{totalRm}</font> 개</span><Link to='/RozemaryEditor/'>Edit</Link><Link to='/RozemaryUpload/'>등록</Link></li>  
          </ul>
          <ul className={`${styles.boardBox} ${styles.Snapshot}`}>
            <h1 className={styles.boardTitle}>Community</h1>
                 <li><b>Community List</b><span>게시글 <font color="yellow">0</font> 개</span><Link to=''>Edit</Link><Link to=''>등록</Link></li>  
          </ul>
        </div> 
      ) : (
        <div>
          <p>권한이 없습니다!</p>
        </div>
      )}
    </div>
  );
}

export default Management;
