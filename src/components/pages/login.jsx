import React, {Component} from 'react';

import Breadcrumb from "../common/breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Actions} from "../../actions";
import {ActionTypes} from "../../constants/ActionTypes";
import sha256 from 'sha256';

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

class Login extends Component {
    constructor(props) {
        super(props);

        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    render (){
        const onSubmit = (e) => {
            e.preventDefault();

            const email = this.emailInput.current.value.trim();
            const password = sha256(this.passwordInput.current.value.trim());

            console.log(email);
            console.log(password);

            this.props.login(email, password)
                .then(response => {
                    this.props.history.push('/');
                })
                .catch(error => {
                    console.log('error >> ', error);
                });

        };

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
                                    <form className="theme-form" onSubmit={e => onSubmit(e)}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                placeholder="example@example.com"
                                                ref={this.emailInput}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">비밀번호</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="review"
                                                placeholder="비밀번호"
                                                ref={this.passwordInput}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-solid">로그인</button>
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

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => dispatch(loginAsync(username, password))
});

// eslint-disable-next-line no-undef
export default withRouter(connect(null, mapDispatchToProps)(Login));