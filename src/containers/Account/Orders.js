import React, { useEffect } from 'react';
import {withRouter} from "react-router";
import "./Orders.css"
import { OrderList } from "../../components";

const Orders = () => {
    return (
        <div>
            <section className="section-intro">
                <div className="container">
                    <div className="account_orders_inner">
                        <div className="shipping_box">
                            <div className="shipping_area">
                                <ul>
                                    <li>
                                        <div>
                                            <p>결제 완료</p>
                                            <p><i className="ti-credit-card" /> 1</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p>배송 준비 중</p>
                                            <p><i className="ti-palette" /> 1</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p>배송 중</p>
                                            <p><i className="ti-truck" /> 1</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p>배송 완료</p>
                                            <p><i className="ti-package" /> 39</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p>반품/취소</p>
                                            <p><i className="ti-back-left" /> 0</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="search_box">
                                <input /> ~ <input />
                                <select name="" id="">
                                    <option value="">전체상태</option>
                                </select>
                                <button>조회</button>
                            </div>
                        </div>
                    </div>
                    <div className="account_orders_inner">
                        <OrderList />
                    </div>
                </div>
            </section>
        </div>
    )
};

export default withRouter(Orders);