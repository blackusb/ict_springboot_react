import {useState, useEffect, useRef} from "react";
import '../css/JoinsFormStyle.css';
import axios from "axios";

function JoinsEdit(){
    //회원정보를 보관할 변수
    let [joinsForm, setJoinsForm] = useState({}); //{userid:'333', username:'4444', userpwd:'asdf'....}

    //useEffect() : 페이지가 로딩되면 자동으로 한번 호출하도록 한다.
    const mounted = useRef(false);
    useEffect(()=>{
        if(!mounted.current){
            mounted.current = true;
        }else{
            getJoinsEdit();
        }
    },[]);

    function setFormData(event){
        let name = event.target.name;   //userid, userpwd
        let value = event.target.value; //사용자가 입력하는 값

        setJoinsForm(previous=>{    //값이 여러개이므로 일부를 그대로 보존해야함
            return {...previous, [name]:value}
        });
        console.log(joinsForm);
    }
    //submit버튼을 클릭시 호출
    function formCheck(event){
        //기본이벤트 제거
        event.preventDefault();

        //필수입력항목 유효성 검사
        if(joinsForm.userid==""){
            alert("아이디를 입력하세요");
            return false;
        }
        if(joinsForm.userpwd==""){
            alert("비밀번호를 입력하세요");
            return false;
        }
        if(joinsForm.username==""){
            alert("이름을 입력하세요");
            return false;
        }
        if(joinsForm.tel==""){
            alert("연락처를 입력하세요");
            return false;
        }
        if(joinsForm.email==""){
            alert("이메일을 입력하세요");
            return false;
        }

        //비동기식으로 springboot 회원정보 수정 요청(axios)
        axios.post("http://localhost:9988/joins/formOk",
            {
                userid : joinsForm.userid,
                userpwd : joinsForm.userpwd,
                username : joinsForm.username,
                tel : joinsForm.tel,
                email : joinsForm.email
            }
        ).then(function(response){
            console.log(response.data);
            if(response.data=='ok'){ //회원등록
                window.location.href = '/login'; //리액트에서는 window부터 적어주기
            }else{
                alert("회원등록 실패!");
            }
        }).catch(function(error){
            console.log(error);
        })
    }

    function getJoinsEdit(){
        //현재 로그인한 회원정보 가져오기
        axios.post("http://localhost:9988/joins/joinsEdit", {userid : sessionStorage.getItem("logUserid")})
        .then(function(response){
            console.log(response.data);
            setJoinsForm({
                userid : response.data.userid,
                username : response.data.username,
                tel : response.data.tel,
                email : response.data.email
            });
        }).catch(function(error){
            console.log(error);
        })
    }

    return(
        <div className="Left-form">
            <form onSubmit={formCheck}>
                <h2 style={{textAlign:'center'}}>회원정보수정</h2>
                <label>아이디</label><br/>
                <input type="text" name="userid" 
                    value={joinsForm.userid} 
                    placeholder="아이디를 입력하세요"
                    onChange={setFormData}
                    readOnly
                /><p/>
                <label>비밀번호</label><br/>
                <input type="password" name="userpwd"
                    value={joinsForm.userpwd}
                    placeholder="비밀번호를 입력하세요"
                    onChange={setFormData}
                /><p/>
                <label>이름</label><br/>
                <input type="text" name="username"
                    value={joinsForm.username}
                    placeholder="이름을 입력하세요"
                    onChange={setFormData}
                    readOnly
                /><p/>
                <label>연락처</label><br/>
                <input type="text" name="tel"
                    value={joinsForm.tel}
                    placeholder="연락처를 입력하세요"
                    onChange={setFormData}
                /><p/>
                <label>이메일</label><br/>
                <input type="text" name="email"
                    value={joinsForm.email}
                    placeholder="이메일을 입력하세요"
                    onChange={setFormData}
                /><p/>
                <input type="submit" value="회원정보수정" className="btn btn-success"/><p/>
            </form>
        </div>
    );
}

export default JoinsEdit;