import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function BoardView(){
    //BoardList -> App -> BoardView ----> id
    //request하기 - 현재글의 글 번호
    //라우터에 있는 id를 가져와서 담는다.
    let {id} = useParams();

    //한번 자동 실행됨.
    const mounted = useRef(false);
    useEffect(()=>{
        if(!mounted.current){
            mounted.current = true;
        }else{
            getBoardChoice();
        }
    },[]);

    //레코드 정보 담을 변수
    let [record, setRecord] = useState({});

    //해당 레코드 가져오기
    function getBoardChoice(){
        //http://localhost:9988/board/boardView/?id=21
        //http://localhost:9988/board/boardView/21
        axios.get(`http://localhost:9988/board/boardView/${id}`)
        .then(function(response){
            console.log(response.data);
            setRecord({
                id: response.data.id,
                userid: response.data.joins.userid,
                username: response.data.joins.username,
                hit: response.data.hit,
                writedate: response.data.writedate,
                subject: response.data.subject,
                content: response.data.content
            });
        }).catch(function(error){
            console.log(error);
        });
    }

    //현재 글 삭제
    function boardDel(){
        if(window.confirm("글을 삭제 하시겠습니까?")){
            axios.get(`http://localhost:9988/board/boardDel/${record.id}`)
            .then(function(response){
                console.log(response.data);
                //글이 삭제되면 목록으로 이동
                if(response.data == 0)
                    window.location.href = "/boardList";
            }).catch(function(error){
                console.log(error);
            });
        }
    }

    return(
        <div className="container">
            <table className="table">
                <tbody>
                    <tr>
                        <td>번호</td>
                        <td>{record.id}</td>
                    </tr>
                    <tr>
                        <td>작성자</td>
                        <td>{record.username}</td>
                    </tr>
                    <tr>
                        <td>조회수</td>
                        <td>{record.hit}</td>
                    </tr>
                    <tr>
                        <td>등록일</td>
                        <td>{record.writedate}</td>
                    </tr>   
                    <tr>
                        <td>제목</td>
                        <td>{record.subject}</td>
                    </tr>
                    <tr>
                        <td>글내용</td>
                        <td>{record.content}</td>
                    </tr>
                </tbody>
            </table>
            {/* 본인이 작성한 글 일 때 수정, 삭제 */}
            {
                sessionStorage.getItem("logUserid")==record.userid 
                && (<div>
                        수정
                        <a onClick={boardDel}>삭제</a>
                    </div>)
            }
        </div>
    )
}
export default BoardView;