import {useState} from 'react';
import './../css/LoginStyle.css';

function Login(){
    //폼의 아이디와 비밀번호를 보관할 변수
    //                  함수
    let [loginForm, setLoginForm] = useState({});
    //아이디 에러메세지
    let [idErrorMessage, setIdErrorMessage] = useState('');
    //비밀번호 에러메세지
    let [pwdErrorMessage, setPwdErrorMessage] = useState('');

    function setFormData(event){
        let name = event.target.name;   //userid, userpwd
        let value = event.target.value; //사용자가 입력하는 값

        if(name=='userid') setIdErrorMessage('');
        if(name=='userpwd') setPwdErrorMessage('');

        setLoginForm(previous=>{    //값이 여러개이므로 일부를 그대로 보존해야함
            return {...previous, [name]:value}
        });
        console.log(loginForm);
    }

    //form의 값 유효성검사
    function formCheck(event){
        event.preventDefault(); //기본이벤트 제거(submit이벤트 발생시 페이지 이동하는 것 제거)

        //아이디 존재유무 확인
        if(loginForm.userid==null || loginForm.userid==''){
            setIdErrorMessage('아이디를 입력 후 로그인하세요');
            return false;
        }
        //아이디: 5~10글자 사이. 첫번째 문자는 영대소문자. 영대소문자, 숫자, 특수문자는 _, $만 가능
        let reg = /^[A-Za-z]{1}[A-Za-z0-9_$]{4,9}$/;
        if(!reg.test(loginForm.userid)){ //true:조건에 맞다, false:조건에 안맞다
            setIdErrorMessage("아이디 첫번째 글자는 영어대소문자. 나머지는 영대소문자, 숫자, 특수문자는 _,$만 허용. 글자길이는 5~10글자.");
            return false;
        }
        //비밀번호 존재유무 확인
        if(loginForm.userpwd==null || loginForm.userpwd==''){
            setPwdErrorMessage("비밀번호를 입력 후 로그인하세요");
            return false;
        } 
        //비동기식으로 백엔드
    }

    return (
        <div className="Left-form">
            <form onSubmit={formCheck}> {/* submit버튼을 누르면 submit버튼에서 submit이벤트가 생기는 것이 아니라, form에서 submit이벤트 발생함 */}
                <h2 style={{textAlign:'center'}}>로그인</h2>
                <label>아이디</label><br/>
                <input type="text" name="userid" value={loginForm.userid} placeholder="아이디를 입력하세요"
                    onChange={setFormData}
                /><br/>
                <div className="Text-red">{idErrorMessage}</div>
                <label>비밀번호</label><br/>
                <input type="password" name="userpwd" value={loginForm.userpwd} placeholder="비밀번호를 입력하세요"
                    onChange={setFormData}
                /><br/>
                <div className="Text-red">{pwdErrorMessage}</div>
                <input type="submit" value="Login"/>    
            </form>
        </div>
    );
}

export default Login;