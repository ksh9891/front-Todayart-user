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

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }catch(e){
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const stateLoader = new StateLoader();

/**
 * Create a Redux store that holds the app state.
 */
const store = createStore(
    rootReducer,
    stateLoader.loadState(),
    composeEnhancers (
        applyMiddleware(axiosMiddleware(client, middlewareConfig), logger, thunk),
    )
);

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
});

export default store;