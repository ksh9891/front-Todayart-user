import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Breadcrumb from "../../common/breadcrumb";


class Orders extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
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
                                            <li><Link to="/account/addresses">배송지 관리</Link></li>
                                            <li className="active"><Link to="/account/orders">주문 관리</Link></li>
                                            <li><Link to="/wishlist">찜목록 관리</Link></li>
                                        </ul>
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

export default withRouter(Orders)