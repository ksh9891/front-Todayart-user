import React, { useState } from 'react';
import { Actions } from '../actions/index';
import { ActionTypes } from "../constants";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';
import { FormCheckText } from "../components";
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


const Register = ({ history, register }) => {
    const [isEnteredEmailValid, setIsEnteredEmailValid] = useState('');
    const [isEnteredNicknameValid, setIsEnteredNicknameValid] = useState('');
    const [isEnteredPasswordValid, setIsEnteredPasswordValid] = useState('');

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
        return setIsEnteredEmailValid(validator.isEmail(e))
    };

    // 닉네임 유효성 검증 (영어와 숫자만 가능)
    const validateNickname = e => {
        return setIsEnteredNicknameValid(validator.isAlphanumeric(e))
    };

    // 패스워드 유효성 검증
    const validatePassword = e => {
        // 대소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열
        const regex = "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣]).{8,})";
        return setIsEnteredPasswordValid(validator.matches(e, regex))
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
                                  <a className="button button-account" href="./login">로그인</a>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-6">
                          <div className="login_form_inner register_form_inner">
                              <h3>계정생성</h3>
                              <form className="row login_form">
                                  <div className="col-md-12 form-group">
                                      <input
                                          type="email"
                                          className={`form-control ${inputClassNameHelper(isEnteredEmailValid)}`}
                                          id="email"
                                          name="email"
                                          placeholder="아이디(이메일)"
                                          required
                                          onChange={e => validateEmail(e.target.value)}
                                      />
                                      <FormCheckText isCheck={isEnteredEmailValid} validType="email" />
                                  </div>
                                  <div className="col-md-12 form-group">
                                      <input
                                          type="text"
                                          className={`form-control ${inputClassNameHelper(isEnteredNicknameValid)}`}
                                          id="nickname"
                                          name="nickname"
                                          placeholder="닉네임"
                                          required
                                          onChange={e => validateNickname(e.target.value)}
                                      />
                                  </div>
                                  <div className="col-md-12 form-group">
                                      <input
                                          type="password"
                                          className={`form-control ${inputClassNameHelper(isEnteredPasswordValid)}`}
                                          id="password"
                                          name="password"
                                          placeholder="비밀번호"
                                          required
                                          onChange={e => validatePassword(e.target.value)}
                                      />
                                  </div>
                                  <div className="col-md-12 form-group">
                                      <input
                                          type="password"
                                          className="form-control"
                                          id="confirmPassword"
                                          placeholder="비밀번호 확인"
                                      />
                                  </div>
                                  <div className="col-md-12 form-group" />
                                  <div className="col-md-12 form-group">
                                      <button
                                          type="submit"
                                          value="submit"
                                          className="button button-register w-100">
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
   register: (email, nickname, password) => dispatch(registerAsync(email, nickname, password))
});

export default withRouter(connect(null, mapDispatchToProps)(Register));