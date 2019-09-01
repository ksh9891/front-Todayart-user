import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'


import Breadcrumb from '../common/breadcrumb';
import {addToCartAndRemoveWishlist, removeFromWishlist} from '../../actions'

class wishList extends Component {
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render (){
        const {Items, symbol} = this.props;

        return (
            <div>
                <Breadcrumb title={'마이페이지'} />
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
                                            <li><Link to="/account/orders">주문 관리</Link></li>
                                            <li className="active"><Link to="/wishlist">찜목록 관리</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {Items.length>0 ?
                            <div className="col-lg-9">
                                <table className="table cart-table table-responsive-xs">
                                    <thead>
                                    <tr className="table-head">
                                        <th scope="col">작품 이미지</th>
                                        <th scope="col">작품명</th>
                                        <th scope="col">가격</th>
                                        <th scope="col">재고 여부</th>
                                        <th scope="col">액션</th>
                                    </tr>
                                    </thead>
                                    {Items.map((item, index) => {
                                        return (
                                            <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.id}`}>
                                                        <img src={item.variants?
                                                                    item.variants[0].images
                                                                    :item.pictures[0]} alt="" />
                                                    </Link>
                                                </td>
                                                <td><Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.id}`}>{item.name}</Link>
                                                    <div className="mobile-cart-content row">
                                                        <div className="col-xs-3">
                                                            <p>in stock</p>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">{symbol}{item.price-(item.price*item.discount/100)}
                                                            <del><span className="money">{symbol}{item.price}</span></del></h2>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">
                                                                <a href="javascript:void(0)" className="icon" onClick={() => this.props.removeFromWishlist(item)}>
                                                                    <i className="fa fa-times" />
                                                                </a>
                                                                <a href="javascript:void(0)" className="cart" onClick={() => this.props.addToCartAndRemoveWishlist(item, 1)}>
                                                                    <i className="fa fa-shopping-cart" />
                                                                </a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><h2>{symbol}{item.price-(item.price*item.discount/100)}
                                                     <del><span className="money">{symbol}{item.price}</span></del></h2></td>
                                                <td >
                                                    <p>in stock</p>
                                                </td>
                                                <td>
                                                    <a href="javascript:void(0)" className="icon" onClick={() => this.props.removeFromWishlist(item)}>
                                                        <i className="fa fa-times" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="cart" onClick={() => this.props.addToCartAndRemoveWishlist(item, 1)}>
                                                        <i className="fa fa-shopping-cart" />
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody> )
                                    })}
                                </table>
                                <div className="row wishlist-buttons">
                                <div className="col-12">
                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">continue shopping</Link>
                                    <Link to={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid">check out</Link>
                                </div>
                            </div>
                            </div>    
                :
                <div className="col-lg-9">
                    <div >
                        <div className="col-sm-12 empty-cart-cls text-center">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/empty-wishlist.png`} className="img-fluid mb-4" alt="" />
                            <h3>
                                <strong>위시리스트가 비어있습니다.</strong>
                            </h3>
                            <h4>다양한 작품을 감상하시고 위시리스트에 넣어보세요!</h4>
                        </div>
                    </div>
                </div>
                }
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    Items: state.wishlist.list,
    symbol: state.data.symbol,
})

export default connect(mapStateToProps, {addToCartAndRemoveWishlist, removeFromWishlist})(wishList)