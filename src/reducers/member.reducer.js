import { ActionTypes } from '../constants';
import React from "react";

const initialStateMember = {
    orderList: []
};

const membersReducer = (state = initialStateMember, action) => {
    const { payload } = action;

    switch (action.type) {
        case ActionTypes.ACCOUNT_ORDER_ITEMS_SUCCESS:
            if (payload !== undefined && payload !== null) {
                const { data } = payload;
                if (data !== undefined && data !== null) {
                    return {
                        ...state,
                        orderList: data
                    };
                }
            } else {
                return null;
            }
        default:
            return state;
    }
};

export default membersReducer;
