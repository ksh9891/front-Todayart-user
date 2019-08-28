import React from 'react';
import {connect} from 'react-redux';
import { Actions } from '../../actions';
import {ActionTypes} from '../../constants/ActionTypes';

const KakaoSuccess = ({order,approveKakaoPay})=>{
    const {ordered, tid} = order;
    let url = decodeURIComponent(window.location.href);
    url=decodeURIComponent(url);
    const pgToken = url.substring(url.indexOf('?')+1, url.length);
    window.opener.console.log("get pgToken :",pgToken);
    approveKakaoPay(pgToken, ordered, tid)
    .then((response)=>{
        if(response.type===ActionTypes.APPROVE_KAKAO_PAY_SUCCESS){
            window.opener.location.replace("/test")
            window.close();
            
        }else{
            window.opener.location.replace("/kakaoSuccessFail")
            window.close();
        }

    })
    
    return (<div></div>);
}

const mapDispatchToProps=(dispatch)=>({
    approveKakaoPay:(pgToken, ordered, tid)=>dispatch(Actions.approveKakaoPay(pgToken, ordered, tid))
})
const mapStateToProps=(state)=>({
    order:state.order
})



export const kakaoCancel = () =>{
    window.close();
}


export const kakaoSuccessFail = () =>{
    return <h1>결제실패</h1>
}

export default connect(mapStateToProps, mapDispatchToProps)(KakaoSuccess);
