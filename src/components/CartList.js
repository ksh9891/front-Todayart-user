import React from 'react';
import {connect} from 'react-redux';
import './components.css';
import {Actions} from '../actions';

const cartListAsync = () => (dispatch) => {
  return dispatch(Actions.getCart());
}



const CartList=({items, getCart, history})=>{ 
     getCart()
     .then(response=>{
      })
     .catch(error=>{
       console.log('error>> ', error);
      });

    return(
      <tr>
        {items.map((item)=>{
          const {product, productPrice, quantity} = item;
          const {productName} = product;
          return(
            <div className = "cartLine">
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
              </div>
              )
          }
          )
        }
      </tr>
    )
  }
  


const mapStateToProps=(state)=>({
  items:state.cart.items
});
const mapDispatchToProps=(dispatch)=>({
  getCart:()=>dispatch(cartListAsync())
})
export default connect(mapStateToProps,mapDispatchToProps)(CartList);