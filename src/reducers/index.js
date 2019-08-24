import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import cart from './cart.reducer';
import article from './article.reducer';
import members from './member.reducer';
import order from './order.reducer'
import { default as product } from './product.reducer'

const rootReducers = combineReducers({
  auth: authentication,
  product: product,
  cart: cart,
  article: article,
  members: members,
  order:order
});


export default rootReducers;
