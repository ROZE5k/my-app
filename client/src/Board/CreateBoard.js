import React from "react";

function CreateBoard({onChange, onCreate, name, subject, content, password}){
    return(
    <>
        <div><p>이름: </p><input name="name" placeholder="이름을 입력하세요" onChange={onChange} value={name}/>
        <p>제목: </p><input name="subject" placeholder="제목을 입력하세요" onChange={onChange} value={subject}/>
        <p>비밀번호: </p><input type="password" name="password" placeholder="비밀번호를 입력해주세요" onChange={onChange} value={password}/>
        </div>
        <div><p>내용: </p><textarea name="content" placeholder="내용을 입력하세요" onChange={onChange} value={content}/></div>
        <div><button onClick={onCreate}>등록하기</button></div>
    </>
    );
};

export default CreateBoard;