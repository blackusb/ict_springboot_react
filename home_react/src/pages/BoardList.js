import axios from "axios";
import { useEffect, useRef, useState } from "react";

function BoardList(){
    //백엔드에서 가져온 목록 보관할 변수
    let [boardData, setBoardDate] = useState([]); //[{id:3, subject:'abc'...},{}]

    //getBoardList()를 자동으로 한번 호출
    const mounted = useRef(false);
        useEffect(()=>{
            if(!mounted.current){
                mounted.current = true;
            }else{
                getBoardList();
            }
    },[]);

    function getBoardList(){
        let url = "http://localhost:9988/board/boardList";
        
        axios.get(url)
        .then(function(response){
            console.log(response.data);
            
            //레코드 목록을 boardData변수에 저장
            response.data.map(function(record){
                setBoardDate(prev=>{
                    return [...prev, {id:record.id, 
                                    subject:record.subject, 
                                    username:record.joins.username, 
                                    hit:record.hit, 
                                    writedate:record.writedate}]
                });
            });
            //여기에 위 데이터 콘솔에 찍으면 안나옴. 
            //useEffect로 처음 한번 호출시 실행되지만, 위에 map은 계속 반복. 콘솔은 반복 x.
        }).catch(function(error){
            console.log(error);
        });
    }

    return(
        <div className="container">
            <h1>게시판 목록</h1>
            <div className="row" style={{borderBottom:'solid 1px #ddd'}}>
                <div className="col-sm-1 p-2">번호</div>
                <div className="col-sm-6 p-2">제목</div>
                <div className="col-sm-1 p-2">작성자</div>
                <div className="col-sm-1 p-2">조회수</div>
                <div className="col-sm-3 p-2">등록일</div>
            </div>

            {
                boardData.map(function(record){
                    return (
                        <div className="row" style={{borderBottom:'solid 1px #ddd'}}>
                            <div className="col-sm-1 p-2">{record.id}</div>
                            <div className="col-sm-6 p-2">{record.subject}</div>
                            <div className="col-sm-1 p-2">{record.username}</div>
                            <div className="col-sm-1 p-2">{record.hit}</div>
                            <div className="col-sm-3 p-2">{record.writedate}</div>
                        </div>
                    )
                })
            }

            {sessionStorage.getItem("logStatus")==="Y" && (<p><a href="/boardWrite">글쓰기</a></p>)}
        </div>
    );
}

export default BoardList;