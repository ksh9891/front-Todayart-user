import {
    FETCH_SINGLE_PRODUCT,
    CHANGE_CURRENCY,
    RECEIVE_PRODUCTS,
    FETCH_ARTWORK_SUCCESS } from "../constants/ActionTypes";

import { ActionTypes } from "../constants/ActionTypes";


const initialState = {
    products: [],
    symbol: '$',
    product_details: [],
    items: [],
    item: null
};

const productReducer = (state = initialState, action) => {
    const { items } = state;
    const { payload } = action;
    switch (action.type) {
        // case RECEIVE_PRODUCTS:
        //     return { ...state,
        //         products: action.products };
        // case FETCH_SINGLE_PRODUCT:
        //     if (state.products.findIndex(product => product.id === action.productId) !== -1) {
        //         const singleItem = state.products.reduce((itemAcc, product) => {
        //             return product
        //         }, [])
        //         return { ...state,
        //             product_details: singleItem };
        //     }
            case ActionTypes.FETCH_ARTWORK_SUCCESS:
                if (payload !== null && payload !== undefined) {
                    const { data } = payload;
                    if (data !== null && data !== undefined) {
                        console.log("fetchartwork :", data);
                        return {
                            ...state,
                            items: (data === undefined ? [] : data)
                        };
                    }
                }
                return state;


                case ActionTypes.FETCH_SINGLEPRODUCT_SUCCESS:
                    if (payload !== null && payload !== undefined) {
                        const { data } = payload;
                        console.log("fetchsingleproduct :", data);
                        return {
                            ...state,
                            item: data
                        };
                    }
                    return state;

        case CHANGE_CURRENCY:
            return { ...state,
                symbol: action.symbol };
        default:
            return state;
    }
};
export default productReducer;