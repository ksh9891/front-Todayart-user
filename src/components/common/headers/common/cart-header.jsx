import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Files } from '../../../../utils';
import CurrencyFormat from "react-currency-format";


const CartHeader  = ({item, total, symbol, deleteCartItem}) => {
    const { fileName } = item.product.thumbnail;
    const image = Files.filePath(fileName);
    return (
            <li >
                <div className="media">
                    <Link to={{pathname:`${process.env.PUBLIC_URL}/product/${item.product.productId}`,
                            state:{item:item.product}}}>
                                <img src={image} className="mr-3" alt="" style={{"borderRadius":"10px"}}/>
                            </Link>
                    <div className="media-body">
                        <Link to={{pathname:`${process.env.PUBLIC_URL}/product/${item.product.productId}`,
                            state:{item:item.product}}}><h4>{item.product.productName}</h4></Link>
                        <h4><span>{item.quantity} x<CurrencyFormat value={(item.productPrice)} suffix={symbol} displayType={'text'} thousandSeparator={true} /></span></h4>
                    </div>
                </div>
                {/*<span>{cart}</span>*/}
                <div className="close-circle">
                    <a href={null} onClick={deleteCartItem}><i className="fa fa-times" aria-hidden="true"></i></a>
                </div>
            </li>
        )
}


export default CartHeader;
