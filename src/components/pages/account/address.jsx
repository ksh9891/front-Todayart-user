import React, {Component} from 'react';
import Breadcrumb from "../../common/breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Actions} from "../../../actions";
import "./address.css"
import validator from "validator";
import sha256 from 'sha256';
import {ActionTypes} from "../../../constants/ActionTypes";

class Address extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const onAdd = () => {
            this.props.history.push("/account/addresses-add");
        }

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
                                            <li><Link to="/account/password">비밀번호 변경</Link></li>
                                            <li className="active"><Link to="/account/addresses">배송지 관리</Link></li>
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
                                                <h2>배송지 관리</h2>
                                            </div>
                                            <div className="row ta-btn-row">
                                                <div className="col-sm-12">
                                                    <button className="btn btn-sm btn-solid ta-btn-sm" onClick={onAdd}>배송지 추가</button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="table-responsive">
                                                        <table className="table table-responsive-xs">
                                                            <thead>
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>주소</th>
                                                                    <th>우편번호</th>
                                                                    <th>대표 배송지</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {this.props.auth.userDetails.memberAddresses === null || this.props.auth.userDetails.memberAddresses === undefined ?
                                                                <tr>
                                                                    <td colSpan="4" className="ta-address-none">등록된 배송지가 없어요!</td>
                                                                </tr>
                                                                :
                                                                this.props.auth.userDetails.memberAddresses.map((memberAddress, index) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{index+1}</td>
                                                                                <td>{memberAddress.address} {memberAddress.addressDetail}</td>
                                                                                <td>{memberAddress.postalNumber}</td>
                                                                                <td>{memberAddress.mainAddress === "y" ? "O" : "X"}</td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                            }
                                                            </tbody>
                                                        </table>
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

export default withRouter(connect(mapStateToProps, null)(Address))
