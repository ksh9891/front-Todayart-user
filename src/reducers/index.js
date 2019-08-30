import { combineReducers } from 'redux';

// Import custom components
import productReducer from './products';
import cartReducer from './cart';
import orderReducer from './order';
import filtersReducer from './filters';
import wishlistReducer from './wishlist';
import compareReducer from './compare';
import authentication from "./authentication.reducer";
import articleReducer from './article'


const rootReducer = combineReducers({
    data: productReducer,
    cart: cartReducer,
    order: orderReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    article: articleReducer,
    auth: authentication
});

export default rootReducer;