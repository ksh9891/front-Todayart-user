import React,{useState} from 'react';
import {connect} from 'react-redux';
import {DeliveryBox, OrderBox, PaymentBox} from '../components/checkout';
import {Actions} from '../actions';
import { ActionTypes } from '../constants';
import { promised } from 'q';




const Checkout=({makeOrder,excuteKakaoPay,approveKakaoPay, cart,order})=>{
    const {items, totalShipping}=cart;
    const {nextUrl, ordered, tid}=order;

    let {totalPrice} = cart;
    const orderItems = items
        .filter((item)=>item.checked===true)
        .map((item)=>(item.cartId));


    const tryPaying=()=>{
        const totalPayingPrice=totalPrice+totalShipping;
        makeOrder(orderItems, totalShipping, totalPayingPrice)
        .then(async(response)=>{
            if(response.type===ActionTypes.MAKE_ORDER_SUCCESS){
                console.log("aaaaa", response)
                return excuteKakaoPay(response.payload.data);
            }else{
                return Promise.reject(response);
            }
        })
        .then((response)=>{
            console.log("response :",response);
            if(response.type===ActionTypes.EXCUTE_KAKAO_PAY_SUCCESS){
                window.open(response.payload.data.next_redirect_pc_url, "카카오 결제", "width=550, height=630");            
            }else{
                return Promise.reject(response);
            }
        })
  /*      .then(response=>{
            if(response!==null&&response!==undefined){
                return approveKakaoPay(response, ordered, tid);
            }else{
                return Promise.reject(response);
            }
        })
        .then((response)=>{
            if(response.type===ActionTypes.APPROVE_KAKAO_PAY_SUCCESS){
                window.close();
                window.location.replace("/test")
            }else{
                window.location.replace("/kakaoSuccessFail")
            }

        })*/
       
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
    order:state.order
})

const mapDispatchToProps=(dispatch)=>({
    makeOrder:(cartIdList, shippingFee, totalPrice)=>dispatch(Actions.makeOrder(cartIdList, shippingFee, totalPrice)),
    excuteKakaoPay:(ordered)=>dispatch(Actions.excuteKakaoPay(ordered)),
    approveKakaoPay:(pgToken, ordered, tid)=>dispatch(Actions.approveKakaoPay(pgToken,ordered,tid))
})
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);