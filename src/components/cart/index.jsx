import React, {Component} from 'react';
import {Helmet} from 'react-helmet'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Breadcrumb from "../common/breadcrumb";
import {incrementQty, decrementQty, Actions} from '../../actions'
import {ActionTypes} from '../../constants/ActionTypes'
import { Files } from '../../utils';

class cartComponent extends Component {

    constructor (props) {
        super (props);

    }

    componentWillMount(){
        this.props.getCart().then(response=>this.props.calcCartPrice());
    }

    toggle=(cartId)=>{
        this.props.toggleCartItem(cartId);
        this.props.calcCartPrice();
    }

    deleteItem=(cartId)=>{
        this.props.deleteCartItem(cartId)
        .then(response=>{
            if(response.type===ActionTypes.DELETE_CART_ITEM_SUCCESS){
                return this.props.calcCartPrice();
            }
        }).catch(error=>
            console.log("error >>", error))

        }

    render (){
        const {cart, cartItems, symbol, } = this.props;
        const {totalPrice, totalShipping} = cart;

        return (
            <div>
                {/*SEO Support*/}
                <Helmet>
                    <title>MultiKart | Cart List Page</title>
                    <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb title={'Cart Page'}/>

                {cartItems.length>0 ?
                <section className="cart-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table cart-table table-responsive-xs cart_check" style={{"table-layout":"fixed", "width":"90%", "margin":"auto"}}>
                                    <thead>
                                    <tr className="table-head">
                                        <th className="check" width="20px"></th>
                                        <th scope="col">image</th>
                                        <th scope="col">product name</th>
                                        <th scope="col">price</th>
                                        <th scope="col">quantity</th>
                                        <th scope="col">total</th>
                                        <th scope="col" width="5%"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartItems.map((item, index) => {
                                        const { fileName } = item.product.thumbnail;
                                        const image = Files.filePath(fileName);
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <input type="checkbox"  name="cartItem" defaultChecked={true} onChange={()=>this.toggle(item.cartId)}/>
                                                </td>
                                                <td>
                                                    <Link to={{pathname:`${process.env.PUBLIC_URL}/product/${item.product.productId}`,
                                                    state:{item:item.product}}}>
                                                        <img src={image} className="mr-3" alt=""style={{"borderRadius":"10px"}} />
                                                    </Link>
                                                </td>
                                                <td><Link to={{pathname:`${process.env.PUBLIC_URL}/product/${item.product.productId}`,
                                                state:{item:item.product}}}>{item.product.productName}</Link>
                                                    <div className="mobile-cart-content row">
                                                        <div className="col-xs-3">
                                                            <div className="qty-box">
                                                                <div className="input-group">
                                                                    <input type="text" name="quantity"
                                                                           className="form-control input-number" defaultValue={item.quantity} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mobile-cart-content row">
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">{symbol}{item.productPrice}</h2>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">
                                                                <i className="icon-close" onClick={() => this.deleteItem(item.cartId)}/>
                                
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><h2>{symbol}{item.productPrice}</h2>shipping Fee : {item.shippingFee?item.shippingFee:0}</td>
                                                <td>
                                                    <div className="qty-box">
                                                        <div className="input-group">
                                                            <input type="text" name="quantity" value={item.quantity} readOnly={true} className="form-control input-number" />
                                                        </div>
                                                    </div>{(item.qty >= item.stock)? 'out of Stock' : ''}
                                                </td>
                                                <td><h2 className="td-color">{symbol}{item.productPrice*item.quantity+(item.shippingFee?item.shippingFee:0)}</h2></td>
                                                <td>
                                                    <i className="fa fa-times" onClick={() =>  this.deleteItem(item.cartId)}/>
                                                </td>
                                            </tr>
                                         )
                                    })}</tbody>
                                </table>
                                <table className="table cart-table table-responsive-md">
                                    <tfoot>
                                    <tr>
                                        <td>total price :</td>
                                        <td><h2>{symbol} {totalPrice+totalShipping} </h2></td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div className="row cart-buttons" style={{"width":"90%","margin":"auto"}}>
                            <div className="col-6">
                                <Link to={`${process.env.PUBLIC_URL}/collection`} className="btn btn-solid">continue shopping</Link>
                            </div>
                            <div className="col-6">
                                <Link to={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid">결제하기</Link>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <section className="cart-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div >
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/icon-empty-cart.png`} className="img-fluid mb-4" alt="" />
                                        <h3>
                                            <strong>장바구니가 비어있습니다.</strong>
                                        </h3>
                                        <h4>다양한 작품을 감상하시고 장바구니에 넣어보세요!</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cart:state.cart,
    cartItems: state.cart.items,
    totalPrice:state.cart.totalPrice,
    totalShipping:state.cart.totalShipping,
    symbol: state.data.symbol
})

const mapDispatchToProps=(dispatch)=>({
    getCart:()=>dispatch(Actions.getCart()),
    toggleCartItem: (id)=>dispatch(Actions.toggleCartItem(id)),
    deleteCartItem: (id)=>dispatch(Actions.deleteCartItem(id)),
    calcCartPrice: ()=>dispatch(Actions.calcCartPrice())
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(cartComponent)