import React, { useState, useRef } from 'react';
import { Actions } from '../../actions/index';
import { ActionTypes } from "../../constants";
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';
import { FormCheckText } from "../../components";
import sha256 from 'sha256';


//  비밀번호 확인되면 업데이트 실행하기 위해 선언
const updateAsync = ({ realname, nickname, chkPassword, password, phone }) => (dispatch) => {
    return dispatch(Actions.checkPassword())
        .then(response => {
            const { statusCode, statusMessage } = response.payload.data;
            if (response.type === ActionTypes.CHECK_PASSWORD_SUCCESS) {
                if (statusCode === "OK") {
                    return dispatch(Actions.update({ realname, nickname, chkPassword, password, phone }))
                } else {
                    alert(statusMessage);
                }
            } else {
                return Promise.reject(response);
            }
        })
};

const Update = ({ history, auth, update, checkNickname }) => {
    const { userDetails } = auth;

    /* 유효성 일치 여부 확인 State */
    const [isEnteredNicknameValid, setIsEnteredNicknameValid] = useState('');
    const [isEnteredPasswordValid, setIsEnteredPasswordValid] = useState('');
    const [isEnteredConfirmPasswordValid, setIsEnteredConfirmPasswordValid] = useState('');

    /* 유효성 관련 메시지 출력 State */
    const [nicknameValidMsg, setNicknameValidMsg] = useState('');
    const [passwordValidMsg, setPasswordValidMsg] = useState('');
    const [confirmPasswordValidMsg, setConfirmPasswordValidMsg] = useState('');

    let realnameInput = useRef('');
    let nicknameInput = useRef('');
    let passwordInput = useRef('');
    let chkPasswordInput = useRef('');
    let phoneInput = useRef('');


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
    // 패스워드 유효성 검증
    const validatePassword = e => {
        const regex = "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣]).{8,})";

        if (validator.matches(e, regex)) {
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

    // 닉네임 유효성 검증 (최소 2자 이상 16자 이하)
    const validateNickname = e => {
        if (validator.isLength(e, { min: 2, max: 16 })) {
            setNicknameValidMsg("닉네임 중복체크를 진행해주세요.");
            setIsEnteredNicknameValid(true);
        } else {
            setNicknameValidMsg("닉네임은 최소 2자 이상 16자 이하로 작성해야 합니다.");
            setIsEnteredNicknameValid(false);
        }
    };
    // 닉네임 중복 체크 로직
    const validateDupNickname = () => {
        const nickname = nicknameInput.current.value;
        if (validator.isLength(nickname, { min: 2, max: 16 })) {
            checkNickname(nickname)
                .then(response => {
                    const { statusCode, statusMessage } = response.payload.data;
                    if (response.type === ActionTypes.DUPLICATION_CHECK_NICKNAME_SUCCESS) {
                        if (statusCode === "OK") {
                            setIsEnteredNicknameValid(true);
                        } else {
                            setIsEnteredNicknameValid(false);
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

    const onSubmit = e => {
        e.preventDefault();

        const realname = realnameInput.current.value;
        const nickname = nicknameInput.current.value;
        const chkPassword = chkPasswordInput.current.value;
        const password = sha256(passwordInput.current.value);
        const phone = phoneInput.current.value;

        update({ realname, nickname, chkPassword, password, phone })
            .then(response => {
                if (response.type === ActionTypes.UPDATE_USER_SUCCESS) {
                    alert('수정 성공!');
                    history.push('/account');
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
        <form onSubmit={e => onSubmit(e)}>
            <div className="col-md-12 form-group">
                <th> 이름 </th>
                <input
                    type="text"
                    className={`form-control ${inputClassNameHelper(isEnteredPasswordValid)}`}
                    id="realname"
                    name="realname"
                    ref={realnameInput}
                    placeholder="이름" />
            </div>
            <div className="col-md-12 form-group">
                <th> 아이디(이메일)</th>
                <input
                    type="email"
                    className={`form-control ${inputClassNameHelper(isEnteredPasswordValid)}`}
                    id="email"
                    name="email"
                    ref={userDetails.email}
                    readonly
                    placeholder="아이디(이메일)" />
            </div>
            <div className="col-md-12 form-group">
                <th>닉네임</th>
                <input
                    type="text"
                    className={`form-control ${inputClassNameHelper(isEnteredPasswordValid)}`}
                    id="nickname"
                    name="nickname"
                    ref={nicknameInput}
                    placeholder="닉네임"
                    onChange={e => validateNickname(e.target.value)} />
                <button
                    className="btn btn-outline-secondary btn-input-group-bottom"
                    type="button"
                    onClick={validateDupNickname}>중복확인</button>
                <FormCheckText sendMsg={nicknameValidMsg} isCheck={isEnteredNicknameValid} />
            </div>
            <div className="col-md-12 form-group">
                <th> 현재비밀번호</th>
                <input
                    type="password"
                    className={`form-control ${inputClassNameHelper(isEnteredPasswordValid)}`}
                    id="password"
                    name="password"
                    ref={chkPasswordInput}
                    placeholder="현재 비밀번호" />
            </div>
            <div className="col-md-12 form-group">
                <th> 새 비밀번호</th>
                <input
                    type="password"
                    className={`form-control ${inputClassNameHelper(isEnteredPasswordValid)}`}
                    id="password"
                    name="password"
                    ref={passwordInput}
                    placeholder="새 비밀번호"
                    onChange={e => validatePassword(e.target.value)} />
                <FormCheckText sendMsg={passwordValidMsg} isCheck={isEnteredPasswordValid} />
            </div>
            <div className="col-md-12 form-group">
                <th> 새 비밀번호 확인</th>
                <input
                    type="password"
                    className={`form-control ${inputClassNameHelper(isEnteredPasswordValid)}`}
                    id="password"
                    name="password"
                    ref={passwordInput}
                    placeholder="새 비밀번호 확인"
                    onChange={e => validateConfirmPassword(e.target.value)} />
                <FormCheckText sendMsg={confirmPasswordValidMsg} isCheck={isEnteredConfirmPasswordValid} />
            </div>
            <div className="col-md-12 form-group">
                <th> 전화 번호</th>
                <input
                    type="text"
                    className={`form-control ${inputClassNameHelper(isEnteredPasswordValid)}`}
                    id="phone"
                    name="phone"
                    ref={phoneInput}
                    placeholder="전화번호" />
            </div>
            <div className="col-md-12 form-group">
                <th> 기본 배송지</th>
            </div>
            <div className="col-md-12 form-group">
                <button type="submit" className="button button-update w-50">
                    수정
            </button>
                <button type="button" className="button button-update w-50">
                    <Link to="/account">취소</Link>
                </button>
            </div>
        </form>
    );
}
const mapDispatchToProps = (dispatch) => ({
    checkPassword: (chkPassword) => dispatch(Actions.checkPassword(chkPassword)),
    update: ({ realname, nickname, chkPassword, password, phone }) => dispatch(updateAsync({ realname, nickname, chkPassword, password, phone }))
});

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Update));