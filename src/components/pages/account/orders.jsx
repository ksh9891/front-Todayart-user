import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Breadcrumb from "../../common/breadcrumb";

import './orders.css';
import { Actions } from '../../../actions';
import { ActionTypes } from '../../../constants/ActionTypes';
import { Files } from '../../../utils';



class Orders extends React.Component{
    constructor(props){
        super(props)
        this.state={
            orders:null,
            getOrders:props.getOrders,
            changeStatus:props.changeStatus,
            deliveryNow:null,
            complete:null,
            refund:null
        }
    }

    
    
    
    componentDidMount(){
        if(this.state.orders===null||this.state.orders===undefined){
            this.state.getOrders().then(response=>{
                if(response.type===ActionTypes.ACCOUNT_ORDER_ITEMS_SUCCESS){
                    const del = response.payload.data.reduce((sum, order)=>{
                        const number = order.orderDetails.filter(item=>item.status==='배송중').length;
                        return sum+number;
                    },0);
                    const com = response.payload.data.reduce((sum, order)=>{
                        const number = order.orderDetails.filter(item=>item.status==='배송완료').length;
                        return sum+number;
                    },0);
                    const ref = response.payload.data.reduce((sum, order)=>{
                        const number = order.orderDetails.filter(item=>item.status==='반품대기'||item.status==='반품중'||item.status==='반품완료'||item.status==='환불처리중'||item.status==='환불완료').length;
                        return sum+number;
                    },0);
                    
                    this.setState({orders:response.payload.data, deliveryNow:del, complete:com,refund:ref})
                    console.log(del, com, ref)
                }
            })

        }
    }


    shouldComponentUpdate(nextProps, nextState){
        if(this.state.orders!==nextState.orders){
            return true;
        }
        return false
    }


    componentDidUpdate(){

    }

    botton = (item) => {
        const {status}=item;
        if(status==='배송완료'){
            return '주문확정'
        }
        else if(status==='결제대기'||status==='결제완료'||status==='배송준비'){
            return '주문취소'
        }
    }

    excuteCommand=(item)=>{
        const{status, orderDetailId} = item
        if(status==='배송완료'){
            this.state.changeStatus('CUSTOMER',orderDetailId, status)
            .then(response=>{
                if(response.type===ActionTypes.CHANGE_STATUS_SUCCESS){
                   window.alert("주문이 확정되었습니다!")
                   this.state.getOrders().then(response=>{
                    if(response.type===ActionTypes.ACCOUNT_ORDER_ITEMS_SUCCESS){
                        this.setState({orders:response.payload.data})
                    }
                }
                )
                }
            } 
            )
        }else if(status==='결제대기'||status==='결제완료'||status==='배송준비'){
            this.state.changeStatus('CUSTOMER',orderDetailId, status)
            .then(response=>{
                if(response.type===ActionTypes.CHANGE_STATUS_SUCCESS){
                    window.alert("주문이 취소되었습니다!")
                    this.state.getOrders().then(response=>{
                        if(response.type===ActionTypes.ACCOUNT_ORDER_ITEMS_SUCCESS){
                            this.setState({orders:response.payload.data})
                        }
                    }
                    )
                }
            } 
            )
        }
    }
    
    selectComment=(status)=>{
        switch(status){
            case '주문확정':
                return "주문이 확정되었습니다. 감사합니다."
            case '결제대기':
                return "결제 대기 중입니다. 결제를 완료하시면 판매자가 확인 후 배송을 시작합니다"
            case '결제취소':
                return "결제가 취소되었습니다."
            case '결제완료':
                return "결제가 완료된 상품입니다. 판매자가 확인 후 배송이 시작됩니다."
            case '배송준비':
                return "배송 준비중입니다. 배송 시작 후 운송장을 확인할 수 있습니다"
            case '배송중':
                return "배송 중인 상품입니다. 곧 만나볼 수 있습니다"
            case '배송완료':
                return "배송이 완료되었습니다! 주문을 확정해주세요!"
            case '주문취소':
                return "주문이 취소된 상품입니다."
            case '반품대기':
                return "반품대기 중입니다. 운영자가 확인후 반품이 진행됩니다."
            case '반품중':
                return "반품처리가 진행중입니다"
            case '반품완료':
            case '환불처리중':
                return "반품이 완료되었습니다. 2~3일 내로 환불처리가 완료됩니다"
            case '환불완료':
                return "환불처리가 완료되었습니다."

        }

    }

    render(){
        return(
            <div>
               <Breadcrumb title={'마이페이지'} />

                {/*Dashboard section*/}
                <section className="section-b-space">
                <div className="container">
                <div className="row">
                <div className="col-lg-3">
                <div className="dashboard-left">
                <div className="collection-mobile-back">
                    <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true" /> back
                    </span>
                </div>
                <div className="block-content">
                    <ul>
                        <li><Link to="/account">계정정보 관리</Link></li>
                        <li><Link to="/account/password">비밀번호 변경</Link></li>
                        <li><Link to="/account/addresses">배송지 관리</Link></li>
                        <li className="active"><Link to="/account/orders">주문 관리</Link></li>
                        
                    </ul>
                </div>
                </div>
                </div>
                <div className="col-lg-9"> 
                    {this.state.order!==null?
                        <div className="dashboard-right">
                            <div className="dashboard">
                            <div className="filterBox">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/delivery.png`} className="statusNow del" alt="" />
                                <span className="delivery">배송중</span>
                                <span className="number del">{this.state.del}</span>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/complete.png`} className="statusNow com" alt="" />
                                <span className="complete">배송완료</span>
                                <span className="number com">{this.state.com}</span>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/refund.png`} className="statusNow ref" alt="" />
                                <span className="refund">반품/환불</span>
                                <span className="number ref">{this.state.ref}</span>
                            </div>
                            <div className="orderList">
                            {this.state.orders!==null?
                            this.state.orders.map((items, index)=>(
                            <ul key={index} className="goods_by_order">
                            {items.orderDetails.map((item, index)=>{
                                const { fileName } = item.product.thumbnail;
                                const image = Files.filePath(fileName);
                                return (
                                <div key={index}>
                                <li className="goods_item">
                                <Link className="goods_thumbs" to={{pathname:`${process.env.PUBLIC_URL}/product/${item.product.productId}`, state:{item:item.product}}}>
                                <img src={image} className="img-fluid" alt="" width="90" height="90"/>
                                </Link>
                                <p className="goods_name">{item.productName} </p>
                                <span className="goods_date">{items.orderDate.substring(0,10)}</span>
                                <span className="goods_totalPrice">{item.totalProductPrice}</span>
                                <div className="goods_comment">
                                <div>{this.selectComment(item.status)}</div>
                                </div>
                                <div>
                                <div className="goods_botton_status">{item.status}</div>
                                <div>
                                {item.status!=='결제취소'&&item.status!=='주문확정'&&item.status!=='주문취소'&&item.status!=='배송중'?
                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=>this.excuteCommand(item)}>{this.botton(item)}</button>:''}
                                </div>
                                </div>  
                                </li>
                                </div>)
                            })}
                            </ul>
                            )):''}
                    </div>
                    </div>
                    </div>
                    :
                    <div className="col-sm-12 empty-cart-cls text-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/icon-empty-order.png`} className="img-fluid mb-4" alt="" />
                            <h3><strong>주문내역이 존재하지않습니다.</strong></h3>
                        <h4>다양한 작품이 준비되어있습니다!</h4>
                    </div>
                    }
                </div>
                </div>
                </div>
                </section>
                </div>
        )
    }
}




const mapStateToProps=(state)=>({
    orders:state.order.orderList

})
const mapDispatchToProps=(dispatch)=>({
    getOrders:()=>dispatch(Actions.getOrderList()),
    changeStatus:(changeCode, orderDetailId, status)=>dispatch(Actions.changeStatus(changeCode, orderDetailId, status))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))