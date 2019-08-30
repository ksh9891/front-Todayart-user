import React, {Component} from 'react';
import Breadcrumb from "../../common/breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Actions} from "../../../actions";
import "./password.css"
import FormCheckText from "../formCheckText";
import validator from "validator";
import sha256 from 'sha256';
import {ActionTypes} from "../../../constants/ActionTypes";

class Password extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 유효성 일치 여부 확인 State
            isEnteredPasswordValid: '',
            isEnteredConfirmPasswordValid: '',

            // 유효성 관련 메시지 출력 State
            passwordValidMsg: '',
            confirmPasswordValidMsg: '',
        };

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

        const onUpdate = e => {
            e.preventDefault();

            if(this.state.isEnteredPasswordValid && this.state.isEnteredConfirmPasswordValid) {
                this.props.updatePassword(sha256(this.passwordInput.current.value))
                    .then(response => {
                        const { statusCode, statusMessage } = response.payload.data;
                        if(response.type === ActionTypes.UPDATE_PASSWORD_SUCCESS) {
                            if (statusCode == "OK") {
                                return this.props.getMemberMe()
                                    .then(response => {
                                        if(response.type === ActionTypes.GET_USER_SUCCESS) {
                                            alert("변경 완료!");
                                            this.props.history.push('/account');
                                        } else {
                                            const { error } = response;
                                            return Promise.reject(error);
                                        }
                                    })
                                    .catch(error => {
                                        console.log("error >> ", error);
                                    })
                            } else {
                                this.setState({
                                    ...this.state,
                                    isEnteredNicknameValid: false,
                                    isUpdatedNicknameValid: false,
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

        return (
            <div>
                <Breadcrumb title={'마이페이지'} />

                {/*Dashboard section*/}
                <section className="section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                {/*<div className="account-sidebar">*/}
                                {/*    <a className="popup-btn">마이페이지</a>*/}
                                {/*</div>*/}
                                <div className="dashboard-left">
                                    <div className="collection-mobile-back">
                                    <span className="filter-back">
                                        <i className="fa fa-angle-left" aria-hidden="true" /> back
                                    </span>
                                    </div>
                                    <div className="block-content">
                                        <ul>
                                            <li><Link to="/account">계정정보 관리</Link></li>
                                            <li className="active"><Link to="/account/password">비밀번호 변경</Link></li>
                                            <li><Link to="/account/address">배송지 관리</Link></li>
                                            <li><Link to="/account/order">주문 관리</Link></li>
                                            <li><Link to="/wishlist">찜목록 관리</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="dashboard-right">
                                    <div className="dashboard">
                                        <div className="box-account box-info">
                                            <div className="box-head">
                                                <h2>비밀번호 변경</h2>
                                            </div>
                                            <form className="theme-form" onSubmit={e => onUpdate(e)}>
                                                <div className="row">
                                                    <div className="col-sm-12 mb-3">
                                                        <div className="form-group-control">
                                                            <input type="password"
                                                                   className={`form-control ${inputClassNameHelper(this.state.isEnteredPasswordValid)}`}
                                                                   name="newPassword"
                                                                   placeholder="신규 비밀번호 입력"
                                                                   ref={this.passwordInput}
                                                                   onChange={e => validatePassword(e.target.value)}
                                                                   required
                                                            />
                                                        </div>
                                                        <FormCheckText sendMsg={this.state.passwordValidMsg} isCheck={this.state.isEnteredPasswordValid} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-12">
                                                        <div className="form-group-control">
                                                            <input type="password"
                                                                   className={`form-control ${inputClassNameHelper(this.state.isEnteredConfirmPasswordValid)}`}
                                                                   name="newPasswordConfirm"
                                                                   placeholder="신규 비밀번호 확인"
                                                                   onChange={e => validateConfirmPassword(e.target.value)}
                                                                   required
                                                            />
                                                        </div>
                                                        <FormCheckText sendMsg={this.state.confirmPasswordValidMsg} isCheck={this.state.isEnteredConfirmPasswordValid} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <button className="btn btn-brown btn-full" type="submit">변경</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getMemberMe: () => dispatch(Actions.getMemberMe()),
    updatePassword: (password) => dispatch(Actions.updatePassword(password))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Password))