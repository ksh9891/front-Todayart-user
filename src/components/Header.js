import React from 'react';
import Logo from '../images/logo.png';
import './Header.css';
import  {Icons} from './icons';
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
                            <Icons.SearchIcon/>
                            <Icons.CartIcon/>
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