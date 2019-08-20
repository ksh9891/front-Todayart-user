import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import { todayart } from './todayart.reducer';
import { default as product } from './product.reducer'

const rootReducers = combineReducers({
  auth: authentication,
  todayart: todayart,
  product: product
});

export default rootReducers;
