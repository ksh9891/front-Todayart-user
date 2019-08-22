import React from 'react';
import {connect} from 'react-redux';
import {DeliveryBox, OrderBox, PaymentBox} from '../components/checkout';
import {Actions} from '../actions';
import { ActionTypes } from '../constants';
import { promised } from 'q';


const Checkout=({makeOrder,excuteKakaoPay, cart})=>{
    const {items, totalShipping}=cart;
    let {totalPrice} = cart;
    const orderItems = items
        .filter((item)=>item.checked===true)
        .map((item)=>(item.cartId));


    const tryPaying=()=>{
        const totalPayingPrice=totalPrice+totalShipping;
        makeOrder(orderItems, totalShipping, totalPayingPrice)
        .then(response=>{
            if(response.type===ActionTypes.MAKE_ORDER_SUCCESS){
                excuteKakaoPay(response.payload.data);
            }else{
                Promise.reject(response);
            }})
        .then(()=>{});
        
    }

    return (
        <section className="checkout_area section-margin--small">
            <div className="container">
                {/* <Ordered_Details/> */}
                <div className="billing_details">
                    <div className="row">
                        <DeliveryBox/>
                        <div className="col-lg-4">
                            <div className="order_box">
                                <OrderBox/>
                                <PaymentBox/>
                                <div className="creat_account">
                                    <input type="checkbox" id="f-option4" name="selector"/>
                                    <label htmlFor="f-option4">I’ve read and accept the </label>
                                    <a href="#">terms & conditions*</a>
                                </div>
                                <div className="text-center">
                                <button className="button button-paypal" onClick={()=>tryPaying()}>결제하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps=(state)=>({
    cart:state.cart
})

const mapDispatchToProps=(dispatch)=>({
    makeOrder:(cartIdList, shippingFee, totalPrice)=>dispatch(Actions.makeOrder(cartIdList, shippingFee, totalPrice)),
    excuteKakaoPay:(ordered)=>dispatch(Actions.excuteKakaoPay(ordered))
})
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);