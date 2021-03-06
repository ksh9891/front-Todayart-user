import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducers from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { StateLoader, interceptors, onErrorHandler } from './utils';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setting } from './utils/set';

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

const stateLoader = new StateLoader();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducers,
    stateLoader.loadState(),
    composeEnhancers(
        applyMiddleware(axiosMiddleware(client, middlewareConfig), logger, thunk)
    )
);

store.subscribe(() => {
    stateLoader.saveState(store.getState());
});


ReactDOM.render (
  <Provider store={store}>
      <Router>
          <App />
      </Router>
  </Provider>, document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
