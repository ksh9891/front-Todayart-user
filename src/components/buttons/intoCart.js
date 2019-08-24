import React from 'react';
import {Actions} from '../../actions';
import {ActionTypes} from '../../constants';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';



const IntoCart = ({quantity, item, addCartAction}) =>{

    const addCart=(quantity,item,history)=>{
        console.log("addCartAction :", addCartAction);
        addCartAction(item, quantity)
        .then(response=>{
                if(response.type===ActionTypes.ADD_CART_SUCCESS){
                    const result = window.confirm("상품이 장바구니에 담겼습니다. 장바구니를 확인하시겠습니까?");
                    if(result===true){
                        window.location.replace("/cart");
                    }
    
            }
        });
    }
    

    return(<div><button type="button" className="button primary-btn" onClick={()=>addCart(quantity, item)}>장바구니에 담기</button></div>)
}

const mapDispatchToProps=(dispatch)=>({
    addCartAction:(item, quantity)=>dispatch(Actions.addCart(item, quantity))
})



export default connect(null, mapDispatchToProps)(IntoCart);