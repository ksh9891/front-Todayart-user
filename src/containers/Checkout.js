import React from 'react';
import {connect} from 'react-redux';
import {DeliveryBox, OrderBox, PaymentBox} from '../components/checkout';

export function Checkout(){
    const tryPaying=()=>{}

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
                                <a className="button button-paypal" onClick={()=>tryPaying}>결제하기</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

//export default Checkout;