import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import cart from './cart.reducer';
import article from './article.reducer';

const rootReducers = combineReducers({
  auth: authentication,
  cart: cart,
  article: article
});

export default rootReducers;
