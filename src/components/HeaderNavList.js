import React, {useEffect, useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Actions} from "../actions";
import {isAuthenticated} from "../utils";
import "./HeaderNavList.css";

const HeaderNavList = ({auth, logout}) => {
    const { userDetails, isLogin } = auth;
    let nickname;

    if(isAuthenticated(auth)) {
        nickname = isLogin ? userDetails.nickname : '';
    }

    return (
        <ul className="nav nav-user-info">
            {isAuthenticated(auth) ? '' : <li className="nav-item"><Link className="nav-link" to="/login">로그인</Link></li>}
            {isAuthenticated(auth) ? '' : <li className="nav-item"><Link className="nav-link" to="/register">회원가입</Link></li>}
            {isAuthenticated(auth) ?
                <li className="nav-item submenu dropdown">
                    <a href="#"
                       className="nav-link dropdown-toggle"
                       data-toggle="dropdown"
                       role="button"
                       aria-haspopup="true"
                       aria-expanded="false">{nickname}</a>
                    <ul className="dropdown-menu">
                        <li className="nav-item"><Link className="nav-link" to="/account">마이페이지</Link></li>
                        <li className="nav-item"><a className="nav-link nav-dropdown-button" onClick={logout}>로그아웃</a></li>
                    </ul>
                </li> : ''
            }
        </ul>
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(Actions.logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderNavList));