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
            token:props.token,
            getOrders:props.getOrders
        }
        
    }

    componentDidMount(){
        if(this.state.orders===null||this.state.orders===undefined){
            this.state.getOrders().then(response=>{
                if(response.type===ActionTypes.ACCOUNT_ORDER_ITEMS_SUCCESS){
                    this.setState({orders:response.payload.data})
                }
            })
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
                                            <li><Link to="/wishlist">찜목록 관리</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9"> 
                                <div className="dashboard-right">
                                    <div className="dashboard">
                                        <FilterBox/>
                                        <OrderList orders={this.state.orders} changeStatus={this.props.changeStatus}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const FilterBox=()=>{
    return(
        <div className="filterBox">필터박스 페이지
            <OrderStatus/>
            <OrderFilter/>
        </div>
    )
}

const OrderStatus=()=>{
    return (
        <div className="status">주문상태~~</div>
    )
}

const OrderFilter=()=>{
    return(
        <div className="filter">기간별/상태별 필터</div>
    )
}

const OrderList=({orders, changeStatus})=>{

    return(
        <div className="orderList">
            {orders?
            orders.map((items, index)=>(
         <ul key={index} className="goods_by_order">
            {items.orderDetails.map((item, index)=>{
                const { fileName } = item.product.thumbnail;
                const image = Files.filePath(fileName);
                return (
                <div key={index}>
                    <li className="goods_item">
                        <Link className="goods_thumbs" to={{pathname:`${process.env.PUBLIC_URL}/product/${item.product.productId}`, state:{item:item.product}}}>
                        <img src={image}
                             className="img-fluid"
                             alt="" width="90" height="90"/>
                        </Link>
                        <span className="goods_info">
                            <p className="goods_name">{item.productName} <span>{items.orderDate.substring(0,10)}</span></p>
                                <ul className="goods_status">
                                    <span>
                                        <span className="goods_info_price">￦{item.productPrice}</span> Χ <span className="goods_info_price">{item.quantity}</span>
                                        =<span className="goods_info_price">{item.productPrice*item.quantity}</span><span className="goods_totalPrice">totalPrice</span><br/>
                                        <br/>
                                    배송비: {item.shippingFee}<span className="goods_totalPrice">{item.totalProductPrice}</span>
                                    </span>
                                </ul>
                            <p className="goods_comment">코멘트칸</p>
                          
                        </span>
                        <div className="goods_botton"><div> <GoodsInfoRightSide status={item.status} changeStatus={changeStatus} itemId={item.orderDetailId}/></div></div>
                    </li>
                </div>
             )})}
        </ul>
        ))
        :
        <div>
        "주문 내역이 존재하지 않습니다!"
        </div>
        }
        </div>
    )
}

class GoodsInfoRightSide extends React.Component{
    constructor(props){
        super(props)
        this.state={
            status:props.status,
            changeStatus:props.changeStatus,
            itemId:props.itemId
        }
    }

    botton = () => {
        if(this.state.status==='배송완료'){
            return '주문확정'
        }
        else if(this.state.status==='결제대기'||this.state.status==='결제완료'||this.state.status==='배송준비'){
            return '주문취소'
        }
    }

    excuteCommand=(status)=>{
        if(status==='배송완료'){
            this.state.changeStatus('CUSTOMER',this.state.itemId, status)
            .then(response=>{
                if(response.type===ActionTypes.CHANGE_STATUS_SUCCESS){
                   window.alert("주문이 확정되었습니다!")
                   this.setState({status:'주문확정'})
                   
                }
            } 
            )
        }else if(status==='결제대기'||status==='결제완료'||status==='배송준비'){
            this.state.changeStatus('CUSTOMER',this.state.itemId, status)
            .then(response=>{
                if(response.type===ActionTypes.CHANGE_STATUS_SUCCESS){
                    window.alert("주문이 취소되었습니다!")
                    this.setState({status:'주문취소'})
                }
            } 
            )
        }
    }
    render(){
        const {status} = this.state;
        return(
            <div>
                <div className="goods_botton_status">{status}</div>
                <div>
                    {status!=='결제취소'&&status!=='주문확정'&&status!=='주문취소'&&status!=='배송중'?
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=>this.excuteCommand(status)}>{this.botton()}</button>:''
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    items:null,
    token:state.auth.token

})
const mapDispatchToProps=(dispatch)=>({
    getOrders:()=>dispatch(Actions.getOrderList()),
    changeStatus:(changeCode, orderDetailId, status)=>dispatch(Actions.changeStatus(changeCode, orderDetailId, status))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))