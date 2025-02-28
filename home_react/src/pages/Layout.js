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


    return (
        <div>
            <div className="Logo"><a href="/">한국 ICT</a></div>
            {/* 메뉴 */}
            <nav className="Menu">
                <ul>
                    <li><StyledLink to="/">홈페이지</StyledLink></li>

                    <li><StyledLink to="/login">로그인</StyledLink></li>
                    <li><StyledLink to="/joinsForm">회원가입</StyledLink></li>
                    
                </ul>
            </nav>

            {/* 메뉴를 선택하면 표시할 곳 */}
            <Outlet></Outlet>

            <Footer/>
        </div>
    );
}

export default Layout;