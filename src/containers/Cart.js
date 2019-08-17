import React from 'react';
import {connect} from 'react-redux';
import {CartList} from '../components';
import {Actions} from '../actions';
import './Cart.css';



const Cart=()=>{


    return(
      <section className="cart_area">
        <div className="container">
            <div className="cart_inner">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">상품명</th>
                                <th scope="col">가격</th>
                                <th scope="col">수량</th>
                                <th scope="col">금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CartList/>
                            <tr>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>
                                    <h5>Subtotal</h5>
                                </td>
                                <td>
                                    <h5>$2160.00</h5>
                                </td>
                            </tr>
                            <tr className="shipping_area">
                                <td className="d-none d-md-block">

                                </td>
                                <td>

                                </td>
                                <td>
                                    <h5>Shipping</h5>
                                </td>
                                <td>
                                    <div className="shipping_box">
                                        <ul className="list">
                                            <li><a href="#">Flat Rate: $5.00</a></li>
                                            <li><a href="#">Free Shipping</a></li>
                                            <li><a href="#">Flat Rate: $10.00</a></li>
                                            <li className="active"><a href="#">Local Delivery: $2.00</a></li>
                                        </ul>
                                        <h6>Calculate Shipping <i className="fa fa-caret-down" aria-hidden="true"></i></h6>
                                        <select className="shipping_select">
                                            <option value="1">Bangladesh</option>
                                            <option value="2">India</option>
                                            <option value="4">Pakistan</option>
                                        </select>
                                        <select className="shipping_select">
                                            <option value="1">Select a State</option>
                                            <option value="2">Select a State</option>
                                            <option value="4">Select a State</option>
                                        </select>
                                        <input type="text" placeholder="Postcode/Zipcode"/>
                                        <a className="gray_btn" href="#">Update Details</a>
                                    </div>
                                </td>
                            </tr>
                            <tr className="out_button_area">
                                <td className="d-none-l">

                                </td>
                                <td className="">

                                </td>
                                <td>

                                </td>
                                <td>
                                    <div className="checkout_btn_inner d-flex align-items-center">
                                        <a className="gray_btn" href="#">Continue Shopping</a>
                                        <a className="primary-btn ml-2" href="#">Proceed to checkout</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  </section>
    );
}


export default connect(null,null)(Cart);