import shop from '../api/shop'
import * as types from '../constants/ActionTypes'
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {ActionTypes} from "../constants/ActionTypes";

export const fetchProductsBegin = () => ({
    type: types.FETCH_PRODUCTS_BEGIN
});

export const receiveProducts = products => ({
    type: types.RECEIVE_PRODUCTS,
    products
})

export const getAllProducts = () => dispatch => {
    dispatch(fetchProductsBegin());
    shop.getProducts(products => {
        dispatch(receiveProducts(products));
        return products;
    })
}

export const fetchSingleProduct = productId => ({
    type: types.FETCH_SINGLE_PRODUCT,
    productId
})

export const addToCartAndRemoveWishlist = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty));
    dispatch(removeFromWishlist(product));
}
export const addToCartUnsafe = (product, qty) => {
    console.log("addToCartItem : ", product);
    return{
    type:ActionTypes.ADD_CART,
    payload:{
        request:{
            method:'POST',
            url:'/cart',
            data:{product:product, quantity:qty}
        }
    }
}};

export const removeFromCart = product_id => (dispatch) => {
    toast.error("Item Removed from Cart");
    dispatch({
        type: types.REMOVE_FROM_CART,
        product_id
    })
};
export const incrementQty = (product,qty) => (dispatch) => {
    // toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty))

}
export const decrementQty = productId => (dispatch) => {
    // toast.warn("Item Decrement Qty to Cart");

    dispatch({
    type: types.DECREMENT_QTY,
    productId})
};



//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product) => (dispatch) => {
    toast.success("Item Added to Wishlist");
    dispatch(addToWishlistUnsafe(product))

}
export const addToWishlistUnsafe = (product) => ({
    type: types.ADD_TO_WISHLIST,
    product
});
export const removeFromWishlist = product_id => (dispatch) => {
    toast.error("Item Removed from Wishlist");
    dispatch({
        type: types.REMOVE_FROM_WISHLIST,
        product_id
    })
};


//Compare Products
export const addToCompare = (product) => (dispatch) => {
    toast.success("Item Added to Compare");
    dispatch(addToCompareUnsafe(product))

}
export const addToCompareUnsafe= (product) => ({
    type: types.ADD_TO_COMPARE,
    product
});
export const removeFromCompare = product_id => ({
    type: types.REMOVE_FROM_COMPARE,
    product_id
});


// Filters
export const filterBrand = (brand) => ({
    type: types.FILTER_BRAND,
    brand
});
export const filterColor = (color) => ({
    type: types.FILTER_COLOR,
    color
});
export const filterPrice = (value) => ({
    type: types.FILTER_PRICE,
    value
});
export const filterSort = (sort_by) => ({
    type: types.SORT_BY,
    sort_by
});


// Currency
export const changeCurrency = (symbol) => ({
    type: types.CHANGE_CURRENCY,
    symbol
});


const getClientToken = () => {
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials');

    return ({
        type: ActionTypes.GET_TOKEN,
        payload: {
            request: {
                method: 'POST',
                url: '/oauth/token',
                data: formData
            }
        }
    });
};

const login = (email, password) => {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', email);
    formData.append('password', password);

    return ({
        type: ActionTypes.LOGIN,
        payload: {
            request: {
                method: 'POST',
                url: '/oauth/token',
                data: formData
            }
        }
    });
};

const logout = () => ({
    type: ActionTypes.LOGOUT
});

const getMemberMe = () => {
    return ({
        type: ActionTypes.GET_USER,
        payload: {
            request: {
                method: 'GET',
                url: '/members/me'
            }
        }
    });
};

const refreshToken = (refresh_token) => {
    const formData = new FormData();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refresh_token);

    return ({
        type: ActionTypes.REFRESH_TOKEN,
        payload: {
            request: {
                method: 'POST',
                url: '/oauth/token',
                data: formData
            }
        }
    });
};

const getCart = () =>{
    return(
        {
            type: ActionTypes.GET_CART,
            payload: {
                request:{
                    method: 'GET',
                    url: '/cart'
                }
            }
        })
}

const checkEmail = email => {
    return ({
        type: ActionTypes.DUPLICATION_CHECK_EMAIL,
        payload: {
            request: {
                method: 'GET',
                url: '/members/checkEmail?email=' + email,
                headers: {
                    'Content-Type': 'charset: utf-8',
                    'Accept': 'Application/json'
                }
            }
        },
    });
};

const checkNickname = nickname => {
    return ({
        type: ActionTypes.DUPLICATION_CHECK_NICKNAME,
        payload: {
            request: {
                method: 'GET',
                url: '/members/checkNickname?nickname=' + nickname,
                headers: {
                    'Content-Type': 'charset: utf-8',
                    'Accept': 'Application/json'
                }
            }
        },
    });
};

const register = ({ email, nickname, password }) => {
    return ({
        type: ActionTypes.REGISTER,
        payload: {
            request: {
                method: 'POST',
                url: '/members',
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                },
                data: JSON.stringify({ email, nickname, password })
            }
        }
    });
};

const toggleCartItem = (cartItemId) =>{
    return({
        type:ActionTypes.TOGGLE_CART_ITEM,
        itemId:cartItemId
    })
}

const deleteCartItem  =(cartItemId) =>{
    return({
        type:ActionTypes.DELETE_CART_ITEM,
        payload:{
            request:{
                method: 'DELETE',
                url: `/cart/${cartItemId}`
            }
        }
    })
}

const calcCartPrice = () =>{
    return({
        type:ActionTypes.CALC_CART_PRICE
    })

}

const makeOrder = (cartIdList, shippingFee, totalPayingPrice) =>{
    return({
            type:ActionTypes.MAKE_ORDER,
            payload:{
                request:{
                    method: 'POST',
                    url: '/orders',
                    data: {cartIdList:cartIdList, shippingFee:shippingFee, totalPrice:totalPayingPrice, payment:{payMethod:"카카오페이", totalPrice:totalPayingPrice}}
                }
            }
        }
    )
}

const excuteKakaoPay = (ordered) =>{
    return ({
        type:ActionTypes.EXCUTE_KAKAO_PAY,
        payload:{
            request:{
                method:'POST',
                url:'/kakaoPay',
                data:ordered
            }

        }
    })
}

const approveKakaoPay = (pgToken, ordered, tid)=>{
    window.opener.console.log("approveKakaoPay's ordered ", ordered);
    window.opener.console.log("approveKakaoPay's tid", tid);
    return ({
        type:ActionTypes.APPROVE_KAKAO_PAY,
        payload:{
            request:{
                method:'POST',
                url:`/kakaoPaySuccess?${pgToken}&tid=${tid}`,
                data:ordered,
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                }
            }
        }
    })
}

const fetchArtwork = () => {
    return ({
        type: ActionTypes.FETCH_ARTWORK,
        payload: {
            request: {
                method: 'GET',
                url: `/product`
            }
        }

    })
}


const fetchSingleProduct2 = (id) => {
    console.log("productId = " + id)
    return ({
        type: ActionTypes.FETCH_SINGLEPRODUCT,
        payload: {
            request: {
                method: 'GET',
                url: `/product/detail/${id}`
            }
        }
    })
}

const fetchProductBySearch = (searchword) => {
    console.log("productName = " + searchword)
    return ({
        type: ActionTypes.FETCH_BYSEARCH,
        payload: {
            request: {
                method: 'GET',
                url: `/product/search?search=${searchword}`
            }
        }
    })
}


const fetchProductByArtist = (searchword) => {
    console.log("productName = " + searchword)
    return ({
        type: ActionTypes.FETCH_BYARTISTNAME,
        payload: {
            request: {
                method: 'GET',
                url: `/product/artistname/?name=${searchword}`
            }
        }
    })
}


const fetchPriceAsc = () => {
    return ({
        type: ActionTypes.FETCH_PRICEASC,
        payload: {
            request: {
                method: 'GET',
                url: `/product/priceasc`
            }
        }

    })
}



const fetchPriceDesc = () => {
    return ({
        type: ActionTypes.FETCH_PRICEDESC,
        payload: {
            request: {
                method: 'GET',
                url: `/product/pricedesc`
            }
        }

    })
}


const fetchCategory = (id) => {
    return ({
        type: ActionTypes.FETCH_CATEGORY,
        payload: {
            request: {
                method: 'GET',
                url: `/product/${id}`
            }
        }

    })
}
const fetchCategoryAsc = (id) => {
    return ({
        type: ActionTypes.FETCH_CATEGORYASC,
        payload: {
            request: {
                method: 'GET',
                url: `/product/${id}/asc`
            }
        }

    })
}

const fetchCategoryDesc = (id) => {
    return ({
        type: ActionTypes.FETCH_CATEGORYDESC,
        payload: {
            request: {
                method: 'GET',
                url: `/product/${id}/desc`
            }
        }

    })
}


const getArticleList = (boardId) => {
    return ({
        type: ActionTypes.ARTICLELIST,
        payload: {
            request: {
                method: 'GET',
                url: `/article/list?boardId=${boardId}`
            }
        }
    });
};

const getArticleDetail = (boardId, articleId) => {
    return ({
        type: ActionTypes.ARTICLEDETAIL,
        payload: {
            request: {
                method: 'GET',
                url: `/article/${articleId}`
            }
        }
    });
};

const getOrderList = () => {
    return ({
        type: ActionTypes.ACCOUNT_ORDER_ITEMS,
        payload: {
            request: {
                method: 'GET',
                url: '/orders'
            }
        }
    })
}

const articleWrite = ({title, content, boardId}) => {
    return ({
        type: ActionTypes.ARTICLEWRITE,
        payload: {
            request: {
                method: 'POST',
                url: '/article',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({title, content, boardId})
            }
        }
    });
}

const articleDelete  =(articleId) =>{
    return({
        type:ActionTypes.ARTICLEDELETE,
        payload:{
            request:{
                method: 'DELETE',
                url: `/article/${articleId}`
            }
        }
    })
}

const articleUpdate  =({articleId, title, content}) =>{
    console.log("article >> ", articleId)
    return({
        type:ActionTypes.ARTICLEUPDATE,
        payload:{
            request:{
                method: 'PATCH',
                url: `/article/${articleId}`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({title, content})
            }
        }
    })
}

export const addToCart = (item, quantity) =>{
    // toast.success("Item Added to Cart");
    return({
        type:ActionTypes.ADD_CART,
        payload:{
            request:{
                method:'POST',
                url:'/cart',
                data:{product:item, quantity:quantity}
            }
        }
    })
}

const checkPassword = (chkpassword) => {
    return ({
        type: ActionTypes.CHECK_PASSWORD,
        payload: {
            request: {
                method: 'GET',
                url: '/members/checkPassword?password=' + chkpassword,
                headers: {
                    'Content-Type': 'charset: utf-8',
                    'Accept': 'Application/json'
                }
            }
        },
    });
};

const updateNickname = (nickname) => {
    return ({
        type: ActionTypes.UPDATE_NICKNAME,
        payload: {
            request: {
                method: 'PATCH',
                url: '/members',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({ nickname })
            }
        }
    });
};

const updateRealName = (realName) => {
    return ({
        type: ActionTypes.UPDATE_REALNAME,
        payload: {
            request: {
                method: 'PATCH',
                url: '/members',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({ realName })
            }
        }
    });
};

const updatePhone = (phone) => {
    return ({
        type: ActionTypes.UPDATE_PHONE,
        payload: {
            request: {
                method: 'PATCH',
                url: '/members',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({ phone })
            }
        }
    });
};

const updatePassword = (password) => {
    return ({
        type: ActionTypes.UPDATE_PASSWORD,
        payload: {
            request: {
                method: 'PATCH',
                url: '/members',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({ password })
            }
        }
    });
};

const registerVerification = (email) => {
    return ({
        type: ActionTypes.SEND_MAIL_REGISTER,
        payload: {
            request: {
                method: 'POST',
                url: '/members/sendEmail',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({ type:"register", email:email })
            }
        }
    });
};

const checkRegisterToken = (token) => {
    return ({
        type: ActionTypes.CHECK_REGISTER_TOKEN,
        payload: {
            request: {
                method: 'GET',
                url: '/members/checkRegisterToken?token=' + token,
                headers: {
                    'Content-Type': 'charset: utf-8',
                    'Accept': 'Application/json'
                }
            }
        },
    });
};

const getAddress = () =>{
    return ({
        type:ActionTypes.GET_ADDRESS,
        payload:{
            request:{
                method: 'GET',
                url: '/address'
            }
        }
    })
}

const changeStatus = (changeCode, orderDetailId, status) =>{
    console.log("ACTION", changeCode, orderDetailId, status)
    return ({
        type:ActionTypes.CHANGE_STATUS,
        payload:{
            request:{
                method:'PATCH',
                url:'/orders',
                data:{
                    changeCode:changeCode,
                    orderDetailId:orderDetailId,
                    status:status
                }
            }
        }
    })
}

const searchAddressInApi = (keyword) =>{
    return ({
        type:ActionTypes.SEARCH_ADDRESS_API,
        payload:{
            request:{
                method: 'GET',
                url: `/getAddrApi?keyword=${keyword}`
            }
        }
    })
}


const addAddress = ({address, postalNumber, addressDetail}) => {
    return ({
        type: ActionTypes.ADD_ADDRESS,
        payload: {
            request: {
                method: 'POST',
                url: '/address',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({ address, postalNumber, addressDetail })
            }
        }
    });
};

const updateMainAddress = (addressId) =>{
    return ({
        type:ActionTypes.UPDATE_MAIN_ADDRESS,
        payload:{
            request:{
                method: 'PATCH',
                url: `/address?addressId=${addressId}`
            }
        }
    })
}

const deleteAddress = (addressId) =>{
    return ({
        type:ActionTypes.DELETE_ADDRESS,
        payload:{
            request:{
                method: 'DELETE',
                url: `/address?addressId=${addressId}`
            }
        }
    })
}

export const Actions = {
    getClientToken,
    login,
    logout,
    getMemberMe,
    refreshToken,
    fetchArtwork,
    fetchSingleProduct2,
    fetchProductByArtist,
    fetchPriceAsc,
    fetchPriceDesc,
    fetchCategory,
    fetchCategoryAsc,
    fetchCategoryDesc,
    getCart,
    toggleCartItem,
    deleteCartItem,
    calcCartPrice,
    getArticleList,
    getArticleDetail,
    articleWrite,
    articleDelete,
    articleUpdate,
    makeOrder,
    excuteKakaoPay,
    approveKakaoPay,
    checkEmail,
    checkNickname,
    register,
    getOrderList,
    checkPassword,
    getAddress,
    updateNickname,
    updateRealName,
    updatePhone,
    updatePassword,
    fetchProductBySearch,
    registerVerification,
    checkRegisterToken,
    changeStatus,
    searchAddressInApi,
    addAddress,
    updateMainAddress,
    deleteAddress
};
