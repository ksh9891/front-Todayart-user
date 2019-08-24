import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import './components.css';
import {Actions} from '../actions';
import {Link} from "react-router-dom";



const CartList=({cart, getCart, toggleCartItem, deleteCartItem, calcCartPrice})=>{ 
     useEffect(()=>{
       getCart().then(response=>calcCartPrice()).then(response=>null)}, []);

       const {items, totalPrice, totalShipping} = cart;
       
    const toggle=(cartId)=>{
    toggleCartItem(cartId);
    calcCartPrice();
    }

    const deleteItem=(cartId)=>{
      deleteCartItem(cartId);
    }
    
    const [cartIdChecked, setCartIdChecked] = useState(true);
    
    return(
      <table className="table">
        <thead>
          <tr>
             <th scope="col"></th>
             <th scope="col"></th>
              <th scope="col">상품명</th>
              <th scope="col">가격</th>
              <th scope="col">수량</th>
              <th scope="col">금액</th>
  
          </tr>
      </thead>
      <tbody>
        {items.map((item)=>{
          const {cartId, product, productPrice, quantity,shippingFee} = item;
          const {productName} = product;
          console.log("cartIdChecked:", cartIdChecked);
          return(
            <tr key={cartId}>
              <td>
                <input type="checkbox"  name="cartItem" defaultChecked={true} onChange={()=>toggle(cartId)}/>
              </td>
              <td>
                <div className="media">
                  <div className="d-flex">
                    <img src="img/cart/cart1.png" alt=""/>
                  </div>
                  <div className="media-body">
                    <p>썸네일을 올리세요</p>
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
              <td><div>
                <span><h5>{productPrice*quantity}</h5></span>
                <span id="shippingFee">배송료: {shippingFee?shippingFee:0}</span>
                </div>
              </td>
              <td>
              <button type="button" className="btn btn-secondary btn-sm" onClick={()=>deleteItem(cartId)}>삭제</button>
              </td>
              </tr>
              )
          }
          )
        }
  
        <tr>
            <td colSpan="4">
            </td>
            <td>
                <h5>합계</h5>
            </td>
            <td colSpan="2">
                <h5>{totalPrice}</h5>
            </td>
        </tr>
        <tr>
            <td colSpan="4">
            </td>
            <td>
                <h5>배송료</h5>
            </td>
            <td colSpan="2">
                <h5>{totalShipping}</h5>
            </td>
        </tr>
        
        <tr>
            <td colSpan="4">
            </td>
            <td>
                <h5>총 주문액</h5>
            </td>
            <td>
                <h5>{totalPrice+totalShipping}</h5>
            </td>
            <td><Link className="nav-link primary-btn ml-2" to="/checkout">결제하기</Link></td>
        </tr>
        </tbody>
        </table>
      

    )
  }
  


const mapStateToProps=(state)=>({
  cart:state.cart
});


const mapDispatchToProps=(dispatch)=>({
  getCart:()=>dispatch(Actions.getCart()),
  toggleCartItem: (id)=>dispatch(Actions.toggleCartItem(id)),
  deleteCartItem: (id)=>dispatch(Actions.deleteCartItem(id)),
  calcCartPrice: ()=>dispatch(Actions.calcCartPrice())
})

export default connect(mapStateToProps,mapDispatchToProps)(CartList);