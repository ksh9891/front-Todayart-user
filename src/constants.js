export const ActionTypes = {
    GET_TOKEN: 'GET_TOKEN',
    GET_TOKEN_FAIL: 'GET_TOKEN_FAIL',
    GET_TOKEN_SUCCESS: 'GET_TOKEN_SUCCESS',

    REFRESH_TOKEN: 'REFRESH_TOKEN',
    REFRESH_TOKEN_FAIL: 'REFRESH_TOKEN_FAIL',
    REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS',

    REGISTER: 'REGISTER',
    REGISTER_FAIL: 'REGISTER_FAIL',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',

    LOGIN: 'LOGIN',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',

    LOGOUT: 'LOGOUT',

    GET_USER: 'GET_USER',
    GET_USER_FAIL: 'GET_USER_FAIL',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',

    GET_CART: 'GET_CART',
    GET_CART_FAIL: 'GET_CART_FAIL',
    GET_CART_SUCCESS: 'GET_CART_SUCCESS',
    
    FETCH_ARTWORK: 'FETCH_ARTWORK',
    FETCH_ARTWORK_FAIL: 'FETCH_ARTWORK_FAIL',
    FETCH_ARTWORK_SUCCESS: 'FETCH_ARTWORK_SUCCESS',


    FETCH_SINGLEPRODUCT: 'FETCH_SINGLEPRODUCT',
    FETCH_SINGLEPRODUCT_FAIL: 'FETCH_SINGLEPRODUCT_FAIL',
    FETCH_SINGLEPRODUCT_SUCCESS: 'FETCH_SINGLEPRODUCT_SUCCESS',

    FETCH_BYPRODUCTNAME: 'FETCH_BYPRODUCTNAME',
    FETCH_BYPRODUCTNAME_FAIL: 'FETCH_BYPRODUCTNAME_FAIL',
    FETCH_BYPRODUCTNAME_SUCCESS: 'FETCH_BYPRODUCTNAME_SUCCESS',

    FETCH_BYARTISTNAME: 'FETCH_BYARTISTNAME',
    FETCH_BYARTISTNAME_FAIL: 'FETCH_BYARTISTNAME_FAIL',
    FETCH_BYARTISTNAME_SUCCESS: 'FETCH_BYARTISTNAME_SUCCESS',


    FETCH_PRICEASC: 'FETCH_PRICEASC',
    FETCH_PRICEASC_FAIL: 'FETCH_PRICEASC_FAIL',
    FETCH_PRICEASC_SUCCESS: 'FETCH_PRICEASC_SUCCESS',

    FETCH_PRICEDESC: 'FETCH_PRICEDESC',
    FETCH_PRICEDESC_FAIL: 'FETCH_PRICEDESC_FAIL',
    FETCH_PRICEDESC_SUCCESS: 'FETCH_PRICEDESC_SUCCESS',


    FETCH_CATEGORY: 'FETCH_CATEGORY',
    FETCH_CATEGORY_FAIL: 'FETCH_CATEGORY_FAIL',
    FETCH_CATEGORY_SUCCESS: 'FETCH_CATEGORY_SUCCESS',

    FETCH_CATEGORYASC: 'FETCH_CATEGORYASC',
    FETCH_CATEGORYASC_FAIL: 'FETCH_CATEGORYASC_FAIL',
    FETCH_CATEGORYASC_SUCCESS: 'FETCH_CATEGORYASC_SUCCESS',

    FETCH_CATEGORYDESC: 'FETCH_CATEGORYDESC',
    FETCH_CATEGORYDESC_FAIL: 'FETCH_CATEGORYDESC_FAIL',
    FETCH_CATEGORYDESC_SUCCESS: 'FETCH_CATEGORYDESC_SUCCESS',



    TOGGLE_CART_ITEM: 'TOGGLE_CART_ITEM',
    CALC_CART_PRICE: 'CALC_CART_PRICE',
    
    DELETE_CART_ITEM: 'DELETE_CART_ITEM',
    DELETE_CART_ITEM_FAIL: 'DELETE_CART_ITEM_FAIL',
    DELETE_CART_ITEM_SUCCESS: 'DELETE_CART_ITEM_SUCCESS',


    ARTICLELIST: 'ARTICLELIST',
    ARTICLELIST_FAIL: 'ARTICLELIST_FAIL',
    ARTICLELIST_SUCCESS: 'ARTICLELIST_SUCCESS',

    ARTICLEDETAIL: 'ARTICLEDETAIL',
    ARTICLEDETAIL_FAIL: 'ARTICLEDETAIL_FAIL',
    ARTICLEDETAIL_SUCCESS: 'ARTICLEDETAIL_SUCCESS',

 
    MAKE_ORDER:'MAKE_ORDER',
    MAKE_ORDER_FAIL:'MAKE_ORDER_FAIL',
    MAKE_ORDER_SUCCESS: 'MAKE_ORDER_SUCCESS',
    
    EXCUTE_KAKAO_PAY:'EXCUTE_KAKAO_PAY',
    EXCUTE_KAKAO_PAY_FAIL:'EXCUTE_KAKAO_PAY_FAIL',
    EXCUTE_KAKAO_PAY_SUCCESS:'EXCUTE_KAKAO_PAY_SUCCESS',

    APPROVE_KAKAO_PAY:'APPROVE_KAKAO_PAY',
    APPROVE_KAKAO_PAY_FAIL:'APPROVE_KAKAO_PAY_FAIL',
    APPROVE_KAKAO_PAY_SUCCESS:'APPROVE_KAKAO_PAY_SUCCESS',
    

    DUPLICATION_CHECK_EMAIL: 'DUPLICATION_CHECK_EMAIL',
    DUPLICATION_CHECK_EMAIL_FAIL: 'DUPLICATION_CHECK_EMAIL_FAIL',
    DUPLICATION_CHECK_EMAIL_SUCCESS: 'DUPLICATION_CHECK_EMAIL_SUCCESS',

    DUPLICATION_CHECK_NICKNAME: 'DUPLICATION_CHECK_NICKNAME',
    DUPLICATION_CHECK_NICKNAME_FAIL: 'DUPLICATION_CHECK_NICKNAME_FAIL',
    DUPLICATION_CHECK_NICKNAME_SUCCESS: 'DUPLICATION_CHECK_NICKNAME_SUCCESS'

};

export const Errors = {
    UnknownError: "Unknown error!"
};