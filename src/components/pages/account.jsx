import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "./account.css";

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false
        }
    }

    validInfo = (info) => {
        if(info === null || info === undefined) {
            return "입력 한 정보가 없습니다"
        } else {
            return info;
        }
    }

    accountEdit = () => {
        this.setState({
            ...this.state,
            isEdit: true
        });
    };

    editBox = () => {
        switch(this.state.isEdit) {
            case true:
                return "box-editing";
            case false:
                return "";
            default:
                return "";
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
                                                    <div className={`box ${this.editBox()}`}>
                                                        <div className="box-title">
                                                            <h3>계정정보</h3>
                                                            <a onClick={this.accountEdit}>편집</a>
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
                                                                    {/*<span><Link to="/">비밀번호 변경하기</Link></span>*/}
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <h6>닉네임</h6>
                                                                </div>
                                                                <div className="col-sm-8">
                                                                    <span>{this.props.auth.userDetails.nickname}</span>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <h6>이름</h6>
                                                                </div>
                                                                <div className="col-sm-8">
                                                                    <span>{this.validInfo(this.props.auth.userDetails.realName)}</span>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <h6>연락처</h6>
                                                                </div>
                                                                <div className="col-sm-8">
                                                                    <span>{this.validInfo(this.props.auth.userDetails.phone)}</span>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <h6>대표 배송지</h6>
                                                                </div>
                                                                <div className="col-sm-8">
                                                                    <span>{this.validInfo(this.props.auth.userDetails.phone)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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

export default withRouter(connect(mapStateToProps, null)(Account))