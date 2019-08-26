import React, { Component } from 'react';
import Breadcrumb from "../common/breadcrumb";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Actions} from "../../actions/index";
import {ActionTypes} from "../../constants/ActionTypes";
import FormCheckText from "./formCheckText";
import sha256 from 'sha256';
import validator from 'validator';
import "./register.css";

const registerAsync = ({email, nickname, password}) => (dispatch) => {
    return dispatch(Actions.getClientToken())
        .then(response => {
            if(response.type === ActionTypes.GET_TOKEN_SUCCESS) {
                return dispatch(Actions.register({ email, nickname, password }))
            } else {
                return Promise.reject(response);
            }
        })
};

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 유효성 일치 여부 확인 State
            isEnteredEmailValid: '',
            isEnteredNicknameValid: '',
            isEnteredPasswordValid: '',
            isEnteredConfirmPasswordValid: '',

            // 유효성 관련 메시지 출력 State
            emailValidMsg: '',
            nicknameValidMsg: '',
            passwordValidMsg: '',
            confirmPasswordValidMsg: '',

            // 회원가입 조건 검증 State
            isRegisterEmailValid: false,
            isRegisterNicknameValid: false
        };

        this.emailInput = React.createRef();
        this.nicknameInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    render() {
        // 유효성에 관련된 메시지 CSS
        const inputClassNameHelper = boolean => {
            switch (boolean) {
                case true:
                    return 'is-valid';
                case false:
                    return 'is-invalid';
                default:
                    return '';
            }
        };

        // 이메일 유효성 검증 (이메일 형식만 가능)
        const validateEmail = e => {
            if(validator.isEmail(e)) {
                this.setState({
                    ...this.state,
                    isEnteredEmailValid: true,
                    emailValidMsg: "이메일 중복체크를 진행해주세요.",
                    isRegisterEmailValid: false
                });
            } else {
                this.setState({
                    ...this.state,
                    isEnteredEmailValid: false,
                    emailValidMsg: "올바른 이메일 형식이 아닙니다.",
                    isRegisterEmailValid: false
                });
            }
        };

        // 닉네임 유효성 검증 (최소 2자 이상 16자 이하)
        const validateNickname = e => {
            if(validator.isLength(e, {min: 2, max: 16})) {
                this.setState({
                    ...this.state,
                    isEnteredNicknameValid: true,
                    nicknameValidMsg: "닉네임 중복체크를 진행 해 주세요.",
                    isRegisterNicknameValid: false
                });
            } else {
                this.setState({
                    ...this.state,
                    isEnteredNicknameValid: false,
                    nicknameValidMsg: "닉네임은 최소 2자 이상 16자 이하로 작성해야 합니다.",
                    isRegisterNicknameValid: false
                });
            }
        };

        // 패스워드 유효성 검증
        const validatePassword = e => {
            const regex = "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣]).{8,})";

            if(validator.matches(e, regex)) {
                this.setState({
                    ...this.state,
                    isEnteredPasswordValid: true,
                    passwordValidMsg: "사용가능 한 비밀번호 입니다."
                });
            } else {
                this.setState({
                    ...this.state,
                    isEnteredPasswordValid: false,
                    passwordValidMsg: "대소문자, 특수문자, 숫자포함 8자리 이상 입력해주세요"
                });
            }
        };

        // 비밀번호 확인 검증
        const validateConfirmPassword = e => {
            if (validator.equals(e, this.passwordInput.current.value)) {
                this.setState({
                    ...this.state,
                    isEnteredConfirmPasswordValid: true,
                    confirmPasswordValidMsg: "비밀번호가 일치합니다."
                });
            } else {
                this.setState({
                    ...this.state,
                    isEnteredConfirmPasswordValid: false,
                    confirmPasswordValidMsg: "비밀번호가 일치하지 않습니다."
                });
            }
        };

        // 이메일 중복 체크 로직
        const validateDupEmail = () => {
            const email = this.emailInput.current.value;
            if (validator.isEmail(email)) {
                console.log(this.props.checkEmail(email));
                this.props.checkEmail(email)
                    .then(response => {
                        const { statusCode, statusMessage } = response.payload.data;
                        if(response.type === ActionTypes.DUPLICATION_CHECK_EMAIL_SUCCESS) {
                            if (statusCode == "OK") {
                                this.setState({
                                    ...this.state,
                                    isEnteredEmailValid: true,
                                    isRegisterEmailValid: true
                                });
                            } else {
                                this.setState({
                                    ...this.state,
                                    isEnteredEmailValid: false,
                                    isRegisterEmailValid: false
                                });
                            }
                            this.setState({
                                ...this.state,
                                emailValidMsg: statusMessage,
                            });
                        } else {
                            const { error } = response;
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        console.log("error >>", error);
                    });
            }
        };

        // 닉네임 중복 체크 로직
        const validateDupNickname = () => {
            const nickname = this.nicknameInput.current.value;
            if(validator.isLength(nickname, {min: 2, max: 16})) {
                this.props.checkNickname(nickname)
                    .then(response => {
                        const { statusCode, statusMessage } = response.payload.data;
                        if(response.type === ActionTypes.DUPLICATION_CHECK_NICKNAME_SUCCESS) {
                            if (statusCode == "OK") {
                                this.setState({
                                    ...this.state,
                                    isEnteredNicknameValid: true,
                                    isRegisterNicknameValid: true,
                                });
                            } else {
                                this.setState({
                                    ...this.state,
                                    isEnteredNicknameValid: false,
                                    isRegisterNicknameValid: false,
                                });
                            }
                            this.setState({
                                ...this.state,
                                nicknameValidMsg: statusMessage
                            });
                        } else {
                            const { error } = response;
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        console.log("error >>", error);
                    });
            }
        };

        // 회원가입 Submit
        const onSubmit = e => {
            e.preventDefault();
            if (this.state.isRegisterEmailValid && this.state.isRegisterNicknameValid
                && this.state.isEnteredPasswordValid && this.state.isEnteredConfirmPasswordValid) {

                const email = this.emailInput.current.value;
                const nickname = this.nicknameInput.current.value;
                const password = sha256(this.passwordInput.current.value);

                this.props.register({email, nickname, password})
                    .then(response => {
                        if (response.type === ActionTypes.REGISTER_SUCCESS) {
                            alert('가입 성공!');
                            this.props.history.push('/login');
                        } else {
                            const { error } = response;
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        console.log("error >>", error);
                    });
            } else {
                alert('검증되지 않은 데이터가 존재합니다.')
            }
        };

        return (
            <div>
                <Breadcrumb title={'계정 생성'}/>

                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>계정 생성</h3>
                                <div className="theme-card">
                                    <form className="theme-form" onSubmit={e => onSubmit(e)}>
                                        <div className="form-row ta-form">
                                            <div className="col-md-6">
                                                <label htmlFor="email">아이디(이메일)</label>
                                                <div className="input-group form-group-control">
                                                    <input
                                                        type="text"
                                                        className={`form-control ta-mb0 ${inputClassNameHelper(this.state.isEnteredEmailValid)}`}
                                                        placeholder="아이디(이메일)"
                                                        name="email"
                                                        ref={this.emailInput}
                                                        required
                                                        onChange={e => validateEmail(e.target.value)}
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            className="btn btn-outline-secondary btn-input-group-bottom"
                                                            type="button"
                                                            onClick={validateDupEmail}>중복확인</button>
                                                    </div>
                                                </div>
                                                <FormCheckText sendMsg={this.state.emailValidMsg} isCheck={this.state.isEnteredEmailValid} />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="nickname">닉네임</label>
                                                <div className="input-group form-group-control">
                                                    <input
                                                        type="text"
                                                        className={`form-control ta-mb0 ${inputClassNameHelper(this.state.isEnteredNicknameValid)}`}
                                                        placeholder="닉네임"
                                                        name="nickname"
                                                        ref={this.nicknameInput}
                                                        required
                                                        onChange={e => validateNickname(e.target.value)}
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            className="btn btn-outline-secondary btn-input-group-bottom"
                                                            type="button"
                                                            onClick={validateDupNickname}>중복확인</button>
                                                    </div>
                                                </div>
                                                <FormCheckText sendMsg={this.state.nicknameValidMsg} isCheck={this.state.isEnteredNicknameValid} />
                                            </div>
                                        </div>
                                        <div className="form-row ta-form">
                                            <div className="col-md-6">
                                                <label htmlFor="password">비밀번호</label>
                                                <input type="password"
                                                       className={`form-control ${inputClassNameHelper(this.state.isEnteredPasswordValid)}`}
                                                       name="password"
                                                       placeholder="비밀번호"
                                                       required
                                                       onChange={e => validatePassword(e.target.value)}
                                                />
                                                <FormCheckText sendMsg={this.state.passwordValidMsg} isCheck={this.state.isEnteredPasswordValid} />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="confirmPassword">비밀번호 확인</label>
                                                <input type="password"
                                                       className={`form-control ${inputClassNameHelper(this.state.isEnteredConfirmPasswordValid)}`}
                                                       id="confirmPassword"
                                                       placeholder="비밀번호 확인"
                                                       required
                                                       onChange={e => validateConfirmPassword(e.target.value)}
                                                />
                                                <FormCheckText sendMsg={this.state.confirmPasswordValidMsg} isCheck={this.state.isEnteredConfirmPasswordValid} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-solid">계정생성</button>
                                    </form>
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
    checkNickname: (nickname) => dispatch(Actions.checkNickname(nickname)),
    checkEmail: (email) => dispatch(Actions.checkEmail(email)),
    register: ({email, nickname, password}) => dispatch(registerAsync({email, nickname, password}))
});

export default withRouter(connect(null, mapDispatchToProps)(Register));