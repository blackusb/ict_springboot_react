import {Outlet, Link} from 'react-router-dom';
import styled from 'styled-components';
import './../css/menuStyle.css';
import Footer from './Footer.js';

function Layout(){
    //Link 모듈에 스타일 지정하기
    //npm install styled-coomponents
    //                 import한 변수명과 동일하게 씀
    const StyledLink = styled(Link)`
        text-decoration:none;

        &:link, &:visited, &:active{
            color:yellow;
        }

        &:hover{
            color:cyan;        
        }

    `;

    //로그아웃 처리할 함수
    function logoutFnt(){
        //세션스토리지의 값을 모두 제거.
        sessionStorage.clear();
        window.location.href = "/";
    }

    return (
        <div>
            <div className="Logo"><a href="/">한국 ICT</a></div>
            {/* 메뉴 */}
            <nav className="Menu">
                <ul>
                    <li><StyledLink to="/">홈페이지</StyledLink></li>

                    {sessionStorage.getItem("logStatus")!=="Y" && (<li><StyledLink to="/login">로그인</StyledLink></li>)}
                    {sessionStorage.getItem("logStatus")!=="Y" && (<li><StyledLink to="/joinsForm">회원가입</StyledLink></li>)}

                    {sessionStorage.getItem("logStatus")==="Y" && (<li><StyledLink onClick={logoutFnt}>로그아웃</StyledLink></li>)}
                    {sessionStorage.getItem("logStatus")==="Y" && (<li><StyledLink to="/joinsEdit">회원정보수정</StyledLink></li>)}

                    <li><StyledLink to="/boardList">게시판</StyledLink></li>
                    
                </ul>
            </nav>

            {/* 메뉴를 선택하면 표시할 곳 */}
            <Outlet></Outlet>

            <Footer/>
        </div>
    );
}

export default Layout;