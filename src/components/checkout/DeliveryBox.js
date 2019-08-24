import React from 'react';
import { connect } from 'react-redux';

const DeliveryBox=()=>{
    return(
        <div className="col-lg-8">
                            <h3>Billing Details</h3>
                            <form className="row contact_form" action="#" method="post" noValidate="novalidate">
                                <div className="col-md-6 form-group p_star">
                                    <input type="text" className="form-control" id="first" name="name"/>
                                    <span className="placeholder" data-placeholder="First name"></span>
                                </div>
                                <div className="col-md-6 form-group p_star">
                                    <input type="text" className="form-control" id="last" name="name"/>
                                    <span className="placeholder" data-placeholder="Last name"></span>
                                </div>
                                <div className="col-md-12 form-group">
                                    <input type="text" className="form-control" id="company" name="company" placeholder="Company name"/>
                                </div>
                                <div className="col-md-6 form-group p_star">
                                    <input type="text" className="form-control" id="number" name="number"/>
                                    <span className="placeholder" data-placeholder="Phone number"></span>
                                </div>
                                <div className="col-md-6 form-group p_star">
                                    <input type="text" className="form-control" id="email" name="compemailany"/>
                                    <span className="placeholder" data-placeholder="Email Address"></span>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <select className="country_select">
                                        <option value="1">Country</option>
                                        <option value="2">Country</option>
                                        <option value="4">Country</option>
                                    </select>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <input type="text" className="form-control" id="add1" name="add1"/>
                                    <span className="placeholder" data-placeholder="Address line 01"></span>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <input type="text" className="form-control" id="add2" name="add2"/>
                                    <span className="placeholder" data-placeholder="Address line 02"></span>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <input type="text" className="form-control" id="city" name="city"/>
                                    <span className="placeholder" data-placeholder="Town/City"></span>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <select className="country_select">
                                        <option value="1">District</option>
                                        <option value="2">District</option>
                                        <option value="4">District</option>
                                    </select>
                                </div>
                                <div className="col-md-12 form-group">
                                    <input type="text" className="form-control" id="zip" name="zip" placeholder="Postcode/ZIP"/>
                                </div>
                                <div className="col-md-12 form-group">
                                    <div className="creat_account">
                                        <input type="checkbox" id="f-option2" name="selector"/>
                                        <label htmlFor="f-option2">Create an account?</label>
                                    </div>
                                </div>
                                <div className="col-md-12 form-group mb-0">
                                    <div className="creat_account">
                                        <h3>Shipping Details</h3>
                                        <input type="checkbox" id="f-option3" name="selector"/>
                                        <label htmlFor="f-option3">Ship to a different address?</label>
                                    </div>
                                    <textarea className="form-control" name="message" id="message" rows="1" placeholder="Order Notes"></textarea>
                                </div>
                            </form>
                        </div>
    )
}



export default connect(null,null)(DeliveryBox);