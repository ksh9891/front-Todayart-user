import React from 'react';
import { connect } from 'react-redux';

const PaymentBox=()=>{
    return(
        <div>
            <div className="payment_item">
                <div className="radion_btn">
                    <input type="radio" id="f-option5" name="selector"/>
                    <label htmlFor="f-option5">카카오페이 결제</label>
                <div className="check"></div>
                </div>
                <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                    Store Postcode.</p>
            </div>
            <div className="payment_item active">
                <div className="radion_btn">
                    <input type="radio" id="f-option6" name="selector"/>
                    <label htmlFor="f-option6">신용카드 결제 </label>
                    <img src="img/product/card.jpg" alt=""/>
                    <div className="check"></div>
                </div>
                    <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                        account.</p>
                </div>
        </div>
        );
}



export default connect(null,null)(PaymentBox);