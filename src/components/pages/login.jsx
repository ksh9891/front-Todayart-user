import React, {Component} from 'react';

import Breadcrumb from "../common/breadcrumb";
import {Link} from "react-router-dom";

class Login extends Component {
    render (){
        return (
            <div>
                <Breadcrumb title={'로그인'}/>

                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>로그인</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="example@example.com" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">비밀번호</label>
                                            <input type="password" className="form-control" id="review" placeholder="비밀번호" required />
                                        </div>
                                        <button className="btn btn-solid">로그인</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>첫 방문이신가요?</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">계정을 생성 해 주세요</h6>
                                    <p>회원가입을 하고 홈페이지를 이용 해 보세요.
                                        회원가입은 아주 쉽고 간편합니다.<br/>
                                        아래 가입 버튼을 통해 등록을 시작 해 보세요!</p>
                                    <br/>
                                    <Link to="/register" className="btn btn-solid">계정생성</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Login