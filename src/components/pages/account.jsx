import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "./account.css";
import validator from "validator";
import {ActionTypes} from "../../constants/ActionTypes";
import {Actions} from "../../actions";
import FormCheckText from "./formCheckText";

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNicknameEdit: false,
            isRealNameEdit: false,
            isPhoneEdit: false
        }

        this.handleButtonChangeNickname = this.onEdit.bind(this, "nickname");
        this.handleButtonChangeRealName = this.onEdit.bind(this, "realName");
        this.handleButtonChangePhone = this.onEdit.bind(this, "phone");
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

    render (){
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
                                                                        <span>{this.props.auth.userDetails.nickname}</span>
                                                                        {this.state.isNicknameEdit ? "" : <span className="ta-info-modify-action" onClick={this.handleButtonChangeNickname}>닉네임 변경하기</span>}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <h6>이름</h6>
                                                                    </div>
                                                                    <div className="col-sm-8">
                                                                        <span>{this.validInfo(this.props.auth.userDetails.realName) ? this.props.auth.userDetails.realName : '입력한 정보가 없어요'}</span>
                                                                        {this.state.isRealNameEdit ? "" : <span className="ta-info-modify-action" onClick={this.handleButtonChangeRealName}>이름 변경하기</span>}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <h6>연락처</h6>
                                                                    </div>
                                                                    <div className="col-sm-8">
                                                                        <span>{this.validInfo(this.props.auth.userDetails.phone) ? this.props.auth.userDetails.phone : '입력한 정보가 없어요'}</span>
                                                                        {this.state.isPhoneEdit ? "" : <span className="ta-info-modify-action" onClick={this.handleButtonChangePhone}>연락처 변경하기</span>}
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account))