import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import CartPage from '../components/common/headers/common/cart-header'
import {Actions} from '../actions'

const CartContainer = ({cart, total, shipping, symbol, deleteCartItem}) => (
     <li  className="onhover-div mobile-cart"><div className="cart-qty-cls">{cart.items.length}</div>
        {/* 카트모양 아이콘 */}
        <Link to={`${process.env.PUBLIC_URL}/cart`}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/icon/cart.png`} className="img-fluid" alt=""/>
            <i className="fa fa-shopping-cart" />
        </Link>
        
        <ul className="show-div shopping-cart">
            { cart.items.map((item,index) => (
                <CartPage key={index} item={item} total={item.productPrice*item.quantity} symbol={symbol} deleteCartItem={() => deleteCartItem(item.cartId)}  />
            ))}
            {(cart.items.length > 0) ?
                <div>
            <li>
                <div className="total">
                    <h5>subtotal : <span>{symbol}{total}</span></h5>
                    <h5>shippingFee : <span>{symbol}{shipping}</span></h5>
                </div>
            </li>
            <li>
                <div className="buttons">
                    <Link to={`${process.env.PUBLIC_URL}/cart`} className="view-cart">view cart</Link>
                    <Link to={`${process.env.PUBLIC_URL}/checkout`} className="checkout">checkout</Link>
                </div>
            </li></div>
                    :
            <li><h5>장바구니가 현재 비어있어요!</h5></li>}
        </ul>

    </li>
)


function mapStateToProps(state) {
    return {
        cart: state.cart,
        total: state.cart.totalPrice,
        shipping: state.cart.totalShipping,
        symbol: state.data.symbol,
    }
}

export default connect(mapStateToProps, (dispatch)=>({deleteCartItem:(cartId)=>dispatch(Actions.deleteCartItem(cartId))}))(CartContainer);
