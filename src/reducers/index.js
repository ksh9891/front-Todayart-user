import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import cart from './cart.reducer';
import article from './article.reducer';
import { default as product } from './product.reducer'

const rootReducers = combineReducers({
  auth: authentication,
  product: product,
  cart: cart,
  article: article

}); 



export default rootReducers;
