import {
    ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST
} from "../constants/ActionTypes";

import { ActionTypes } from '../constants/ActionTypes';

const initialStateWishlist = {
    items: []
}


export default function wishlistReducer(state = initialStateWishlist, action) {
    const { items } = state;
    const { payload } = action;


    switch (action.type) {
        case ADD_TO_WISHLIST:
            const productId = action.product.id
            if (state.list.findIndex(product => product.id === productId) !== -1) {
                const list = state.list.reduce((cartAcc, product) => {
                    if (product.id === productId) {
                        cartAcc.push({ ...product })
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, list }
            }

            return { ...state, list: [...state.list, action.product] }

        case REMOVE_FROM_WISHLIST:
            return {
                list: state.list.filter(id => id !== action.product_id)
            }



        case ActionTypes.ADD_WISHLIST_SUCCESS:
            if (payload !== null && payload !== undefined) {
                const { data } = payload;

                return {
                    ...state,
                    items: [
                        ...items, data
                    ]
                }
            }
            return state;



        case ActionTypes.FETCH_WISHLIST_SUCCESS: {
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        items: data === undefined ? [] : data
                    }
                }
            }
        }
            return state;

        case ActionTypes.REMOVE_WISHILIST_SUCCESS:
            if (payload !== null && payload !== undefined) {
                const { data } = payload;
                return {
                    ...state,
                    items: items.filter(item => item.wishlistId !== data.wishlistId)
                }
            }
            return state;

        case ActionTypes.ADDCART_FROMWISHLIST_SUCCESS:
            if (payload !== null && payload !== undefined) {
                const { data } = payload;
                return {
                    ...state,
                    items: items.filter(item => item.wishlistId !== data.wishlistId)
                }
            }
            return state;




        case ActionTypes.LOGOUT:
            return initialStateWishlist;

        default:

    }
    return state;
}
