import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import cart from './cart.reducer';

const rootReducers = combineReducers({
  auth: authentication,
  cart: cart
});

export default rootReducers;
