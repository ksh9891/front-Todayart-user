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
                                        <a className="primary-btn ml-2" href="/checkout">결제하기</a>
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