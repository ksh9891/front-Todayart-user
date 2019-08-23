import React,{useState} from 'react';
import {connect} from 'react-redux';
import {DeliveryBox, OrderBox, PaymentBox} from '../components/checkout';
import {Actions} from '../actions';
import { ActionTypes } from '../constants';
import { promised } from 'q';




const Checkout=()=>{


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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default connect(null,null)(Checkout);