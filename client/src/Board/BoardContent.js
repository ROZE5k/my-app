import React, { useEffect, useState } from 'react';
import styles from './boardContent.module.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import moment from 'moment';


function BoardContent() {
  const { idx} = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [editOpen, setEditopen]=useState(false);
  const [contentInput, setContentinput]=useState({
    content:"",
  })
  const [commentInput, setCommentinput]=useState({
    comment:"",
  })
  const [coboardnum, setcoboardNum]=useState("");

  const [boardComment, setboardComment]=useState([]);
  const [boardInput, setBoardInput]=useState("");
  const {username, comment, commentpw}=boardInput;

  const [checkpassword, setPassword]=useState("");
  const [checkcopassword, setcoPassword]=useState("");
  const [checked, setChecked]=useState(false);
  const [cochecked, setcoChecked]=useState(false);
  const [commentEditopen, setCommenteditopen]=useState(false);

  const onComment=(e)=>{
    const{name, value}=e.target;
    setBoardInput({
      ...boardInput,
      [name]:value
    })
  };

  const createComment = () => {

     // 필수 입력 필드인지 확인
     if (!username || !comment || !commentpw) {
      alert('모든 내용을 입력해주세요.');
      return;
    }
  
    const commentdate = moment.utc().format('YYYY-MM-DD HH:mm:ssZ');
    
      const Newcomment = {
        username,
        comment,
        commentdate,
        commentpw,
      };
    
      fetch(`/api/boards/${idx}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Newcomment),
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('서버 응답이 비어있습니다.');
        }
      })
        .then((data) => {
          setboardComment([...boardComment, data]) ;
          setBoardInput({
            usrename: '',
            comment: '',
            commentpw:'',
          });
        })
        .catch((error) => console.log(error));
    };
  
  const onInputpw=(e)=>{
    setPassword(e.target.value);
  }

  const onInputcopw=(e)=>{
    setcoPassword(e.target.value);
  }

  const onCheckpw = async () => {
    try {
      const response = await fetch(`/api/${idx}/checkPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: checkpassword,
        }),
      });
  
      const result = await response.json();
  
      if (result.valid) {
        setChecked(true);
      } else {
        setChecked(false);
        alert('비밀번호를 다시 확인해주세요');
      }
    } catch (error) {
      console.error('비밀번호 확인 실패:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const onCheckcopw = async () => {
    try {
      const response = await fetch(`/api/${coboardnum}/checkcoPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentpw: checkcopassword,
        }),
      });
      const result = await response.json();
      if (result.valid) {
        setcoChecked(true);
      } else {
        setcoChecked(false);
        alert('비밀번호를 다시 확인해주세요');
      }
    } catch (error) {
      console.error('비밀번호 확인 실패:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    // 게시글 정보 불러오기
    fetch(`/api/boards/${idx}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log(error));
  
    // 댓글 정보 불러오기
    fetch(`/api/boards/${idx}/comments`)
      .then(response => response.json())
      .then(data => setboardComment(data))
      .catch(error => console.log(error));
  }, [idx]);

 const handleDelete = () => {
  const confirmed = window.confirm("삭제하시겠습니까?");

  if (confirmed) {
    fetch(`/api/boards/${idx}`, {
      method: 'DELETE',
    })
      .then(() => {
        navigate('/UserBoard/');
      })
      .catch(error => console.log(error));
  }
};

const handleDeletecomment = () => {
  const confirmed = window.confirm("삭제하시겠습니까?");

  if (confirmed) {
    fetch(`/api/commentboards/${coboardnum}`, {
      method: 'DELETE',
    })
      .then(() => {
        window.location.reload();
      })
      .catch(error => console.log(error));
  }
};

  const onEditopen=()=>{
    setEditopen(true);
    setContentinput({content});
  }

  const onEditclose=()=>{
    setEditopen(false);
    setCommenteditopen(false);
    setChecked(false);
    setcoChecked(false);
  }

  const quitCheck=()=>{
    setEditopen(false);
    setCommenteditopen(false);
  }

  const onEdit = (e) => {
    const value=e.target.value;
    setContentinput(value);
  };

  const onEditcomment = (e) => {
    const value=e.target.value;
    setCommentinput(value);
  };
  
  const editComment = (commentnum) =>{
    setCommenteditopen(true);
    setcoboardNum(commentnum);
    const selectedComment = boardComment.find((comment) => comment.coboardnum === commentnum);

    if (selectedComment) {
      setCommentinput({ comment: selectedComment.comment });
    }
  }

  const onEditsubmit = () => {
    if (contentInput.content==={content}.content) {
      alert('수정된 내용이 없습니다!');
      return; // 수정된 내용이 없으면 중지
    }
    const date = moment.utc().format('YYYY-MM-DD HH:mm:ssZ');
  
    const Newcontent = {
      content:contentInput,
      date,
    };
  
    fetch(`/api/boards/${idx}`, {
      method: 'PUT', // 또는 'PATCH'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Newcontent),
    })
      .then(() => {
        window.location.reload();
      })
  };


  const onEditcommentsubmit = () => {

    const commentdate = moment.utc().format('YYYY-MM-DD HH:mm:ssZ');
  
    const Editcomment = {
      comment:commentInput,
      commentdate,
    };
  
    fetch(`/api/commentboards/${coboardnum}`, {
      method: 'PUT', // 또는 'PATCH'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Editcomment),
    })
      .then(() => {
        window.location.reload();
      })
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, subject, content, date} = user;

  return (
    <div className={`${styles.boardContent} ${isMobile&&styles.mobileBoardContent}`}>
      {editOpen?
       <div className={styles.editPopup}>
        {checked?
        <div className={styles.editInputs}>
          <div className={styles.popupInputs}>
            <h1 className={styles.editSubject}>{subject}</h1>
            <textarea className={styles.onEditcontent} name="content"  onChange={onEdit} value={contentInput.content} />
          </div>
          <div className={styles.popUpbuttons}>
          <button onClick={handleDelete}>삭제</button>
           <button onClick={onEditsubmit}>수정하기</button>
           <button onClick={onEditclose}>취소</button>
          </div>
        </div>:
        <div className={styles.passwordCheck}>
          <div>
            <input name="checkPassword" type="password" placeholder='비밀번호를 입력하세요'  onChange={onInputpw} value={checkpassword}/>
            <button onClick={onCheckpw}>비밀번호 확인하기</button>
            <button onClick={quitCheck}>취소</button>
          </div>
        </div>
        }
        </div>:null
      }
      {commentEditopen?
       <div className={styles.editPopup}>
        {cochecked?
        <div className={styles.editInputs}>
          <div className={styles.popupInputs}>
            <h1 className={styles.editSubject}>댓글을 수정하세요</h1>
            <textarea className={styles.onEditcontent} name="comment"  onChange={onEditcomment} value={commentInput.comment} />
          </div>
          <div className={styles.popUpbuttons}>
          <button onClick={handleDeletecomment}>삭제</button>
           <button onClick={onEditcommentsubmit}>수정하기</button>
           <button onClick={onEditclose}>취소</button>
          </div>
        </div>:
        <div className={styles.passwordCheck}>
          <div>
            <input name="checkcoPassword" type="password" placeholder='비밀번호를 입력하세요'  onChange={onInputcopw} value={checkcopassword}/>
            <button onClick={onCheckcopw}>비밀번호 확인하기</button>
            <button onClick={quitCheck}>취소</button>
          </div>
        </div>
        }
        </div>:null
      }
      <div className={styles.contentBox}>
        <h1>{subject}</h1>
        <p className={styles.contentDetail}>{content}</p>
        <div className={styles.info}>
          <p>작성자: {name}</p>
          <p>작성시간: {date}</p>
          <div className={styles.buttonGroup}>
            <button onClick={()=>onEditopen({content})}>수정</button>
            <Link to={`/UserBoard/`}><button>목록으로</button></Link>
          </div>
        </div>
      </div>
      <div className={styles.boardComment}>
        {boardComment.map((comment, index)=>
          <div key={index} className={styles.commentBox}>
            <p className={styles.commentDetail}>댓글: {comment.comment}</p>
            <div className={styles.commentinfo}>
               <p className={styles.writeInfo}>작성자: {comment.username}<span>작성시간: {comment.commentdate}</span></p>
               <button className={styles.editcomment} onClick={()=>editComment(comment.coboardnum)}>수정</button>
            </div>
          </div>
          )}
        <div className={styles.writeBox}>
          <div className={styles.inputsBox}>
            <div><p>이름: </p><input type="text" name="username" placeholder='이름을 입력해주세요' onChange={onComment} value={username||""}/></div>
            <div><p>비밀번호: </p><input type="password" name="commentpw" placeholder='비밀번호를 입력해주세요' onChange={onComment} value={commentpw||""}/></div>
            <div><p>댓글: </p><textarea type="text" name="comment" placeholder='댓를을 입력해주세요' onChange={onComment} value={comment||""}/></div>
          </div>
          <div className={styles.commentBtn}>
            <button onClick={createComment}>댓글 등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardContent;
