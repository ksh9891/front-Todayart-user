import React, { useState, useRef } from 'react';
import { Actions } from '../actions/index';
import { ActionTypes } from "../constants";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';
import { FormCheckText } from "../components";
import sha256 from 'sha256';
import "./Register.css";

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

const Register = ({ history, register, checkEmail, checkNickname }) => {
    /* 유효성 일치 여부 확인 State */
    const [isEnteredEmailValid, setIsEnteredEmailValid] = useState('');
    const [isEnteredNicknameValid, setIsEnteredNicknameValid] = useState('');
    const [isEnteredPasswordValid, setIsEnteredPasswordValid] = useState('');
    const [isEnteredConfirmPasswordValid, setIsEnteredConfirmPasswordValid] = useState('');

    /* 유효성 관련 메시지 출력 State */
    const [emailValidMsg, setEmailValidMsg] = useState('');
    const [nicknameValidMsg, setNicknameValidMsg] = useState('');
    const [passwordValidMsg, setPasswordValidMsg] = useState('');
    const [confirmPasswordValidMsg, setConfirmPasswordValidMsg] = useState('');

    /* 회원가입 조건 검증 State */
    const [isRegisterEmailValid, setIsRegisterEmailValid] = useState(false);
    const [isRegisterNicknameValid, setIsRegisterNicknameValid] = useState(false);

    let emailInput = useRef('');
    let nicknameInput = useRef('');
    let passwordInput = useRef('');

    // 로그인 페이지 이동
    const onLogin = () => {
        history.push("/login")
    };

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
            setEmailValidMsg("이메일 중복체크를 진행해주세요.");
            setIsEnteredEmailValid(true);
            setIsRegisterEmailValid(false);
        } else {
            setEmailValidMsg("올바른 이메일 형식이 아닙니다.");
            setIsEnteredEmailValid(false);
            setIsRegisterEmailValid(false);
        }
    };

    // 닉네임 유효성 검증 (최소 2자 이상 16자 이하)
    const validateNickname = e => {
        if(validator.isLength(e, {min: 2, max: 16})) {
            setNicknameValidMsg("닉네임 중복체크를 진행해주세요.");
            setIsEnteredNicknameValid(true);
            setIsRegisterNicknameValid(false);
        } else {
            setNicknameValidMsg("닉네임은 최소 2자 이상 16자 이하로 작성해야 합니다.");
            setIsEnteredNicknameValid(false);
            setIsRegisterNicknameValid(false);
        }
    };

    // 패스워드 유효성 검증
    const validatePassword = e => {
        const regex = "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣]).{8,})";

        if(validator.matches(e, regex)) {
            setPasswordValidMsg("사용가능한 비밀번호 입니다.");
            setIsEnteredPasswordValid(true);
        } else {
            setPasswordValidMsg("대소문자, 특수문자, 숫자포함 8자리 이상 입력해주세요");
            setIsEnteredPasswordValid(false);
        }
    };

    // 비밀번호 확인 검증
    const validateConfirmPassword = e => {
        if (validator.equals(e, passwordInput.current.value)) {
            setConfirmPasswordValidMsg("비밀번호가 일치합니다.");
            setIsEnteredConfirmPasswordValid(true);
        } else {
            setConfirmPasswordValidMsg("비밀번호가 일치하지 않습니다.");
            setIsEnteredConfirmPasswordValid(false);
        }
    };

    // 이메일 중복 체크 로직
    const validateDupEmail = () => {
        const email = emailInput.current.value;
        if (validator.isEmail(email)) {
            checkEmail(email)
            .then(response => {
                const { statusCode, statusMessage } = response.payload.data;
                if(response.type === ActionTypes.DUPLICATION_CHECK_EMAIL_SUCCESS) {
                    if (statusCode == "OK") {
                        setIsEnteredEmailValid(true);
                        setIsRegisterEmailValid(true);
                    } else {
                        setIsEnteredEmailValid(false);
                        setIsRegisterEmailValid(false);
                    }
                    setEmailValidMsg(statusMessage);
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
        const nickname = nicknameInput.current.value;
        if(validator.isLength(nickname, {min: 2, max: 16})) {
            checkNickname(nickname)
            .then(response => {
                const { statusCode, statusMessage } = response.payload.data;
                if(response.type === ActionTypes.DUPLICATION_CHECK_NICKNAME_SUCCESS) {
                    if (statusCode == "OK") {
                        setIsEnteredNicknameValid(true);
                        setIsRegisterNicknameValid(true);
                    } else {
                        setIsEnteredNicknameValid(false);
                        setIsRegisterNicknameValid(false);
                    }
                    setNicknameValidMsg(statusMessage);
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
        if (isRegisterEmailValid && isRegisterNicknameValid
            && isEnteredPasswordValid && isEnteredConfirmPasswordValid) {

            const email = emailInput.current.value;
            const nickname = nicknameInput.current.value;
            const password = sha256(passwordInput.current.value);

            register({email, nickname, password})
                .then(response => {
                    if (response.type === ActionTypes.REGISTER_SUCCESS) {
                        alert('가입 성공!');
                        history.push('/login');
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
          <section className="login_box_area section-margin">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-6">
                          <div className="login_box_img">
                              <div className="hover">
                                  <h4>이미 계정이 있으신가요?</h4>
                                  <p>아래 로그인 버튼을 통해 로그인 해주세요!</p>
                                  <button type="button" className="button button-account" onClick={onLogin}>로그인</button>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-6">
                          <div className="login_form_inner register_form_inner">
                              <h3>계정생성</h3>
                              <form
                                  className="row login_form"
                                  onSubmit={e => onSubmit(e)}
                              >
                                  <div className="col-md-12 form-group">
                                      <div className="input-group form-group-control">
                                          <input
                                              type="email"
                                              className={`form-control ${inputClassNameHelper(isEnteredEmailValid)}`}
                                              id="email"
                                              name="email"
                                              placeholder="아이디(이메일)"
                                              ref={emailInput}
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
                                      <FormCheckText sendMsg={emailValidMsg} isCheck={isEnteredEmailValid} />
                                  </div>
                                  <div className="col-md-12 form-group">
                                      <div className="input-group form-group-control">
                                          <input
                                              type="text"
                                              className={`form-control ${inputClassNameHelper(isEnteredNicknameValid)}`}
                                              id="nickname"
                                              name="nickname"
                                              autoComplete="nickname"
                                              placeholder="닉네임"
                                              ref={nicknameInput}
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
                                      <FormCheckText sendMsg={nicknameValidMsg} isCheck={isEnteredNicknameValid} />
                                  </div>
                                  <div className="col-md-12 form-group">
                                      <input
                                          type="password"
                                          className={`form-control ${inputClassNameHelper(isEnteredPasswordValid)}`}
                                          id="password"
                                          name="password"
                                          placeholder="비밀번호"
                                          autoComplete="new-password"
                                          required
                                          ref={passwordInput}
                                          onChange={e => validatePassword(e.target.value)}
                                      />
                                      <FormCheckText sendMsg={passwordValidMsg} isCheck={isEnteredPasswordValid} />
                                  </div>
                                  <div className="col-md-12 form-group">
                                      <input
                                          type="password"
                                          className={`form-control ${inputClassNameHelper(isEnteredConfirmPasswordValid)}`}
                                          id="confirmPassword"
                                          placeholder="비밀번호 확인"
                                          autoComplete="new-password"
                                          required
                                          onChange={e => validateConfirmPassword(e.target.value)}
                                      />
                                      <FormCheckText sendMsg={confirmPasswordValidMsg} isCheck={isEnteredConfirmPasswordValid} />
                                  </div>
                                  <div className="col-md-12 form-group" />
                                  <div className="col-md-12 form-group">
                                      <button
                                          type="submit"
                                          value="submit"
                                          className="button button-register w-100"
                                      >
                                          계정생성
                                      </button>
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
    checkNickname: (nickname) => dispatch(Actions.checkNickname(nickname)),
    checkEmail: (email) => dispatch(Actions.checkEmail(email)),
    register: ({email, nickname, password}) => dispatch(registerAsync({email, nickname, password}))
});

export default withRouter(connect(null, mapDispatchToProps)(Register));