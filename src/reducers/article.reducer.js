/**
 * An to-do reducer
 * 
 * @author: steve park <seongwuk.park@gmail.com>
 */
import { ActionTypes } from '../constants';

/**
* The initial state
*/
const initialStateArticle = {
    items: [],
    item: null,
    page: 1,
    size: 10,
    totalCount: 0,
};

/**
 * A reducer function that returns the next state tree,
 * given the current state tree and the action to handle.
 * 
 * @param {any} state the current state
 * @param {Object} action A plain object representing âwhat changedâ.
 * @return {any} the next state
 */
const article = (state = initialStateArticle, action) => {
    const { items } = state;
    const { payload } = action;

    switch (action.type) {

        case ActionTypes.ARTICLELIST_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        items: data.items
                    };
                }
            }
            return state;

        case ActionTypes.ARTICLEDETAIL_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        item: data
                    };
                }
            }
            return state;

        case ActionTypes.ARTICLEDELETE_SUCCESS:
            if (payload !== null && payload !== null) {
                const { data } = payload;
                return {
                    ...state,
                    items: items.filter(item => item.cartId !== data.cartId)
                }
            }
            return state;


        case ActionTypes.LOGOUT:
            return initialStateArticle;

        default:
            return state;
    }
}

export default article;
