import React from 'react';
import {connect} from 'react-redux';
import {DeliveryBox, OrderBox, PaymentBox} from '../components/checkout';
import {Actions} from '../actions';
import {ActionTypes} from "../constants";
import { promised } from 'q';


const Checkout=({kakaoPayAccess, kakaoPayExcute, cart, kakaoForm})=>{
    const {items, totalShipping}=cart;
    let {totalPrice} = cart;
    const orderItems = items
        .filter((item)=>item.checked===true)
        .map((item)=>(item.cartId));

    console.log("cartIdList : ", orderItems);

    const tryPaying=()=>{
        totalPrice=totalPrice+totalShipping;
        kakaoPayAccess(orderItems, totalShipping, totalPrice)
        .then(response=>{
            if(response.type===ActionTypes.KAKAOPAY_ACCESS_SUCCESS){
                return kakaoPayExcute(kakaoForm);
            }
            else{
                return promised.reject(response);
            }
        });
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
    cart:state.cart,
    kakaoForm:state.order.kakaoForm
})

const mapDispatchToProps=(dispatch)=>({
    kakaoPayAccess:(cartIdList, shippingFee, totalPrice)=>dispatch(Actions.kakaoPayAccess(cartIdList, shippingFee, totalPrice)),
    kakaoPayExcute:(kakaoForm)=>dispatch(Actions.kakaoPayExcute(kakaoForm))
})
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);