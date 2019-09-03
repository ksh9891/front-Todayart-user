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


class CheckoutDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            cart:props.cart,
            sysbol:props.symbol,
            payment:props.symbol,
            pay:"kakaoPay",
            cardCom:null,
            checkCondition:false,
            makeOrder:props.makeOrder,
            excuteKakaoPay:props.excuteKakaoPay
        }
    }

    render(){

    const {items, totalPrice, totalShipping}=this.state.cart;
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


    const client = {
        sandbox:    'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
        production: 'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
    }
    
    return (
        <div className="col-lg-6 col-sm-12 col-xs-12">
            <div className="checkout-details">
                <div className="order-box">
                    <div className="title-box">
                        <div>Product <span> Total</span></div>
                    </div>
                    <ul className="qty">
                        {orderItems.map((item, index) => {
                            return <div key={index}>
                            {item.product.productName}
                            <li>{item.productPrice} × {item.quantity}
                            <span>{symbol} {item.productPrice*item.quantity}</span></li> 
                            </div> })
                        }
                    </ul>
                    <ul className="sub-total">
                        <li>Subtotal <span className="count">{symbol}{totalPrice}</span></li>
                        <li>Shipping <span className="count">{symbol}{totalShipping}</span></li>
                    </ul>

                    <ul className="total">
                        <li>Total <span className="count">{symbol}{totalPrice+totalShipping}</span></li>
                    </ul>
                </div>

                <div className="payment-box">
                    <div className="upper-box">
                        <div className="payment-options">
                        <div className="payment_item">
                            <div className="radion_btn">
                            <input type="radio" id="f-option5" name="selector" defaultChecked="true" onClick={()=>{this.setState({pay:"kakaoPay", cardCom:null})}}/>
                            <label htmlFor="f-option5">카카오페이 결제</label>
                        <div className="check"></div>
                    </div>
               </div>
                <div className="payment_item active">
                    <div className="radion_btn">
                        <input type="radio" id="f-option6" name="selector" onClick={()=>{this.setState({pay:"creditCard", cardCom:"국민"})}}/>
                        <label htmlFor="f-option6">신용카드 결제 </label>
                        <img src="img/product/card.jpg" alt=""/>
                        <div className="check"></div>
                        {(this.state.pay==="creditCard")?<div><span>카드선택</span><span style={{float:'right'}}>
                            <div>
                                <select onChange={(e)=>{this.setState({cardCom:e.target.value})}}>
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

        <div className="creat_account">
            <input type="checkbox" id="f-option4" name="selector" onChange={()=>{this.state.checkCondition===false?this.setState({checkCondition:true}):this.setState({checkCondition:false})}} />
            <label htmlFor="f-option4">I’ve read and accept the </label>
            <a href="#">terms & conditions*</a>
        </div>
            
                <div className="text-right">
                    {this.state.checkCondition? <button type ="button" className="btn-solid btn"  onClick={()=>tryPaying()}>결제하기</button>
                    :
                    <button type ="button" className="btn-solid btn" onClick={()=>denyPaying()}>결제하기</button>
                    }    
                </div>
            
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
                    <title>MultiKart | CheckOut Page</title>
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
                                    <CheckoutDetail cart={this.props.cart} symbol={symbol} payment={payment} makeOrder={this.props.makeOrder} excuteKakaoPay={this.props.excuteKakaoPay}/>
                                    </div>
                                    <div className="row section-t-space">
                                        <div className="col-lg-6">
                                            <div className="stripe-section">
                                                <h5>stripe js example</h5>
                                                <div>
                                                    <h5 className="checkout_class">dummy test</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>cart number</td>
                                                                <td>4242424242424242</td>
                                                            </tr>
                                                            <tr>
                                                                <td>mm/yy</td>
                                                                <td>2/2020</td>
                                                            </tr>
                                                            <tr>
                                                                <td>cvc</td>
                                                                <td>2222</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 m-sm-t-2">
                                            <div className="stripe-section">
                                                <h5>paypal example</h5>
                                                <div>
                                                    <h5 className="checkout_class">dummy test</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>cart number</td>
                                                                <td>4152521541244</td>
                                                            </tr>
                                                            <tr>
                                                                <td>mm/yy</td>
                                                                <td>11/18</td>
                                                            </tr>
                                                            <tr>
                                                                <td>cvc</td>
                                                                <td>521</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
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
    symbol: state.data.symbol
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
