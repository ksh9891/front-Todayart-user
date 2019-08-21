import { ActionTypes } from '../constants'

const initialStateProduct = {
    items: [],
    item: {},
    productId : null

};


const product = (state = initialStateProduct, action) => {
    const { items } = state;
    const { payload } = action;

    switch (action.type){
        case ActionTypes.FETCH_ARTWORK_SUCCESS:
            if(payload !== null && payload !== undefined){
                const {data} = payload;
                if(data !== null && data !== undefined){
                    console.log("data1 :", data);
                    return {
                        ...state,
                        items: (data === undefined ? [] : data)
                    };
                }
            }
            return state;


        case ActionTypes.FETCH_SINGLEPRODUCT_SUCCESS:
            if(payload !== null && payload !== undefined){
                const {data} = payload;               
                    console.log("data2 :", data);
                    return {
                        ...state,
                        item: data
                    };                
            }
            return state;
    

        default:
            return state;
    }
}
export default product;
