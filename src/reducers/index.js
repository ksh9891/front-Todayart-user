import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import { todayart } from './todayart.reducer';

const rootReducers = combineReducers({
  auth: authentication,
  todayart: todayart
});

export default rootReducers;
