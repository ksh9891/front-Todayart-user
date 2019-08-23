import React, { useEffect } from 'react';
import {Actions} from "../../actions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import "./OrderList.css";
import {Link} from "react-router-dom";
import { Files } from '../../utils';
import Moment from "react-moment";

const OrderList = ({getOrderList, members}) => {
    const { orderList } = members;

    useEffect(() => {
        getOrderList();
    }, []);

    return (
        <div className="order_list">
            {
                orderList.map((order) => {
                    const { orderDetails } = order;
                    return (
                        <div className="order_group" key={order.orderId}>
                            <ul className="order_group_list">
                                {
                                    orderDetails.map((detail) => {
                                        const { product } = detail;
                                        const image = Files.filePath(product.thumbnail.fileName);
                                        return (
                                            <li className="order_group_item" key={detail.orderDetailId}>
                                                <div className="order_item">
                                                    <Link to="#"><img src={image} alt={detail.productName} /></Link>
                                                    <div className="item_info">
                                                        <div>
                                                            <h4 className="name">{detail.productName}</h4>
                                                            <ul className="info">
                                                                <li>
                                                                    <span className="price">{detail.productPrice}원</span>
                                                                </li>
                                                                <li>
                                                                    <span>|</span>
                                                                </li>
                                                                <li>
                                                                <span className="date">
                                                                    <Moment format="YYYY/MM/DD">
                                                                        {order.orderDate}
                                                                    </Moment>
                                                                </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="order_status">
                                                            <span>{detail.status}</span>
                                                        </div>
                                                        <div className="order_message">
                                                            <p>
                                                                구매가 완료되었습니다. 이용해주셔서 감사합니다.<br />
                                                                구매확정 이후 상품의 이용방법, 반품 등에 대한 문의는 판매자에게 문의해주세요
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="artist_info">
                                                    <div className="inner">
                                                        <span>{product.artistName}</span>
                                                        <span>010-1111-1111</span>
                                                        <span><button>문의하기</button></span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    members: state.members
});

const mapDispatchToProps = (dispatch) => ({
    getOrderList: () => dispatch(Actions.getOrderList())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderList));