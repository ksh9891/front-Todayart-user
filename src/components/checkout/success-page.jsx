import React, {Component} from 'react';
import {connect} from 'react-redux'

import {Actions} from '../../actions'
import { ActionTypes } from '../../constants/ActionTypes';

class orderSuccess extends Component {

    constructor (props) {
        super (props)
    
    }

    componentDidMount(){
        this.props.createShipping(this.props.ordered, this.props.address);
        this.props.getCart().then(response=>{if(response.type===ActionTypes.GET_CART_SUCCESS){this.props.calcCartPrice()}})
    }

    render (){
        return (
           <section>
               <div className="order_success">
                   <div className="order_success header" style={{"textAlign":"center", "marginBottom":"35px"}}>
                   <h1>주문이 완료되었습니다</h1>
                   </div>
                   <div className="order_success body" style={{"textAlign":"center", "marginBottom":"5px", "fontSize":"medium"}}>
                       감사합니다! 주문내역은 마이페이지에서 확인 가능합니다.
                   </div>
                   <div className="order_success footer" style={{"textAlign":"center", "marginBottom":"100px", "fontSize":"medium", "color":"#ddd"}}>
                       잠시 후 메인화면으로 이동합니다
                       {setTimeout(()=>this.props.history.push('/'), 5000)}
                   </div>
               </div>
           </section>
        )
    }
}


const mapDispatchToProps=(dispatch)=>({
    createShipping:(ordered, address)=>dispatch(Actions.createShipping(ordered, address)),
    getCart:()=>dispatch(Actions.getCart()),
    calcCartPrice:()=>dispatch(Actions.calcCartPrice())
})
const mapStateToProps=(state)=>({
    ordered:state.order.ordered,
    address:state.order.shippingAddress
})

export default connect(mapStateToProps,mapDispatchToProps)(orderSuccess)