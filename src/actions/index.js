import { ActionTypes } from '../constants';
import axiosMiddleware from 'redux-axios-middleware';
import { id } from 'postcss-selector-parser';

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


const fetchSingleProduct = (id) => {
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

const fetchProductByName = (searchword) => {
    console.log("productName = " + searchword)
    return ({
        type: ActionTypes.FETCH_BYPRODUCTNAME,
        payload: {
            request: {
                method: 'GET',
                url: `/product/productname/?name=${searchword}`
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
                url: `/product/category=${id}`
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
                url: `/product/category=${id}/asc`
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
                url: `/product/category=${id}/desc`
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

const articleWrite = ({title, content, boardId, memberId}) => {
    return ({
        type: ActionTypes.ARTICLEWRITE,
        payload: {
            request: {
                method: 'POST',
                url: 'article/create',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({title, content, boardId, memberId})
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

const addCart = (item, quantity) =>{
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

export const Actions = {
    getClientToken,
    login,
    logout,
    getMemberMe,
    refreshToken,
    fetchArtwork,
    fetchSingleProduct,
    fetchProductByName,
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
    makeOrder,
    excuteKakaoPay,
    approveKakaoPay,
    checkEmail,
    checkNickname,
    register,
    getOrderList,
    addCart

};
