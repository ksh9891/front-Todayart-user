import { ActionTypes } from '../constants';

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

const getArticleList = () => {
    return ({
        type: ActionTypes.ARTICLELIST,
        payload: {
            request: {
                method: 'GET',
                url: '/article/list'
            }
        }
    });
};

const getArticleDetail = (articleId) => {
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

export const Actions = {
    getClientToken,
    login,
    logout,
    getMemberMe,
    refreshToken,
    getCart,
    toggleCartItem,
    deleteCartItem,
    getArticleList,
    getArticleDetail,
    checkEmail,
    checkNickname,
    register,
    getOrderList
};
