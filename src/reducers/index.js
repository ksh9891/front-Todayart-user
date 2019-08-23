import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import cart from './cart.reducer';
import article from './article.reducer';
import members from './member.reducer';

const rootReducers = combineReducers({
  auth: authentication,
  cart: cart,
  article: article,
  members: members,
});

export default rootReducers;
