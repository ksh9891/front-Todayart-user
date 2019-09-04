import React, {Component, useState} from 'react';
import {Helmet} from 'react-helmet'
import { connect } from 'react-redux'
import {Link, Redirect } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator';

import Breadcrumb from "../common/breadcrumb";
import {removeFromWishlist, Actions} from '../../actions'
import {ActionTypes} from '../../constants/ActionTypes'
import {getCartTotal} from "../../services";
import ShippingBox from './shippingBox';
import {Conditions} from './conditions.js';
import CurrencyFormat from "react-currency-format";
import "./index.css";


class CheckoutDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            cart:props.cart,
            symbol:props.symbol,
            totalPrice:props.totalPrice,
            totalShipping:props.totalShipping,
            pay:"kakaoPay",
            cardCom:null,
            checkCondition:false,
            makeOrder:props.makeOrder,
            excuteKakaoPay:props.excuteKakaoPay,
            open:false
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        console.log("Condition", prevState.checkCondition);
        console.log("Pay", prevState.pay);
        console.log("CardCom", prevState.cardCom);


        if(nextProps.cart!==prevState.cart){
            return {cart:nextProps.cart, totalPrice:nextProps.totalPrice, totalShipping:nextProps.totalShipping}
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.cart!==nextProps.cart){
            return true
        }
        if(this.state.checkCondition!==nextState.checkCondition){
            return true;
        }
        if(this.state.pay!==nextState.pay){
            return true;
        }
        return false
    }


     onOpenModal = (e) => {
        e.preventDefault();
       this.setState({ open: true });
    };

     onCloseModal = () => {
        this.setState({ open: false });
    };



    render(){

    const {cart, totalPrice, totalShipping} = this.state;
    const {items}=cart;
    const symbol = this.state.symbol;
    const orderItems = items.filter((item)=>item.checked===true);
    const orderItemList = orderItems.map((item)=>item.cartId);
    const cardList = ['국민', '비씨', '신한', '현대', '삼성', '롯데', '외환', 'NH', '하나', '우리', '광주', '수협', '씨티', '전북', '제주', '카카오뱅크', '케이뱅크'];

    const denyPaying=()=>{
        return(
            <div className="payment_deny_panying">
                {window.alert("이용약관에 동의해주세요!")}
            </div>
        )
    }


    const tryPaying=()=>{
        const totalPayingPrice=totalPrice+totalShipping;

        switch(this.state.pay){
            case "kakaoPay":
                tryPayingKakao(totalPayingPrice);
                break;
            case "creditCard":
                tryPayingCredit(totalPayingPrice);
                break;
        }
        
    }

    const tryPayingKakao=(totalPayingPrice)=>{
        console.log("makeOrder",this.props.makeOrder)
        this.props.makeOrder(orderItemList, totalShipping, totalPayingPrice)
        .then(async(response)=>{
            if(response.type===ActionTypes.MAKE_ORDER_SUCCESS){
                console.log("aaaaa", response)
                return this.props.excuteKakaoPay(response.payload.data);
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


    return (
        <div className="col-lg-6 col-sm-12 col-xs-12">
            <div className="checkout-details">
                <div className="order-box">
                    <div className="title-box">
                        <div>상품정보/수량 <span> 금액</span></div>
                    </div>
                    <ul className="qty">
                        {orderItems.map((item, index) => {
                            return <div key={index}>
                            {item.product.productName}
                            <li>
                                <CurrencyFormat value={item.productPrice} displayType={'text'} thousandSeparator={true} /> × <CurrencyFormat value={item.quantity} displayType={'text'} thousandSeparator={true} />
                                <CurrencyFormat value={item.productPrice*item.quantity} prefix={symbol} displayType={'text'} thousandSeparator={true} />
                            </li>
                            </div> })
                        }
                    </ul>
                    <ul className="sub-total">
                        <li>상품금액 <span className="count"><CurrencyFormat value={totalPrice} prefix={symbol} displayType={'text'} thousandSeparator={true} /></span></li>
                        <li>배송비 <span className="count"><CurrencyFormat value={totalShipping} prefix={symbol} displayType={'text'} thousandSeparator={true} /></span></li>
                    </ul>

                    <ul className="sub-total">
                        <li>최종 결제금액 <span className="count"><CurrencyFormat value={totalPrice+totalShipping} prefix={symbol} displayType={'text'} thousandSeparator={true} /></span></li>
                    </ul>
                </div>

                <div className="payment-box">
                    <div className="upper-box">
                        <div className="payment-options">
                        <div className="payment_item">
                            <div className="radion_btn">
                                <input type="radio" id="f-option5" name="selector" defaultChecked="true" onClick={()=>{this.setState({...this.state, pay:"kakaoPay", cardCom:null})}}/>
                                <label htmlFor="f-option5">카카오페이 결제</label>
                            </div>
                        <div className="payment_item">
                            <div className="radion_btn">
                                <input type="radio" id="f-option6" name="selector" onClick={()=>{this.setState({...this.state, pay:"creditCard", cardCom:"국민"})}}/>
                                <label htmlFor="f-option6">신용카드 결제 </label>
                                {(this.state.pay==="creditCard")?
                                <div><span>카드선택</span><span style={{float:'right'}}>
                                    <div>
                                        <select onChange={(e)=>{this.setState({...this.state, cardCom:e.target.value})}}>
                                            {cardList.map((item)=>{return(
                                                <option value={item} key={item} >
                                                    {item}
                                                </option>
                                            )})}
                                        </select>
                                    </div>
                                </span></div>:''}
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>

        <div className="creat_account">
            <input type="checkbox" id="f-option4" name="selector" onChange={()=>{this.state.checkCondition===false?this.setState({checkCondition:true}):this.setState({checkCondition:false})}} />
            <label htmlFor="f-option4">  <a data-toggle="modal" data-target="#conditions" onClick={()=>this.onOpenModal} style={{"color":"blue"}}>구매 및 결제대행서비스 이용약관</a> 등에 모두 동의합니다. (필수) </label>
            {/* <a href="#">terms & conditions*</a> */}
        </div>

                 <div className="modal fade" id="conditions" tabIndex="-1" role="dialog" aria-labelledby="conditions" aria-hidden="true" style={{"height":"75%","marginTop":"10%", "paddingBottom":"10%", "overflowY":"hidden"}}>
                        <div className="modal-dialog" role="document" style={{"marginLeft":"auto", "marginRight":"auto", "overflowY":"initial"}} >
                            <div className="modal-content conditions" style={{"maxHeight":"calc(100vh - 200px)"}}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="conditions">이용약관</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{"maxHeight": "calc(100vh - 200px)", "overflowY":"auto"}}>
                                
                                    <Conditions/>
                            
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-solid ta-btn-sm cl" data-dismiss="modal">닫기</button>
                            </div>
                            </div>
                            </div>
                        </div>
                </div>
            
                <div className="text-right">
                    {this.state.checkCondition? <button type ="button" className="btn-solid btn" onClick={()=>tryPaying()}>결제하기</button>
                    :
                    <button type ="button" className="btn-solid btn" onClick={()=>denyPaying()}>결제하기</button>
                    }    
                </div>  
            </div>
        </div>
        )
    }
}


class checkOut extends Component {

    constructor (props) {
        super (props)

        this.state = {
            payment:'stripe',
            first_name:'',
            last_name:'',
            phone:'',
            email:'',
            country:'',
            address:'',
            city:'',
            state:'',
            pincode:'',
            create_account: ''
        }
        this.validator = new SimpleReactValidator();
    }

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

      }

    setStateFromCheckbox = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.checked;
        this.setState(obj);

        if(!this.validator.fieldValid(event.target.name))
        {
            this.validator.showMessages();
        }
    }

    checkhandle(value) {
        this.setState({
            payment: value
        })
    }



    render (){
        const {symbol, payment} = this.props;

        return (
            <div>

                {/*SEO Support*/}
                <Helmet>
                    <title>TodayArt | CheckOut Page</title>
                    <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb  title={'결제하기'}/>

                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form">
                                <form>
                                    <div className="checkout row">
                                    <ShippingBox/>
                                    <CheckoutDetail cart={this.props.cart} symbol={symbol} totalPrice={this.props.totalPrice} totalShipping={this.props.totalShipping} makeOrder={this.props.makeOrder} excuteKakaoPay={this.props.excuteKakaoPay}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cart: state.cart,
    symbol: state.data.symbol,
    totalPrice:state.cart.totalPrice,
    totalShipping:state.cart.totalShipping
})

const mapDispatchToProps=(dispatch)=>({
    getCart:()=>dispatch(Actions.getCart()),
    toggleCartItem: (id)=>dispatch(Actions.toggleCartItem(id)),
    deleteCartItem: (id)=>dispatch(Actions.deleteCartItem(id)),
    calcCartPrice: ()=>dispatch(Actions.calcCartPrice()),
    removeFromWishlist : ()=>dispatch(removeFromWishlist),
    makeOrder:(cartIdList, shippingFee, totalPrice)=>dispatch(Actions.makeOrder(cartIdList, shippingFee, totalPrice)),
    excuteKakaoPay:(ordered)=>dispatch(Actions.excuteKakaoPay(ordered))
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(checkOut)
export {kakaoCancel} from './kakao';
export {kakaoSuccessFail} from './kakao';
