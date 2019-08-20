import React from 'react';
import {connect} from 'react-redux';
import {DeliveryBox, OrderBox, PaymentBox} from '../components/checkout';

export function Checkout(){
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
                                <div className="payment_item">
                                    <div className="radion_btn">
                                        <input type="radio" id="f-option5" name="selector"/>
                                        <label htmlFor="f-option5">Check payments</label>
                                        <div className="check"></div>
                                    </div>
                                    <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                                        Store Postcode.</p>
                                </div>
                                <div className="payment_item active">
                                    <div className="radion_btn">
                                        <input type="radio" id="f-option6" name="selector"/>
                                        <label htmlFor="f-option6">Paypal </label>
                                        <img src="img/product/card.jpg" alt=""/>
                                        <div className="check"></div>
                                    </div>
                                    <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                                        account.</p>
                                </div>
                                <div className="creat_account">
                                    <input type="checkbox" id="f-option4" name="selector"/>
                                    <label htmlFor="f-option4">I’ve read and accept the </label>
                                    <a href="#">terms & conditions*</a>
                                </div>
                                <div className="text-center">
                                <a className="button button-paypal" href="#">Proceed to Paypal</a>
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