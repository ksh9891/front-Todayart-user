import { createStore, applyMiddleware, compose } from 'redux';

// middlewares
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

// Import custom components
import rootReducer from '../reducers';

// utils
import { StateLoader, interceptors, onErrorHandler } from '../utils';
import { setting } from '../utils/set';

const client = axios.create({
    baseURL: setting.baseURL,
    headers: {
        'Authorization': `Basic ${btoa(`${setting.clientId}:${setting.clientSecret}`)}`,
        'Cache-Control': 'no-cache',
        'X-Custom-Header': 'todayArt-client'
    },
    responseType: 'json'
});

const middlewareConfig = {
    interceptors,
    onError: onErrorHandler
};

const logger = createLogger({
    collapsed: true
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const stateLoader = new StateLoader();

const store = createStore(
    rootReducer,
    stateLoader.loadState(),
    composeEnhancers (
        applyMiddleware(axiosMiddleware(client, middlewareConfig), logger, thunk),
    )
);

store.subscribe(() => {
    stateLoader.saveState(store.getState());
});


export default store;