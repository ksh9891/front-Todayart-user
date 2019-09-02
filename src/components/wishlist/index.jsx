import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Actions } from '../../actions'
import { Files } from '../../utils';
import {ActionTypes} from '../../constants/ActionTypes'
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Breadcrumb from '../common/breadcrumb';


class wishList extends Component {
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }


    componentWillMount(){
        this.props.fetchWishlist();
    }

    render (){
        const {items, symbol} = this.props;


        const deleteWishlist=(id)=>{
            this.props.removeWishlist(id)
                .then(response=>{
                  
                if(response.type==ActionTypes.REMOVE_WISHLIST_SUCCESS){  
                    console.log('삭제성공!')
                    toast.success("상품이 찜하기에서 삭제되었습니다")
                    this.props.fetchWishlist()
                    
                    
                }
             }).catch(error=>{
                 console.log('error >>', error)
             })
        }



        return (
            <div>
                <Breadcrumb title={'위시리스트'} />
                {items.length>0 ?
                <section className="wishlist-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table cart-table table-responsive-xs">
                                    <thead>
                                    <tr className="table-head">
                                        <th scope="col">작품 이미지</th>
                                        <th scope="col">작품명</th>
                                        <th scope="col">가격</th>
                                        <th scope="col">재고 여부</th>
                                        <th scope="col">액션</th>
                                    </tr>
                                    </thead>
                                    {items.map((item, index) => {
                                        return (
                                            <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <Link to={`${process.env.PUBLIC_URL}/product/${item.product.productId}`}>
                                                        <img src={Files.filePath(item.product.thumbnail.fileName)} alt="" />
                                                    </Link>
                                                </td>
                                                <td><Link to={`${process.env.PUBLIC_URL}/product/${item.product.productId}`}>{item.product.productName}</Link>
                                                    <div className="mobile-cart-content row">
                                                        <div className="col-xs-3">
                                                            <p>in stock</p>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">
                                                            <del><span className="money">{symbol}{item.product.productPrice}</span></del></h2>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">
                                                                <a href="javascript:void(0)" className="icon" onClick={() => deleteWishlist(item.wishlistId)}>
                                                                    <i className="fa fa-times" />
                                                                </a>
                                                                <a href="javascript:void(0)" className="cart" onClick={() => deleteWishlist(item.wishlistId)}>
                                                                    <i className="fa fa-shopping-cart" />
                                                                </a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><h2>
                                                     <del><span className="money">{symbol}{item.product.productPrice}</span></del></h2></td>
                                                <td >
                                                    <p>in stock</p>
                                                </td>
                                                <td>
                                                    <a href="javascript:void(0)" className="icon" onClick={() => deleteWishlist(item.wishlistId)}>
                                                        <i className="fa fa-times" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="cart" onClick={() => deleteWishlist(item.wishlistId)}>
                                                        <i className="fa fa-shopping-cart" />
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody> )
                                    })}
                                </table>
                            </div>
                        </div>
                        <div className="row wishlist-buttons">
                            <div className="col-12">
                                <Link to={`${process.env.PUBLIC_URL}/collections/0`} className="btn btn-solid">continue shopping</Link>
                                <Link to={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid">check out</Link>
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
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/empty-wishlist.png`} className="img-fluid mb-4" alt="" />
                                        <h3>
                                            <strong>위시리스트가 비어있습니다.</strong>
                                        </h3>
                                        <h4>다양한 작품을 감상하시고 위시리스트에 넣어보세요!</h4>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                }
                <ToastContainer/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    items: state.wishlist.items,
    symbol: state.data.symbol,
})


const mapDispatchToProps = (dispatch) => ({
    fetchWishlist: ()=> dispatch(Actions.fetchWishlist()),
    removeWishlist: (id)=> dispatch(Actions.removeWishlist(id))
   
    
   
})

export default connect(mapStateToProps, mapDispatchToProps)(wishList)