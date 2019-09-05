import React, {Component} from 'react';
import Breadcrumb from "../../common/breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Actions} from "../../../actions";
import "./address.css"
import {ActionTypes} from "../../../constants/ActionTypes";

class Address extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addresses: []
        }
    }

    componentDidMount() {
        this.props.getAddress()
            .then(response => {
                if(response.type === ActionTypes.GET_ADDRESS_SUCCESS) {
                    this.setState({
                        ...this.state,
                        addresses: response.payload.data
                    })
                } else {
                    const { error } = response;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                console.log("error >> ", error)
            })
    }

    render() {
        const onAdd = () => {
            this.props.history.push("/account/addresses-add");
        }

        const onChangeMainAddr = (address) => {
            console.log(address);
            if(window.confirm("이 주소를 대표 배송지로 지정할까요?" +
                "\r\n주소 : " + address.address + " " + address.addressDetail +
                "\r\n우편번호 : " + address.postalNumber)) {

                if(address.mainAddress === "y") {
                    alert("이미 대표 배송지로 지정 된 주소입니다.");
                    return false
                }

                this.props.updateMainAddress(address.addressId)
                    .then(response => {
                        if(response.type === ActionTypes.UPDATE_MAIN_ADDRESS_SUCCESS) {
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
                            const { error } = response;
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        console.log("error >> ", error)
                    })
            }
        }

        const onDelete = (address) => {
            if(window.confirm("배송지를 삭제하시겠습니까?")) {
                this.props.deleteAddress(address.addressId)
                    .then(response => {
                        if(response.type === ActionTypes.DELETE_ADDRESS_SUCCESS) {
                            return this.props.getMemberMe()
                                .then(response => {
                                    if(response.type === ActionTypes.GET_USER_SUCCESS) {
                                        alert("삭제되었습니다.");
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
                            const { error } = response;
                            alert("삭제에 실패하였습니다.");
                            return Promise.reject(error);
                        }
                    })
                    .catch(error => {
                        console.log("error >> ", error);
                    })
            }
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
                                                        <table className="table table-responsive-sm ta-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>주소</th>
                                                                    <th>우편번호</th>
                                                                    <th>대표 배송지</th>
                                                                    <th>삭제</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {this.props.auth.userDetails.memberAddresses === null || this.props.auth.userDetails.memberAddresses === undefined ?
                                                                <tr>
                                                                    <td colSpan="5" className="ta-address-none">등록된 배송지가 없어요!</td>
                                                                </tr>
                                                                :
                                                                this.props.auth.userDetails.memberAddresses.map((memberAddress, index) => {
                                                                        return (
                                                                            <tr key={memberAddress.addressId}>
                                                                                <td>{index+1}</td>
                                                                                <td style={{'textAlign': 'left'}}>{memberAddress.address} {memberAddress.addressDetail}</td>
                                                                                <td>{memberAddress.postalNumber}</td>
                                                                                {memberAddress.mainAddress === "y" ? <td>O</td> : <td className="ta-address-pointer" onClick={() => onChangeMainAddr(memberAddress)}>X</td>}
                                                                                <td className="btn-group-sm">
                                                                                    <button className="btn btn-solid" onClick={() => onDelete(memberAddress)}>삭제</button>
                                                                                </td>
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

const mapDispatchToProps = (dispatch) => ({
    getAddress: () => dispatch(Actions.getAddress()),
    updateMainAddress: (addressId) => dispatch(Actions.updateMainAddress(addressId)),
    getMemberMe: () => dispatch(Actions.getMemberMe()),
    deleteAddress: (addressId) => dispatch(Actions.deleteAddress(addressId)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Address))
