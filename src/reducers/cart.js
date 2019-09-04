import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ActionTypes } from '../constants/ActionTypes';

const initialStateCart = {
    items: [],
    totalPrice: 0,
    totalShipping: 0
}


const cart = (state = initialStateCart, action) => {
    const { items} = state;
    const { payload } = action;

    switch (action.type) {
        case ActionTypes.GET_CART_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        items: data === undefined ? [] : data.map((item) => ({ ...item, checked: true }))
                    }
                }
            }

            return state;

        case ActionTypes.TOGGLE_CART_ITEM:
            return {
                ...state,
                items: items.map((item) => {
                    if (action.itemId === item.cartId) {
                        return {
                            ...item, 
                            checked: !item.checked
                        }
                    }
                    return {
                        ...item
                    }
                })
            };

        case ActionTypes.CALC_CART_PRICE:
            return {
                ...state,
                totalPrice: items.reduce((sum, item)=>{
                    if(item.checked===true&&item.productPrice!==undefined&&item.productPrice!==null){
                        return sum+(item.productPrice*item.quantity);
                    }
                    return sum;
                    },0),

                    totalShipping : items.reduce((sum, item)=>{
                    if(item.checked===true&&item.shippingFee!==undefined&&item.shippingFee!==null){
                        return sum+(item.shippingFee);
                    }
                    return sum;
                    },0)
            }
            
        case ActionTypes.DELETE_CART_ITEM_SUCCESS:
                toast.error("작품이 장바구니에서 삭제되었습니다");
            if(payload!==null && payload!==undefined){
                const {data} = payload;
                return {
                    ...state,
                    items: items.filter(item=>item.cartId!==data.cartId)
                }
            }
            return state;
        
        case ActionTypes.ADD_CART_SUCCESS:

            toast.error("상품이 장바구니에 추가되었습니다");       
   

            if(payload!==null&&payload!==undefined){
                let {data} = payload;
                data = {...data, checked:true};
                const refreashCartItem=(items, data)=>{
                    if(items.every((item)=>item.cartId!==data.cartId)){
                        items.push(data);
                        return items;
                    }else{
                        return(
                    items.map((item)=>{
                        if(item.cartId===data.cartId){
                            return {...data}
                        }
                        else {
                            return{...item, checked:true}
                        }
                    }))
                }}
                return{
                    ...state,
                    items:refreashCartItem(items, data)
                }
            }
            return state;


            case ActionTypes.ADDCART_FROMWISHLIST_SUCCESS:
                if(payload!==null&&payload!==undefined){
                    let {data} = payload;
                    data = {...data, checked:true};
                    const refreashCartItem=(items, data)=>{
                        if(items.every((item)=>item.cartId!==data.cartId)){
                            items.push(data);
                            return items;
                        }else{
                            return(
                        items.map((item)=>{
                            if(item.cartId===data.cartId){
                                return {...data}
                            }
                            else {
                                return{...item, checked:true}
                            }
                        }))
                    }}
                    return{
                        ...state,
                        items:refreashCartItem(items, data)
                    }
                }
                return state;

         case ActionTypes.SNAP_ONE_ITEM:
             return {...state, items:items.map((item, index)=>{
                 if(index===items.length-1){
                     return {...item, checked:true}
                 }else{
                     return {...item, checked:false}
                 }
             })}

        


            
        
                
        case ActionTypes.LOGOUT:
            return initialStateCart;

        case ActionTypes.GET_CART_FAIL:
        case ActionTypes.DELETE_CART_ITEM_FAIL:
        case ActionTypes.ADD_CART_FAIL:
        default:
            return state;
    }

}

export default cart;