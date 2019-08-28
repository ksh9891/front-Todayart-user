import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "./account.css";
import validator from "validator";
import {ActionTypes} from "../../constants/ActionTypes";
import {Actions} from "../../actions";
import FormCheckText from "./formCheckText";
import sha256 from "sha256";

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 변경액션 수행 여부
            isNicknameEdit: false,
            isRealNameEdit: false,
            isPhoneEdit: false,

            // 닉네임
            isEnteredNicknameValid: '',
            isUpdatedNicknameValid: true
        }

        this.handleButtonChangeNicknameUpdate = this.onUpdate.bind(this, "nickname");
        this.handleButtonChangeRealNameUpdate = this.onUpdate.bind(this, "realName");
        this.handleButtonChangePhoneUpdate = this.onUpdate.bind(this, "phone");

        this.handleButtonChangeNicknameEdit = this.onEdit.bind(this, "nickname");
        this.handleButtonChangeRealNameEdit = this.onEdit.bind(this, "realName");
        this.handleButtonChangePhoneEdit = this.onEdit.bind(this, "phone");

        this.handleButtonChangeNicknameCancel = this.cancelEdit.bind(this, "nickname");
        this.handleButtonChangeRealNameCancel = this.cancelEdit.bind(this, "realName");
        this.handleButtonChangePhoneCancel = this.cancelEdit.bind(this, "phone");

        this.nicknameInput = React.createRef();
    }

    validInfo = (info) => {
        return info !== null && info !== undefined;
    };

    onEdit = (type) => {
        switch(type) {
            case "nickname":
                return this.setState({...this.state,isNicknameEdit: true});
            case "realName":
                return this.setState({...this.state,isRealNameEdit: true});
            case "phone":
                return this.setState({...this.state,isPhoneEdit: true});
            default:
                return this.state;
        }
    };

    cancelEdit = (type) => {
        switch(type) {
            case "nickname":
                return this.setState({...this.state,isNicknameEdit: false});
            case "realName":
                return this.setState({...this.state,isRealNameEdit: false});
            case "phone":
                return this.setState({...this.state,isPhoneEdit: false});
            default:
                return this.state;
        }
    }

    // 업데이트
    onUpdate = (type) => {
        switch(type) {
            case "nickname":
                this.props.checkNickname(this.nicknameInput.current.value)
                    .then(response => {
                        const { statusCode, statusMessage } = response.payload.data;
                        if(response.type === ActionTypes.DUPLICATION_CHECK_NICKNAME_SUCCESS) {
                            if (statusCode == "OK") {
                                this.setState({
                                    ...this.state,
                                    isEnteredNicknameValid: true,
                                    isUpdatedNicknameValid: true,
                                });
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
                break;
            case "realName":
                break;
            case "phone":
                break;
            default:
                break;
        }
    };

    render (){
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

        // 닉네임 유효성 검증 (최소 2자 이상 16자 이하)
        const validateNickname = e => {
            // 기존 닉네임일 경우
            if(e === this.props.auth.userDetails.nickname) {
                this.setState({
                    ...this.state,
                    isEnteredNicknameValid: false,
                    nicknameValidMsg: "닉네임을 변경 해 주세요"
                });
            } else {
                if(validator.isLength(e, {min: 2, max: 16})) {
                    this.setState({
                        ...this.state,
                        isEnteredNicknameValid: true,
                        nicknameValidMsg: "닉네임 중복체크를 진행 해 주세요."
                    });
                } else {
                    this.setState({
                        ...this.state,
                        isEnteredNicknameValid: false,
                        nicknameValidMsg: "닉네임은 최소 2자 이상 16자 이하로 작성해야 합니다."
                    });
                }
            }
        };

        // 닉네임 중복 체크 로직
        const validateDupNickname = () => {
            const nickname = this.nicknameInput.current.value;

            if(this.state.isEnteredNicknameValid) {
                this.props.checkNickname(nickname)
                    .then(response => {
                        const { statusCode, statusMessage } = response.payload.data;
                        if(response.type === ActionTypes.DUPLICATION_CHECK_NICKNAME_SUCCESS) {
                            if (statusCode == "OK") {
                                this.setState({
                                    ...this.state,
                                    isEnteredNicknameValid: true,
                                    isUpdatedNicknameValid: true,
                                });
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
            } else {
                this.setState({
                    ...this.state,
                    isEnteredNicknameValid: false,
                    nicknameValidMsg: "동일한 닉네임이거나, 유효하지 않은 형식입니다."
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
                                            <li className="active"><a href='#'>계정정보 관리</a></li>
                                            <li><a href="#">배송지 관리</a></li>
                                            <li><a href="#">주문 관리</a></li>
                                            <li><a href="#">찜목록 관리</a></li>
                                            <li><a href="#">비밀번호 변경</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="dashboard-right">
                                    <div className="dashboard">
                                        <div className="box-account box-info">
                                            <div className="box-head">
                                                <h2>계정정보 관리</h2>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <form className="theme-form">
                                                        <div className="box">
                                                            <div className="box-title">
                                                                <h3>계정정보</h3>
                                                            </div>
                                                            <div className="box-content">
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <h6>이메일</h6>
                                                                    </div>
                                                                    <div className="col-sm-8">
                                                                        <span>{this.props.auth.userDetails.email}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <h6>비밀번호</h6>
                                                                    </div>
                                                                    <div className="col-sm-8">
                                                                        <span>**********</span>
                                                                        <span className="ta-info-modify-action"><Link to="/">비밀번호 변경하기</Link></span>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <h6>닉네임</h6>
                                                                    </div>
                                                                    <div className="col-sm-8">
                                                                        {this.state.isNicknameEdit ?
                                                                            <div>
                                                                                <div className="input-group form-group-control">
                                                                                    <input
                                                                                        type="text"
                                                                                        className={`form-control ta-mb0 ${inputClassNameHelper(this.state.isEnteredNicknameValid)}`}
                                                                                        placeholder="닉네임"
                                                                                        name="nickname"
                                                                                        ref={this.nicknameInput}
                                                                                        defaultValue={this.props.auth.userDetails.nickname}
                                                                                        required
                                                                                        onChange={e => validateNickname(e.target.value)}
                                                                                    />
                                                                                    <div className="input-group-append">
                                                                                        <button
                                                                                            className="btn btn-outline-secondary btn-input-group-bottom"
                                                                                            type="button"
                                                                                            onClick={validateDupNickname}>중복확인</button>
                                                                                    </div>
                                                                                    <div className="btn-group btn-group-sm ml-3">
                                                                                        <button className="btn btn-solid" type="button" onClick={this.handleButtonChangeNicknameUpdate}>변경</button>
                                                                                        <button className="btn btn-solid" onClick={this.handleButtonChangeNicknameCancel}>취소</button>
                                                                                    </div>
                                                                                </div>
                                                                                <FormCheckText sendMsg={this.state.nicknameValidMsg} isCheck={this.state.isEnteredNicknameValid} />
                                                                            </div> :
                                                                            <div>
                                                                                <span>{this.props.auth.userDetails.nickname}</span>
                                                                                <span className="ta-info-modify-action" onClick={this.handleButtonChangeNicknameEdit}>닉네임 변경하기</span>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <h6>이름</h6>
                                                                    </div>
                                                                    <div className="col-sm-8">
                                                                        <span>{this.validInfo(this.props.auth.userDetails.realName) ? this.props.auth.userDetails.realName : '입력한 정보가 없어요'}</span>
                                                                        {this.state.isRealNameEdit ? "" : <span className="ta-info-modify-action" onClick={this.handleButtonChangeRealNameEdit}>이름 변경하기</span>}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <h6>연락처</h6>
                                                                    </div>
                                                                    <div className="col-sm-8">
                                                                        <span>{this.validInfo(this.props.auth.userDetails.phone) ? this.props.auth.userDetails.phone : '입력한 정보가 없어요'}</span>
                                                                        {this.state.isPhoneEdit ? "" : <span className="ta-info-modify-action" onClick={this.handleButtonChangePhoneEdit}>연락처 변경하기</span>}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <h6>대표 배송지</h6>
                                                                    </div>
                                                                    <div className="col-sm-8">
                                                                        <span>{this.validInfo(this.props.auth.userDetails.address) ? this.props.auth.userDetails.address : '입력한 정보가 없어요'}</span>
                                                                        <span className="ta-info-modify-action"><Link to="/">대표 배송지 변경하기</Link></span>
                                                                    </div>
                                                                </div>
                                                                {this.state.isEdit ?
                                                                    <div className="row ta-btn-group">
                                                                        <div className="col-sm-6">
                                                                            <button className="btn btn-outline btn-full mb-3" onClick={this.accountEditCancel}>취소하기</button>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <button className="btn btn-outline btn-full mb-3">저장하기</button>
                                                                        </div>
                                                                    </div>
                                                                    : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
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
    checkNickname: (nickname) => dispatch(Actions.checkNickname(nickname)),
    updateNickname: (nickname) => dispatch(Actions.updateNickname(nickname))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account))