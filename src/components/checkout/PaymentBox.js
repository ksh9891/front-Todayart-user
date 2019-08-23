import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Actions} from '../../actions';
import { ActionTypes } from '../../constants';

const PaymentBox=({makeOrder,excuteKakaoPay, cart})=>{
    const [payment, setPayment] = useState("kakaoPay");
    const [CardCom, setCardCom] = useState(null);
    const [checkCondition, setCheckCondition] = useState(false);

    console.log(CardCom)
    console.log("checkCondition", checkCondition);

    const {items, totalShipping}=cart;

    let {totalPrice} = cart;
    const orderItems = items
        .filter((item)=>item.checked===true)
        .map((item)=>(item.cartId));

    const denyPaying=()=>{
        return(
            <div className="payment_deny_panying">
                {window.alert("이용약관에 동의해주세요!")}
            </div>
        )
    }


    const tryPaying=()=>{
        const totalPayingPrice=totalPrice+totalShipping;

        switch(payment){
            case "kakaoPay":
                tryPayingKakao(totalPayingPrice);
                break;
            case "creditCard":
                tryPayingCredit(totalPayingPrice);
                break;
        }
        
    }

    const tryPayingKakao=(totalPayingPrice)=>{
        makeOrder(orderItems, totalShipping, totalPayingPrice)
        .then(async(response)=>{
            if(response.type===ActionTypes.MAKE_ORDER_SUCCESS){
                console.log("aaaaa", response)
                return excuteKakaoPay(response.payload.data);
            }else{
                return Promise.reject(response);
            }
        })
        .then((response)=>{
            console.log("response :",response);
            if(response.type===ActionTypes.EXCUTE_KAKAO_PAY_SUCCESS){
                window.open(response.payload.data.next_redirect_pc_url, "카카오 결제", "width=550, height=630");            
            }else{
                return Promise.reject(response);
            }
        })
    }

    const tryPayingCredit=()=>{
        console.log("신용카드 결제 시도~~~");
        return null
    }

    return(
        <div>
            <div className="payment_item">
                <div className="radion_btn">
                    <input type="radio" id="f-option5" name="selector" defaultChecked="true" onClick={()=>{setPayment("kakaoPay");setCardCom(null)}}/>
                    <label htmlFor="f-option5">카카오페이 결제</label>
                <div className="check"></div>
                </div>
            </div>
            <div className="payment_item active">
                <div className="radion_btn">
                    <input type="radio" id="f-option6" name="selector" onClick={()=>{setPayment("creditCard");setCardCom("국민")}}/>
                    <label htmlFor="f-option6">신용카드 결제 </label>
                    <img src="img/product/card.jpg" alt=""/>
                <div className="check"></div>
               
                {(payment==="creditCard")?<div><span>카드선택</span><span style={{float:'right'}}><CreditBox setCardCom={setCardCom}/></span></div>:''}
         
            </div>
            
            </div>
            <Conditions checkCondition={checkCondition} setCheckCondition={setCheckCondition}/>
            <div className="text-center">
                {checkCondition? <button className="button button-paypal"  onClick={()=>tryPaying()}>결제하기</button>
                :
                <button className="button button-paypal"  onClick={()=>denyPaying()}>결제하기</button>
                }              
            </div>
        </div>
        );
}


const Conditions = ({checkCondition, setCheckCondition}) =>{
    return (
        <div className="creat_account">
            <input type="checkbox" id="f-option4" name="selector" onChange={()=>{checkCondition===false?setCheckCondition(true):setCheckCondition(false)}} />
            <label htmlFor="f-option4">I’ve read and accept the </label>
            <a href="#">terms & conditions*</a>
        </div>
        
    )
}

const CreditBox=({setCardCom})=>{
    const cartList = ['국민', '비씨', '신한', '현대', '삼성', '롯데', '외환', 'NH', '하나', '우리', '광주', '수협', '씨티', '전북', '제주', '카카오뱅크', '케이뱅크'];
    return(
        <div>
            <select onChange={(e)=>{setCardCom(e.target.value);}}>
                {cartList.map((item)=>{return(
                    <option value={item} key={item} >
                        {item}
                    </option>
                )})}
            </select>
        </div>
    )
}

const mapStateToProps=(state)=>({
    cart:state.cart
})

const mapDispatchToProps=(dispatch)=>({
    makeOrder:(cartIdList, shippingFee, totalPrice)=>dispatch(Actions.makeOrder(cartIdList, shippingFee, totalPrice)),
    excuteKakaoPay:(ordered)=>dispatch(Actions.excuteKakaoPay(ordered))
})
export default connect(mapStateToProps, mapDispatchToProps)(PaymentBox);