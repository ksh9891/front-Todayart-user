import { ActionTypes } from '../constants/ActionTypes';

const initialStateOrder={
    ordered:null,
    nextUrl:null,
    tid:null
}
// window.open(next_redirect_pc_url, "카카오 결제", "width=550, height=650");      

const order = (state=initialStateOrder, action) =>{
    const { payload } = action;
    const { next_redirect_pc_url, tid, ordered } = state;

    switch(action.type){
        case ActionTypes.MAKE_ORDER_SUCCESS:
            if(payload!==undefined&&payload!==null){
                const {data} = payload;
                if(data!==undefined&&data!==null){
                    return {...state, ordered:data};
                }
            }
            return state;

        case ActionTypes.MAKE_ORDER_FAIL:
            console.log("주문 실패");
            return state;

        case ActionTypes.EXCUTE_KAKAO_PAY_SUCCESS:
                if(payload!==undefined&&payload!==null){
                    const {data}=payload;
                    if(data!==null&&data!==undefined){
                        const {next_redirect_pc_url, tid} = data
                        return{
                            ...state,
                            nextUrl:next_redirect_pc_url,
                            tid:tid
                        }
                    }
                }
            return state;

        case ActionTypes.EXCUTE_KAKAOPAY_FAIL:
        
            return state;

        case ActionTypes.APPROVE_KAKAO_PAY_SUCCESS:
            return state;
        case ActionTypes.APPROVE_KAKAO_PAY_FAIL:
            
            return state;
        
            case ActionTypes.LOGOUT:
                return initialStateOrder;

        default:
            return state;
    }
}



export default order;