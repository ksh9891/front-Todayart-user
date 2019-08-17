import React, { useState } from 'react';
import { Actions } from '../actions/index';
import { ActionTypes } from "../constants";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormCheckText } from "../components";
import "./Register.css";
import {onSuccess} from "redux-axios-middleware";

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
    let emailInput, nicknameInput;
    let passwordInput, confirmPasswordInput;
    const [isPass, setIsPass] = useState(
        0
    );

    // 비밀번호 유효성 검증
    // 조건에 맞으면
    // isPass = true / false
    const checkPassword = (e) => setIsPass(e.target.value);


    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const nickname = nicknameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // [아래 작업 진행해야 함]
        // 중복 이메일 확인
        // 닉네임 중복 체크
        // 비밀번호 - 비밀번호 확인 맞는지 체크
        // Password sha256 암호화
        // 서버에 데이터 전송
        // 전송 후 로그인 페이지로 이동

        register ({ email, nickname, password })
            .then(response => {
                if (response.type === ActionTypes.REGISTER_SUCCESS) {
                    history.push('/login');
                } else {
                    const { error } = response;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                console.log("error >>", error);
            });
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
                              <form className="row login_form was-validated" onSubmit={e => onSubmit(e)}>
                                  <div className="col-md-12 form-group">
                                      <input type="email" className="form-control" ref={element => emailInput = element} id="email" name="email" placeholder="아이디(이메일)" />
                                      <div name="feedback" className="invalid-feedback">asdasdazxcv</div>
                                  </div>
                                  <div className="col-md-12 form-group">
                                      <input type="text" className="form-control" ref={element => nicknameInput = element} id="nickname" name="nickname" placeholder="닉네임" />
                                  </div>
                                  <div className="col-md-12 form-group">
                                      <input type="password" className="form-control" ref={element => passwordInput = element} id="password" name="password" placeholder="비밀번호" onChange={checkPassword} />
                                     <FormCheckText isCheck={isPass} />
                                  </div>
                                  <div className="col-md-12 form-group">
                                      <input type="password" className="form-control" ref={element => confirmPasswordInput = element} id="confirmPassword" placeholder="비밀번호 확인" />
                                  </div>
                                  <div className="col-md-12 form-group" />
                                  <div className="col-md-12 form-group">
                                      <button type="submit" value="submit" className="button button-register w-100">계정생성</button>
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