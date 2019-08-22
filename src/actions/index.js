import { ActionTypes } from '../constants';
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




export const Actions = {
    getClientToken,
    register,
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

};
