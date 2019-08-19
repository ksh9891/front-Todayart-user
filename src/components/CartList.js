import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import './components.css';
import {Actions} from '../actions';

const cartListAsync = () => (dispatch) => {
  return dispatch(Actions.getCart());
}



const CartList=({items, getCart})=>{ 
    useEffect(()=>getCart(), []);
    let totalPrice = 0;
    
    return(
      <div>
        {items.map((item)=>{
          const {product, productPrice, quantity} = item;
          const {productName} = product;
          totalPrice = totalPrice+(productPrice*quantity);
          return(
            <tr>
              <td>
                <div className="media">
                  <div className="d-flex">
                    <img src="img/cart/cart1.png" alt=""/>
                  </div>
                  <div className="media-body">
                    <p>Minimalistic shop for multipurpose use</p>
                  </div>
                </div>
              </td>
              <td>
                <h5>{productName}</h5>
              </td>
              <td>
                  <h5>{productPrice}</h5>
              </td>
              <td>
                <div className="product_count">
                  <input type="text" name="qty" id="sst" maxLength="12" defaultValue={quantity} title="Quantity:"
                      className="input-text qty"/>
                  <button className="increase items-count" type="button"><i className="lnr lnr-chevron-up"></i></button>
                  <button className="reduced items-count" type="button"><i className="lnr lnr-chevron-down"></i></button>
                </div>
              </td>
              <td>
                <h5>{productPrice*quantity}</h5>
              </td>
              </tr>
              )
          }
          )
        }
        <tr>
            <td colSpan="3">
            </td>
            <td>
                <h5>합계</h5>
            </td>
            <td>
                <h5>{totalPrice}</h5>
            </td>
        </tr>
      </div>
    )
  }
  


const mapStateToProps=(state)=>({
  items:state.cart.items
});


const mapDispatchToProps=(dispatch)=>({
  getCart:()=>dispatch(cartListAsync())
})


export default connect(mapStateToProps,mapDispatchToProps)(CartList);