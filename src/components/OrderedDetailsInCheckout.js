import React from 'react';
import {connect} from 'react-redux'

const OrderedDetailsInCheckout=({items})=>{
return(
    <div>
        <h2>Your Order</h2>
            <ul className="list">
                <li><a href="#"><h4>Product <span>Total</span></h4></a></li>
                <li><a href="#">Fresh Blackberry <span className="middle">x 02</span> <span className="last">$720.00</span></a></li>
                <li><a href="#">Fresh Tomatoes <span className="middle">x 02</span> <span className="last">$720.00</span></a></li>
                <li><a href="#">Fresh Brocoli <span className="middle">x 02</span> <span className="last">$720.00</span></a></li>
            </ul>
            <ul className="list list_2">
                <li><a href="#">Subtotal <span>$2160.00</span></a></li>
                <li><a href="#">Shipping <span>Flat rate: $50.00</span></a></li>
                <li><a href="#">Total <span>$2210.00</span></a></li>
            </ul>
    </div>
);
}

const OrderedD


const mapStateToProps=(state)=>({
 items : state.cart.items
});

export default connect(mapStateToProps, null)(OrderedDetailsInCheckout);