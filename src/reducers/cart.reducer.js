import { ActionTypes } from '../constants';

const initialStateCart = {
    items: []
}


const cart = (state = initialStateCart, action) => {
    const { items, checkedItems } = state;
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