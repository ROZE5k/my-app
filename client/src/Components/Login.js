import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';
import { isMobile } from 'react-device-detect';

function Login({hover}) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [email, setEmail] = useState('');
    const [tabClick, setTabClick] = useState(1);
    const [loggedIn, setLoggedIn] = useState(false); // 추가: 로그인 상태
    const [userId, setUserId] = useState(null);
    const [admin, setAdmin] = useState(false);


    useEffect(() => {
      // 서버로 세션 데이터 요청
      fetch('/api/getSessionData', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          const userId = data.userId;
          setUserId(userId); // userId 업데이트
          setLoggedIn(!!userId); // 추가: 로그인 상태 업데이트
          console.log(userId);
          if (userId==='zero5k'){
            setAdmin(true);
          }else{
            setAdmin(false);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch session data:', error);
        });
    }, []);

  
    
    const handleIdChange = (e) => {
      setId(e.target.value);
    };
    
    const handlePwChange = (e) => {
      setPw(e.target.value);
    };

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
      
    
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!id || !pw) {
            alert('로그인 정보를 입력하세요');
            return;
          }
        
    
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            pw: pw
          }),
        });
    
        const result = await response.text();
    
        if (result === '로그인 성공') {
          alert('로그인 성공');
          // Store the user's ID in the session
             sessionStorage.setItem('data', id);
            window.location.href = '/Main';

        } else {
          alert('ID 또는 PW가 올바르지 않습니다.');
        }
      };

      const onTabClick = (tabNum)=>{
        setTabClick(tabNum);
      }

      const checkUserId = async (e) => {
        e.preventDefault();
        if (!id) {
            alert('ID를 입력하세요');
            return;
          }
        const response = await fetch('/api/checkUserId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id
          }),
        });
      
        const result = await response.text();
      
        if (result === '사용 가능한 ID입니다.') {
          alert('사용 가능한 ID입니다.');
        } else {
          alert('이미 사용중인 ID입니다!');
        }
      };

      const handleJoin = async (e) => {
        e.preventDefault();

        if (!id || !pw || !email) {
            alert('가입 정보를 입력하세요');
            return;
          }        
      
        const response = await fetch('/api/checkUserId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id
          }),
          
        });
      
        const result = await response.text();
      
        if (result === '이미 사용중인 ID입니다!') {
          alert('다른 아이디로 설정해주세요!');
        } else {
          const response = await fetch('/api/join', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              pw: pw,
              email: email
            }),
          });
      
          const result = await response.text();
      
          if (result === '가입 완료') {
            alert('가입이 완료되었습니다!');
            sessionStorage.setItem('data', id);
            setTabClick(1);
          } else {
            alert('에러가 발생했습니다.');
          }
        }
      };

        function handleLogout() {
          // 세션 데이터 초기화
          sessionStorage.removeItem('data');

          fetch('/api/logout', {
            method: 'POST',
            
          })
            .then((response) => response.text())
            .then((data) => {
              setLoggedIn(false);
              setAdmin(false);
            })
            .catch((error) => {
              console.error('Failed to logout:', error);
            });
        }

    return (
      <div className={`${styles.Login} ${hover && styles.active} ${isMobile && styles.mobileLogin}`}>
        <div className={`${styles.LoginInputs} ${isMobile && styles.mobileInputs}`}>
          <h1><p onClick={()=>onTabClick(1)}>Login</p><p onClick={()=>onTabClick(2)}>Join</p>
          <div className={`${styles.left} ${tabClick===2 && styles.right}`}></div>
          </h1>
          {tabClick===1? (
          <div>
          {loggedIn ? (
              <div>
                  <div className={styles.onLogin}>
                    <p className={styles.userId}>{userId}<span>님 환영합니다.</span></p>
                    <br/>
                    <span>함께 아트를 즐기고 나누며, 창조적인 여정을 함께하길 바랍니다.</span>
                  </div>
                <div className={styles.loginButtons}>
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
                 </div>
            ) : (
              <div>
                <div className={styles.rozesUsers}>
                  <p>ID: </p><input name="id" value={id} placeholder="아이디를 입력하세요." onChange={handleIdChange}/>
                </div> 
                <div className={styles.rozesUsers}>
                  <p>PW: </p><input name="pw" type="password" placeholder="비밀번호를 입력하세요." value={pw} onChange={handlePwChange}/>
                </div>
                <div className={styles.loginButtons}>
                  <button onClick={handleLogin} className={styles.loginNow}>로그인</button>
                </div>
              </div>
            )} 
            {admin ? (
                  <div className={styles.managementBox}>
                    <p>관리자님 안녕하세요~</p>
                    {isMobile?'':
                       <div className={styles.loginButtons}>
                         <Link to="/Management/">관리자 페이지 바로가기</Link>
                       </div>}
                  </div>
                ) :''}                      
          </div>
          ): (<div>
          <div className={styles.rozesUsers}>
            <p>ID: </p><input name="id" value={id} placeholder="아이디를 입력하세요." onChange={handleIdChange}/>
          </div>
          <div className={styles.loginButtons}>
            <button onClick={checkUserId}>아이디 중복확인</button>
          </div>
          <div className={styles.rozesUsers}>
            <p>PW: </p><input name="pw" type="password" placeholder="비밀번호를 입력하세요." value={pw} onChange={handlePwChange}/>
          </div>
          <div className={styles.rozesUsers}>
            <p>Email: </p><input name="email" placeholder="이메일을 입력하세요." value={email} onChange={handleEmailChange}/>
          </div>
          <div className={styles.joinButton}>
            <button onClick={handleJoin}>가입하기</button>
          </div>
          </div>
          )}
        </div>
      </div>
    );
  }
  

export default Login;