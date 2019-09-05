import React, {Component} from 'react';

import Breadcrumb from "../common/breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Actions} from "../../actions";
import {ActionTypes} from "../../constants/ActionTypes";
import sha256 from 'sha256';
import "./login.css"

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
                if(response.payload.data !== null && response.payload.data !== undefined) {
                    // dispatch(Actions.fetchShippingAddress(response.payload.data.memberAddresses.filter(item=>item.mainAddress==='y')));
                    return dispatch(Actions.getCart());
                } else {
                    response.type = ActionTypes.GET_USER_FAIL;
                    return Promise.reject(response);
                }
            } else {
                return Promise.reject(response);
            }
        })
        .then(response => {
            if(response.type === ActionTypes.GET_CART_SUCCESS){

                return dispatch(Actions.calcCartPrice());
            }
        })
        .catch(error => {
            console.log("오류!", error);
            return error;
        });
};

class Login extends Component {
    state = {
        message: ''
    }

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

            this.props.login(email, password)
                .then(response => {
                    console.log("response", response);
                    if(response.type === ActionTypes.CALC_CART_PRICE) {
                        this.props.history.push('/');
                    } else if(response.type === ActionTypes.LOGIN_FAIL) {
                        const message = "아이디 또는 비밀번호가 틀렸습니다.";
                        return Promise.reject(message);
                    } else if(response.type === ActionTypes.GET_USER_FAIL) {
                        const message = "메일 인증을 받지 않은 상태입니다. 메일 인증 과정을 완료 해 주세요";
                        return Promise.reject(message);
                    } else {
                        const message = "오류가 발생했습니다. 잠시 후 다시 시도해주세요";
                        return Promise.reject(message);
                    }
                })
                .catch(message => {
                    this.setState({
                        ...this.state,
                        message: message
                    })
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
                                    <form className="theme-form mb-3" onSubmit={e => onSubmit(e)}>
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
                                        <div className="errorMessage">
                                            <span>{this.state.message}</span>
                                        </div>
                                    </form>
                                    <Link to="/forget-password">비밀번호를 잊어버리셨나요?</Link>
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