import { ActionTypes } from '../constants';

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
                        items: data === undefined ? [] : data.map((item) => ({ ...item, checked: true })),
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
            if(payload!==null && payload!==null){
                const {data} = payload;
                return {
                    ...state,
                    items: items.filter(item=>item.cartId!==data.cartId)
                }
            }
            return state;

        case ActionTypes.LOGOUT:
            return initialStateCart;

        default:
            return state;
    }

}

export default cart;