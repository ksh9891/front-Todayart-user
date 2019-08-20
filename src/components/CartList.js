import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import './components.css';
import {Actions} from '../actions';


const CartList=({items, getCart, toggleCartItem, deleteCartItem})=>{ 
     useEffect(()=>{
       getCart().then(response=>null)}, []);

      // const [totalPrice, setTotalPrice] = useState(initTotalPrice);



    let totalPrice = items.reduce((sum, item)=>{
      if(item.checked===true){
        return sum+(item.productPrice*item.quantity);
      }
      return sum;
    },0);
    
  


    const toggle=(cartId)=>{
    toggleCartItem(cartId);
    }

    const deleteItem=(cartId)=>{
      deleteCartItem(cartId);
    }
    


    //  console.log("before", value);

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
          const {cartId, product, productPrice, quantity} = item;
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
              <td>
                <h5>{productPrice*quantity}</h5>
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
            <td>
                <h5>{totalPrice}</h5>
            </td>
        </tr>
        </tbody>
        </table>
      

    )
  }
  


const mapStateToProps=(state)=>({
  items:state.cart.items
});


const mapDispatchToProps=(dispatch)=>({
  getCart:()=>dispatch(Actions.getCart()),
  toggleCartItem: (id)=>dispatch(Actions.toggleCartItem(id)),
  deleteCartItem: (id)=>dispatch(Actions.deleteCartItem(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(CartList);