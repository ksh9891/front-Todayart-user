import React from 'react';
import Logo from '../images/logo.png';
import './Header.css';
import  {Icons} from './icons/index';
import HeaderNavList from "./HeaderNavList";
import {Link} from "react-router-dom";



const Header = () => {
    return (
        <header className="header_area">
            <div className="main_menu">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <Link className="navbar-brand logo_h" to="/"><img src={Logo} alt="" className="logo" /></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul className="nav navbar-nav menu_nav mr-auto">
                                <li className="nav-item submenu dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">작품보기</a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item"><a className="nav-link" href="/artwork">전체작품</a></li>
                                        <li className="nav-item"><a className="nav-link" href={`/category/${1}`}>서양화</a></li>
                                        <li className="nav-item"><a className="nav-link" href={`/category/${2}`}>동양화</a></li>
                                        <li className="nav-item"><a className="nav-link" href={`/category/${3}`}>기타</a></li>
                                    </ul>
                                </li>
                               
                                <li className="nav-item"><a className="nav-link" href="">지원</a></li>
                                <li className="nav-item"><a className="nav-link" href="/article">게시판</a></li>
                            </ul>

                            <ul className="nav-shop">
                            <Icons.SearchIcon/>
                            <Icons.CartIcon/>
                            </ul>
                            <ul className="nav-shop">
                                <li className="nav-item">
                                    <button><i className="ti-search" /></button>
                                </li>
                                <li className="nav-item">
                                    <button>
                                        <i className="ti-shopping-cart" /><span className="nav-shop__circle">3</span>
                                    </button>
                                </li>
                            </ul>
                            <HeaderNavList />

                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
};

export default Header;