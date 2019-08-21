import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import membersReducer from "./member.reducer";

const rootReducers = combineReducers({
  auth: authentication,
  members: membersReducer
});

export default rootReducers;
