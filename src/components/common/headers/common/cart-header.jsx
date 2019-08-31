import React, {Component} from 'react';
import {Link} from 'react-router-dom'

const CartHeader  = ({item, total, symbol, deleteCartItem}) => (
            <li >
                <div className="media">
                    <Link to={{pathname:`${process.env.PUBLIC_URL}/product/${item.product.productId}`,
                            state:{item:item}}}><img alt="" className="mr-3" src={`${item.thumbnail}`} /></Link>
                    <div className="media-body">
                        <Link to={{pathname:`${process.env.PUBLIC_URL}/product/${item.product.productId}`,
                            state:{item:item}}}><h4>{item.product.productName}</h4></Link>
                        <h4><span>{item.quantity} x {symbol} {(item.productPrice)}</span></h4>
                    </div>
                </div>
                {/*<span>{cart}</span>*/}
                <div className="close-circle">
                    <a href={null} onClick={deleteCartItem}><i className="fa fa-times" aria-hidden="true"></i></a>
                </div>
            </li>
        )



export default CartHeader;
