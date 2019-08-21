import React from 'react';
import {Actions} from "../actions";
import {ActionTypes} from "../constants";
import {withRouter} from "react-router";
import {connect} from "react-redux";

const loginAsync = (email, password) => (dispatch) => {
    return dispatch(Actions.login(email, password))
        .then(response => {
            if (response.type === ActionTypes.LOGIN_SUCCESS) {
                return dispatch(Actions.getMemberMe())
            } else {
                return Promise.reject(response);
            }
        })
        .then(response => {
            if (response.type === ActionTypes.GET_USER_SUCCESS) {
                return dispatch(Actions.getCart());
            } else {
                return Promise.reject(response);
            }
        });
};

const Login = ({history, login}) => {
    let emailInput, passwordInput;

    const onSubmit = (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        console.log(email);
        console.log(password);

        login(email, password)
            .then(response => {
                history.push("/");
            })
            .catch(error => {
                console.log('error >> ', error);
            });

    };

    const onRegister = () => {
        history.push("/register")
    };

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
                                    <button type="button" className="button button-account" onClick={onRegister}>회원가입</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner">
                                <h3>로그인</h3>
                                <form className="row login_form" onSubmit={e => onSubmit(e)} >
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            ref={element => emailInput = element}
                                            placeholder="아이디(이메일)" />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            ref={element => passwordInput = element}
                                            placeholder="비밀번호" />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="creat_account">
                                            <input type="checkbox" id="f-option2" name="selector" />
                                                <label htmlFor="f-option2">로그인 유지</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="submit" className="button button-login w-100">로그인</button>
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

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => dispatch(loginAsync(username, password))
});

export default withRouter(connect(null, mapDispatchToProps)(Login));