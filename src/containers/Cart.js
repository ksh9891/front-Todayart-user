import React from 'react';
import {CartList} from '../components';
import {Link} from "react-router-dom";
import './Cart.css';



const Cart=()=>{

    return(
        <div>
      <section className="cart_area">
        <div className="container">
            <div className="cart_inner">
                <div className="table-responsive">
                    <CartList/>
                    <div>
                        <table className="table">
                            <tbody>
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
                                <Link className="nav-link primary-btn ml-2" to="/checkout">결제하기</Link>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
  </section>
  </div>
    );
}


export default Cart;