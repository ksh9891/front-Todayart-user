import React from 'react';
import { connect } from 'react-redux';

const OrderBox=({cart})=>{
    const {items, totalPrice, totalShipping}=cart;
    const orderItems = items.filter((item)=>item.checked===true);

    return(
        <div>
        <h2>Your Order</h2>
        <ul className="list">
            <li><a href="#"><h4>Product <span>Total</span></h4></a></li>
            {orderItems.map((item)=>{
                const {cartId, product, productPrice, quantity} = item;
                const {productName}=product;
                return(
                    <li key={cartId}><a href="#">{productName}<span className="middle">x {quantity}</span> <span className="last">￦{productPrice*quantity}</span></a></li>);
            })
            }
        </ul>
        <ul className="list list_2">
            <li><a href="#">상품합계 <span>￦{totalPrice}</span></a></li>
            <li><a href="#">배송비 합계 <span>￦{totalShipping}</span></a></li>
            <li><a href="#">총 결제금액 <span>￦{totalPrice+totalShipping}</span></a></li>
        </ul>
        </div>
    )
}


const mapStateToProps=(state)=>({
    cart:state.cart
})

export default connect(mapStateToProps,null)(OrderBox);