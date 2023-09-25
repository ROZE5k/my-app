import React,{useState, useEffect, useRef} from "react";
import styles from './userBoard.module.css';
import CreateBoard from './CreateBoard';
import moment from 'moment';
import  {Link} from 'react-router-dom';
import { isMobile } from 'react-device-detect';

function UserBoard(){
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const maxPageNumbers = 5;
    const [users, setUsers]=useState([]);
    
    useEffect(() => {
        fetch('/api/boards')
          .then(response => response.json())
          .then(data => setUsers(data))
          .catch(error => console.log(error));
      }, []);
    
    const [inputs, setInputs]=useState({
        name:'',
        subject:'',
        content:'',
        password:'',
    });

    const {name, subject, content, password}=inputs;

    const onChange=(e)=>{
        const {name, value}=e.target;
        setInputs({
            ...inputs,
            [name]:value,
        })
    };

    const onCreate = () => {
      const date = moment.utc().format('YYYY-MM-DD HH:mm:ssZ');
    
      // 필수 입력 필드인지 확인
      if (!name || !subject || !content || !password) {
        alert('모든 내용을 입력해주세요.');
        return;
      }
    
      const user = {
        name,
        subject,
        content,
        password,
        date,
      };
    
      fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('서버 응답이 비어있습니다.');
          }
        })
        .then((data) => {
          setUsers([...users, data]);
          setInputs({
            name: '',
            subject: '',
            content: '',
            password: '',
          });
          window.location.reload(); // 페이지 새로고침
        })
        .catch((error) => console.log(error));
    };
  
  // 페이징 처리  
  // 현재 페이지의 사용자 목록 계산
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // 페이지 번호 클릭 시 처리 함수
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 이전 페이지로 이동
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const goToNextPage = () => {
    const totalPages = Math.ceil(users.length / usersPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(users.length / usersPerPage);

  // 표시할 페이지 번호 범위 계산
  const getPageNumbers = () => {
    const halfPageNumbers = Math.floor(maxPageNumbers / 2);
    const currentPageIndex = currentPage - 1;
    const totalPageNumbers = Math.min(maxPageNumbers, totalPages);

    let startPageIndex = currentPageIndex - halfPageNumbers;
    let endPageIndex = currentPageIndex + halfPageNumbers;

    if (startPageIndex < 0) {
      startPageIndex = 0;
      endPageIndex = totalPageNumbers - 1;
    } else if (endPageIndex >= totalPages) {
      startPageIndex = totalPages - totalPageNumbers;
      endPageIndex = totalPages - 1;
    }

    return Array.from({ length: totalPageNumbers }, (_, index) => index + startPageIndex + 1);
  };

    
    return(
    <div className={`${styles.boardMain} ${isMobile&&styles.mobileBoardMain}`}>
    <div className={styles.userBoard}>
        <h1>간편문의 게시판 <span>{isMobile?'':'|'} 작업 의뢰는 스냅 촬영만 받습니다.</span></h1>
        <ul className={styles.quickboardList}>
        <li>
          <ul>
            <li><b>번호</b></li>
            <li><b>제목</b></li>
            <li><b>작성자</b></li>
            <li><b>시간</b></li>
          </ul>
        </li>
        {currentUsers.map((user, index) => (
          <li key={index}>
            <ul>
              <li><p>{index + 1}</p></li>
              <li><Link to={`/BoardContent/${user.idx}`}><p>{user.subject}</p></Link></li>
              <li><p>{user.name}</p></li>
              <li><p>{user.date}</p></li>
            </ul>
          </li>
        ))}
      </ul>
      {/* 페이징 */}
      <ul className={styles.pagination}>
        {currentPage > 1 && (
          <li onClick={goToPreviousPage} className={styles.pagebtn}>
            <span>&lt;</span>
          </li>
        )}
        {getPageNumbers().map((pageNumber) => (
          <li
            key={pageNumber}
            className={pageNumber === currentPage ? styles.activePage : ''}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
        {currentPage < totalPages && (
          <li onClick={goToNextPage} className={styles.pagebtn}>
            <span>&gt;</span>
          </li>
        )}
        </ul>
    </div>
        <div className={`${styles.writeBoard} ${isMobile&&styles.mobileWriteBoard}`}>
            <CreateBoard
                onChange={onChange}
                onCreate={onCreate}
                name={name}
                subject={subject}
                content={content}
                password={password}
            />
        </div>
   </div>
    );
}

export default UserBoard;