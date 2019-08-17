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
    return ({
        type: ActionTypes.LOGIN,
        payload: {
            request: {
                method: "POST",
                url: "/"
            }
        }
    });
};

const logout = () => ({
    type: ActionTypes.LOGOUT
});

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

export const Actions = {
    getClientToken,
    register,
    login,
    logout,
    refreshToken,
};
