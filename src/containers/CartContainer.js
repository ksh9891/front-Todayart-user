import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import CartPage from '../components/common/headers/common/cart-header'
import {Actions} from '../actions'
import { ActionTypes } from '../constants/ActionTypes';
import CurrencyFormat from "react-currency-format";

class CartContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cart:props.cart,
            totalPrice:props.cart.totalPrice,
            totalShipping:props.cart.totalShipping,
            symbol:props.symbol
        }

    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.cart!==nextProps.cart){
        return {cart:nextProps.cart,
        totalPrice:nextProps.cart.totalPrice,
        totalShipping:nextProps.cart.totalShipping}
        }
        return null;
        
       }


    shouldComponentUpdate(nextProps, nextState){
        if(this.state.cart!==nextProps.cart){
            return true;
        }
        return false;
    }

    render(){
        const {symbol, cart, totalPrice, totalShipping} = this.state;
        const deleteItemFromCart=(cartId)=>{
            this.props.deleteCartItem(cartId).then((response)=>{
                if(response.type===ActionTypes.DELETE_CART_ITEM_SUCCESS){
                    return this.props.calcCartItem()
                }
            })
        }

        return(
        
        
     <li  className="onhover-div mobile-cart"><div className="cart-qty-cls">{cart.items.length}</div>
        {/* 카트모양 아이콘 */}
        <Link to={`${process.env.PUBLIC_URL}/cart`}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/icon/cart.png`} className="img-fluid" alt=""/>
            <i className="fa fa-shopping-cart" />
        </Link>
        
        <ul className="show-div shopping-cart">
            { cart.items.map((item,index) => (
                <CartPage key={index} item={item} total={item.productPrice*item.quantity} symbol={symbol} deleteCartItem={() => deleteItemFromCart(item.cartId) }  />
            ))}
            {(cart.items.length > 0) ?
                <div>
            <li>
                <div className="total">
                    <h5>상품금액 : <span>{symbol}<CurrencyFormat value={totalPrice} displayType={'text'} thousandSeparator={true} /></span></h5>
                    <h5>배송비 : <span>{symbol}<CurrencyFormat value={totalShipping} displayType={'text'} thousandSeparator={true} /></span></h5>
                </div>
            </li>
            <li>
                <div className="buttons">
                    <Link to={`${process.env.PUBLIC_URL}/cart`} className="view-cart">장바구니 보기</Link>
                    <Link to={`${process.env.PUBLIC_URL}/checkout`} className="checkout">결제</Link>
                </div>
            </li></div>
                    :
            <li><h5>장바구니가 현재 비어있어요!</h5></li>}
        </ul>

    </li>
        )
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cart,
        symbol: '￦'
    }
}

const mapDispatchToProps=(dispatch)=>({
    deleteCartItem:(cartId)=>dispatch(Actions.deleteCartItem(cartId)),
    calcCartItem:()=>dispatch(Actions.calcCartPrice())

})

export default connect(mapStateToProps,mapDispatchToProps)(CartContainer);
