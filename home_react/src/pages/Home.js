import { useState } from 'react';
import axios from 'axios';
import i03 from '../img/03.jpeg';
import tiger1 from '../img/tiger1.jpg';
import tiger2 from '../img/tiger2.jpg';
import tiger3 from '../img/tiger3.jpg';
import tiger4 from '../img/tiger4.webp';
import tiger5 from '../img/tiger5.jpg';

function Home(){
    //데이터를 담을 변수
    const [message, setMessage]  = useState("");

    function reactSpringCall(){
        axios.get('http://127.0.0.1:9988/reactTest?msg=리액트에서 스프링부트로 보낸 값')
        .then(function(response){
            console.log(response);
            setMessage(response.data);
        })
        .catch(function(error){
            alert("에러 발생");
        });
    }

    return (
        <div className="container">
            <h1>홈페이지(Home.js)</h1>
            <img src={tiger1} style={{width:'200px', height:'160px'}}/>
            <img src={tiger2} style={{width:'200px', height:'160px'}}/>
            <img src={tiger3} style={{width:'200px', height:'160px'}}/>
            <img src={tiger4} style={{width:'200px', height:'160px'}}/>
            <img src={tiger5} style={{width:'200px', height:'160px'}}/>
            <div>
                <button onClick={reactSpringCall}>Click : 스프링부트에서 정보 받아오기</button>
            </div>
            <h1>springboot : {message}</h1>
        </div>
    );
}

export default Home;