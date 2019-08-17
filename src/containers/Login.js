import React from 'react';
import { ActionTypes } from '../constants';
import { Actions } from "../actions";

const Login = () => {
    return (
        <div>
            <section className="login_box_area section-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login_box_img">
                                <div className="hover">
                                    <h4>사이트 방문이 처음이신가요?</h4>
                                    <p>지금 바로 아래 회원가입 버튼을 통해 가입해보세요!</p>
                                    <a className="button button-account" href="./register">회원가입</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner">
                                <h3>로그인</h3>
                                <form className="row login_form" action="#/" id="contactForm" >
                                    <div className="col-md-12 form-group">
                                        <input type="email" className="form-control" id="email" name="email" placeholder="아이디(이메일)" />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="password" className="form-control" id="password" name="password" placeholder="비밀번호" />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="creat_account">
                                            <input type="checkbox" id="f-option2" name="selector" />
                                                <label for="f-option2">로그인 유지</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="button button-login w-100">로그인</button>
                                        <a href="#">비밀번호 찾기</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Login;