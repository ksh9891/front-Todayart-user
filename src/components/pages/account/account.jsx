import React, {Component} from 'react';
import Breadcrumb from "../../common/breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "./account.css";
import validator from "validator";
import {ActionTypes} from "../../../constants/ActionTypes";
import {Actions} from "../../../actions";
import FormCheckText from "../formCheckText";
import sha256 from "sha256";

class Account extends Component {
    constructor(props) {
        super(props);

        const { memberAddresses } = this.props.auth.userDetails;

        let address = '';
        if(memberAddresses === null || memberAddresses === undefined) {
            address = '';
        } else {
            const addresses = memberAddresses.filter(item => (item.mainAddress === 'y'));
            address = addresses[0].address + addresses[0].addressDetail;
        }

        // this.setState({
        //     ...this.state,
        //     mainAddress: addresses[0].address + addresses[0].addressDetail
        // })

        this.state = {
            // 변경액션 수행 여부
            isNicknameEdit: false,
            isRealNameEdit: false,
            isPhoneEdit: false,

            // 닉네임
            isEnteredNicknameValid: '',
            isUpdatedNicknameValid: false,
            nicknameValidMsg: '',

            // 이름
            isEnteredRealNameValid: '',
            isUpdatedRealNameValid: false,
            realNameValidMsg: '',

            // 연락처
            isEnteredPhoneValid: '',
            isUpdatedPhoneValid: false,
            phoneValidMsg: '',

            // 대표 배송지
            mainAddress: address
        }

        // 업데이트 버튼
        this.handleButtonChangeNicknameUpdate = this.onUpdate.bind(this, "nickname");
        this.handleButtonChangeRealNameUpdate = this.onUpdate.bind(this, "realName");
        this.handleButtonChangePhoneUpdate = this.onUpdate.bind(this, "phone");

        // 편집모드 실행 버튼
        this.handleButtonChangeNicknameEdit = this.onEdit.bind(this, "nickname");
        this.handleButtonChangeRealNameEdit = this.onEdit.bind(this, "realName");
        this.handleButtonChangePhoneEdit = this.onEdit.bind(this, "phone");

        // 편집모드 취소 버튼
        this.handleButtonChangeNicknameCancel = this.cancelEdit.bind(this, "nickname");
        this.handleButtonChangeRealNameCancel = this.cancelEdit.bind(this, "realName");
        this.handleButtonChangePhoneCancel = this.cancelEdit.bind(this, "phone");

        this.nicknameInput = React.createRef();
        this.realNameInput = React.createRef();
        this.phoneInput = React.createRef();
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

    preventAction = (e) => {
        e.preventDefault();
    }

    // 업데이트
    onUpdate = (type) => {
        switch(type) {
            case "nickname":
                this.props.updateNickname(this.nicknameInput.current.value)
                    .then(response => {
                        const { statusCode, statusMessage } = response.payload.data;
                        if(response.type === ActionTypes.UPDATE_NICKNAME_SUCCESS) {
                            if (statusCode == "OK") {
                                this.setState({
                                    ...this.state,
                                    isNicknameEdit: false,
                                    isEnteredNicknameValid: '',
                                    isUpdatedNicknameValid: false,
                                });
                                return this.props.getMemberMe()
                                    .then(response => {
                                        if(response.type === ActionTypes.GET_USER_SUCCESS) {
                                            console.log("유저 정보 다시 가져오기!");
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
                break;
            case "realName":
                this.props.updateRealName(this.realNameInput.current.value)
                    .then(response => {
                        const { statusCode, statusMessage } = response.payload.data;
                        if(response.type === ActionTypes.UPDATE_REALNAME_SUCCESS) {
                            if (statusCode == "OK") {
                                this.setState({
                                    ...this.state,
                                    isRealNameEdit: false,
                                    isEnteredRealNameValid: '',
                                    isUpdatedRealNameValid: false,
                                });
                                return this.props.getMemberMe()
                                    .then(response => {
                                        if(response.type === ActionTypes.GET_USER_SUCCESS) {
                                            console.log("유저 정보 다시 가져오기!");
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
                                    isEnteredRealNameValid: false,
                                    isUpdatedRealNameValid: false,
                                });
                            }
                            this.setState({
                                ...this.state,
                                realNameValidMsg: statusMessage
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
            case "phone":
                this.props.updatePhone(this.phoneInput.current.value)
                    .then(response => {
                        const { statusCode, statusMessage } = response.payload.data;
                        if(response.type === ActionTypes.UPDATE_PHONE_SUCCESS) {
                            if (statusCode == "OK") {
                                this.setState({
                                    ...this.state,
                                    isPhoneEdit: false,
                                    isEnteredPhoneValid: '',
                                    isUpdatedPhoneValid: false,
                                });
                                return this.props.getMemberMe()
                                    .then(response => {
                                        if(response.type === ActionTypes.GET_USER_SUCCESS) {
                                            console.log("유저 정보 다시 가져오기!");
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
                                    isEnteredPhoneValid: false,
                                    isUpdatedPhoneValid: false,
                                });
                            }
                            this.setState({
                                ...this.state,
                                phoneValidMsg: statusMessage
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
            default:
                return this.props.getMemberMe()
                    .then(response => {
                        if(response.type === ActionTypes.GET_USER_SUCCESS) {
                            console.log("유저 정보 다시 가져오기!");
                        } else {
                            const { error } = response;
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        console.log("error >> ", error);
                    })
        }
    };

    componentDidMount() {

    }

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
                                            <li className="active"><Link to="/account">계정정보 관리</Link></li>
                                            <li><Link to="/account/password">비밀번호 변경</Link></li>
                                            <li><Link to="/account/addresses">배송지 관리</Link></li>
                                            <li><Link to="/account/orders">주문 관리</Link></li>
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
                                                                        <span className="ta-info-modify-action"><Link to="/account/password">비밀번호 변경하기</Link></span>
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
                                                                        {this.state.isRealNameEdit ?
                                                                            <div className="input-group form-group-control">
                                                                                <input
                                                                                    type="text"
                                                                                    className={`form-control ta-mb0 ${inputClassNameHelper(this.state.isEnteredRealNameValid)}`}
                                                                                    placeholder="이름"
                                                                                    name="realName"
                                                                                    ref={this.realNameInput}
                                                                                    defaultValue={this.props.auth.userDetails.realName}
                                                                                    required
                                                                                    onChange={e => validateNickname(e.target.value)}
                                                                                />
                                                                                <div className="btn-group btn-group-sm ml-3">
                                                                                    <button className="btn btn-solid"
                                                                                            type="button"
                                                                                            onClick={this.handleButtonChangeRealNameUpdate}>변경
                                                                                    </button>
                                                                                    <button className="btn btn-solid"
                                                                                            onClick={this.handleButtonChangeRealNameCancel}>취소
                                                                                    </button>
                                                                                </div>
                                                                            </div> :
                                                                            <div>
                                                                                <span>{this.validInfo(this.props.auth.userDetails.realName) ? this.props.auth.userDetails.realName : '입력한 정보가 없어요'}</span>
                                                                                <span className="ta-info-modify-action" onClick={this.handleButtonChangeRealNameEdit}>이름 변경하기</span>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <h6>연락처</h6>
                                                                    </div>
                                                                    <div className="col-sm-8">
                                                                        {this.state.isPhoneEdit ?
                                                                            <div className="input-group form-group-control">
                                                                                <input
                                                                                    type="text"
                                                                                    className={`form-control ta-mb0 ${inputClassNameHelper(this.state.isEnteredRealNameValid)}`}
                                                                                    placeholder="연락처"
                                                                                    name="phone"
                                                                                    ref={this.phoneInput}
                                                                                    defaultValue={this.props.auth.userDetails.phone}
                                                                                    required
                                                                                    onChange={e => validateNickname(e.target.value)}
                                                                                />
                                                                                <div className="btn-group btn-group-sm ml-3">
                                                                                    <button className="btn btn-solid"
                                                                                            type="button"
                                                                                            onClick={this.handleButtonChangePhoneUpdate}>변경
                                                                                    </button>
                                                                                    <button className="btn btn-solid"
                                                                                            onClick={this.handleButtonChangePhoneCancel}>취소
                                                                                    </button>
                                                                                </div>
                                                                            </div> :
                                                                            <div>
                                                                                <span>{this.validInfo(this.props.auth.userDetails.phone) ? this.props.auth.userDetails.phone : '입력한 정보가 없어요'}</span>
                                                                                <span className="ta-info-modify-action" onClick={this.handleButtonChangePhoneEdit}>연락처 변경하기</span>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <h6>대표 배송지</h6>
                                                                    </div>
                                                                    <div className="col-sm-8">
                                                                        <span>{this.state.mainAddress === '' ? '입력한 정보가 없어요' : this.state.mainAddress}</span>
                                                                        <span className="ta-info-modify-action"><Link to="/account/addresses">대표 배송지 변경하기</Link></span>
                                                                    </div>
                                                                </div>
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
    getMemberMe: () => dispatch(Actions.getMemberMe()),

    checkNickname: (nickname) => dispatch(Actions.checkNickname(nickname)),
    updateNickname: (nickname) => dispatch(Actions.updateNickname(nickname)),
    updateRealName: (realName) => dispatch(Actions.updateRealName(realName)),
    updatePhone: (phone) => dispatch(Actions.updatePhone(phone))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account))