import { ActionTypes } from '../constants';

const initialStateProduct= {
    items : []
};

const product = (state = initialStateProduct, action) => {
    const { items } = state;
    const { payload } = action;

    switch (action.type) {
        case ActionTypes.FETCH_ARTWORK_SUCCESS:

        if(payload !== null && payload !== undefined){
            const { data } = payload;
            if(data !== null && data !== undefined){
                console.log("data: " , data);
                return {
                    ...state,
                    items: (data === undefined ? [] : data)
                };
            }
        }
        return state;
    
        default:
            return state;
    }
}

export default product;