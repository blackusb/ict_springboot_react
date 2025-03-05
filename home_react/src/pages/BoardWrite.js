//글등록폼
import axios from "axios";
import { useState } from "react";


function BoardWrite(){
    //데이터 보관할 변수
    let [subject, setSubject] = useState('');
    let [content, setContent] = useState('');

    //제목을 subject에 셋팅하는 함수
    function changeSubject(event){
        setSubject(event.target.value);
        //console.log(subject);
    }
    //내용을 content에 셋팅하는 함수
    function changeContent(event){
        setContent(event.target.value);
        //console.log(content);
    }
    //제목, 글내용을 Springboot로 보내 DB에 insert
    function boardSubmit(){
        //제목 검사
        if(subject===''){
            alert("제목 입력해라");
            return false;
        }

        //서버로 보낼 데이터
        let paramsData = {
            subject : subject,
            content : content,
            joins : {id : sessionStorage.getItem("logId")}
        }

        axios.post("http://localhost:9988/board/boardWriteOk", paramsData)
        .then(function(response){
            if(response.data === "ok"){ //등록성공
                window.location.href = "/boardList";
            }else if(response.data === "cancel"){ //등록실패
                alert("게시글이 등록되지 않았습니다.");
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
    
    return(
        <div className="container" style={{width:'50%'}}>
            <h1>게시판 글쓰기 폼</h1>
            <div className="mb-3 mt-3">
                <label for="subject" className="form-label">제목:</label>
                <input type="text" className="form-control" id="subject" placeholder="글 제목을 입력하세요." name="subject" 
                        value={subject} onChange={changeSubject}/>
            </div>
            <div className="mb-3 mt-3">
                <label for="content" className="form-label">내용:</label>
                <textarea className="form-control" id="content" placeholder="글 내용을 입력하세요." name="content" style={{height:'400px'}}
                    value={content} onChange={changeContent}
                ></textarea>
            </div>
            <div className="mb-3 mt-3">
                <button type="button" className="btn btn-warning" onClick={boardSubmit}>글 등록</button>
            </div>
        </div>
    );
}

export default BoardWrite;