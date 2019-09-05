import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Actions } from '../../actions'
import { Files } from '../../utils';
import {ActionTypes} from '../../constants/ActionTypes'
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { addToCart } from '../../actions'
import Breadcrumb from '../common/breadcrumb';
import {Helmet} from 'react-helmet'
import CurrencyFormat from "react-currency-format";


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
                    toast.info("작품이 찜하기에서 삭제되었습니다")
                    this.props.fetchWishlist()               
                    
                }
             }).catch(error=>{
                 console.log('error >>', error)
             })
        }

        // const moveToCart=(id)=>{
        //     this.props.addCartFromWishlist(id)
        //         .then(response=>{
                  
        //         if(response.type==ActionTypes.ADDCART_FROMWISHLIST_SUCCESS){  
        //             console.log('이동성공!')
        //             toast.success("상품이 장바구니로 이동되었습니다")
        //             this.props.fetchWishlist()    
                   
        //         }
        //      }).catch(error=>{
        //          console.log('error >>', error)
        //      })
        // }

        const moveToCart=(id)=>{
            this.props.addCartFromWishlist(id)
                .then(response=>{                  
                if(response.type==ActionTypes.ADDCART_FROMWISHLIST_SUCCESS){  
                    console.log('이동성공!')
                    toast.info("작품이 장바구니로 이동되었습니다")
                    
                    this.props.fetchWishlist() 
                    
                }       
             }).catch(error=>{
                 console.log('error >>', error)
             })
        }



        return (
            <div>
                <Helmet>
                    <title>TodayArt | WishList Page</title>
                    <meta name="description" content="TodayArt - 아마추어 미술인과 수요자들을 연결시켜주는 미술품 판매사이트" />
                </Helmet>
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
                                        <th scope="col">삭제/장바구니</th>
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
                                                                <span className="money">
                                                                    <CurrencyFormat value={item.product.productPrice} prefix={symbol} displayType={'text'} thousandSeparator={true} />
                                                                </span>
                                                            </h2>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">
                                                                <a className="icon" onClick={() => deleteWishlist(item.wishlistId)}>
                                                                    <i className="fa fa-times" />
                                                                </a>
                                                                <a className="cart" onClick={() => moveToCart(item.wishlistId)}>
                                                                    <i className="fa fa-shopping-cart" />
                                                                </a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>
                                                        <span className="money">
                                                            <CurrencyFormat value={item.product.productPrice} prefix={symbol} displayType={'text'} thousandSeparator={true} />
                                                        </span>
                                                    </p>
                                                </td>
                                                <td >
                                                    <p>in stock</p>
                                                </td>
                                                <td>
                                                    <a className="icon" onClick={() => deleteWishlist(item.wishlistId)}>
                                                        <i className="fa fa-times" />
                                                    </a>
                                                    <a className="cart" onClick={() => moveToCart(item.wishlistId)}>
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
                                <Link to={`${process.env.PUBLIC_URL}/collections/0`} className="btn btn-solid">쇼핑 계속하기</Link>
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
    removeWishlist: (id)=> dispatch(Actions.removeWishlist(id)),
    addCartFromWishlist: (id) => dispatch(Actions.addCartFromWishlist(id)), 
    addToCart: (item, qty) => dispatch(addToCart(item, qty))
   
    
   
})

export default connect(mapStateToProps, mapDispatchToProps)(wishList)