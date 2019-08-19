import React, {useEffect, useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Actions} from "../actions";
import {isAuthenticated} from "../utils";
import "./HeaderNavList.css";

const HeaderNavList = ({auth, logout}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const { userDetails } = auth;
    let nickname;

    // 로그인, 로그아웃 시 보이는 메뉴 다르게 하기 해야 함....
    useEffect(() => {
        setIsAuth(isAuthenticated(auth));
    });

    useEffect(() => {
        nickname = isAuth ? userDetails.nickname : '11';
    }, [isAuth]);

    console.log("isAuth = " + isAuth);
    return (
        <div>
            <ul className="nav nav-user-info">
                {isAuth ? '' : <li className="nav-item"><Link className="nav-link" to="/login">로그인</Link></li>}
                {isAuth ? '' : <li className="nav-item"><Link className="nav-link" to="/register">회원가입</Link></li>}
                {isAuth ?
                    <li className="nav-item submenu dropdown">
                        <a href="#"
                           className="nav-link dropdown-toggle"
                           data-toggle="dropdown"
                           role="button"
                           aria-haspopup="true"
                           aria-expanded="false">{nickname}</a>
                        <ul className="dropdown-menu">
                            <li className="nav-item"><a className="nav-link" href="/account">마이페이지</a></li>
                            <li className="nav-item"><a className="nav-link nav-dropdown-button" onClick={logout()}>로그아웃</a></li>
                        </ul>
                    </li>
                    : ''
                }
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(Actions.logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderNavList));