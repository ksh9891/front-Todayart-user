import React from 'react';
import Logo from '../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <header className="header_area">
            <div className="main_menu">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <a className="navbar-brand logo_h" href="/"><img src={Logo} alt="" className="logo" /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul className="nav navbar-nav menu_nav ml-auto mr-auto">
                                <li className="nav-item submenu dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">장르</a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item"><a className="nav-link" href="/artwork">서양화</a></li>
                                        <li className="nav-item"><a className="nav-link" href="/artwork">동양화</a></li>
                                        <li className="nav-item"><a className="nav-link" href="/artwork">기타</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item submenu dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">테마</a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item"><a className="nav-link" href="">계절</a></li>
                                        <li className="nav-item"><a className="nav-link" href="">색상</a></li>
                                        <li className="nav-item"><a className="nav-link" href="">분위기</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item"><a className="nav-link" href="">지원</a></li>
                                <li className="nav-item"><a className="nav-link" href="">정보</a></li>
                            </ul>

                            <ul className="nav-shop">
                                <li className="nav-item"><button><i className="ti-search" /></button></li>
                                <li className="nav-item"><button><i className="ti-shopping-cart" /><span className="nav-shop__circle">3</span></button></li>
                            </ul>

                            <ul className="nav nav-user-info">
                                <li className="nav-item"><a className="nav-link" href="./login">로그인</a></li>
                                <li className="nav-item"><a className="nav-link" href="./register">회원가입</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
};

export default Header;