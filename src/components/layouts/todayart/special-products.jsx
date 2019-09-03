import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {connect} from 'react-redux'
import {getBestSellerProducts, getNewProducts} from '../../../services/index'
import ProductItem from '../common/product-item';
import {Actions} from '../../../actions'
import {ActionTypes} from '../../../constants/ActionTypes'
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { addToCart } from '../../../actions'


class SpecialProducts extends Component {

    componentWillMount(){        
        this.props.fetchArtwork();
    }

    render (){

        const {symbol,addToCart, addToCompare, items} = this.props

        const addWishilist=(item)=>{
            this.props.addWishlist(item)
                .then(response=>{
                if(response.type==ActionTypes.ADD_WISHLIST_SUCCESS){
                    toast.success("상품이 찜하기에 추가되었습니다");       
                    console.log('찜하기성공!')  
                } 
            }).catch(error=>{
                console.log('error >>', error)
            })
       }                 
                                 

        const asyncAddCart=(item,qty)=>{
            this.props.addToCart(item,qty)
                .then(response=>{
                if(response.type===ActionTypes.ADD_CART_SUCCESS){
                    this.props.calcPrice();

                }
             }).catch(error=>{
                 console.log('error >>', error)
             })
        }       


        return (
            <div>
                <div className="title1 section-t-space">
                    <h4>exclusive products</h4>
                    <h2 className="title-inner1">special products 홈화면</h2>
                </div>
                <section className="section-b-space p-t-0">
                    <div className="container">
                        <Tabs className="theme-tab">
                            <TabList  className="tabs tab-title">
                                <Tab>NEW PRODUCTS</Tab>                               
                            </TabList>

                            <TabPanel>
                                <div className="no-slider row">
                                    { items.slice(0, 8).map((item, index ) =>
                                        <ProductItem item={item} symbol={symbol}

                                                     onAddToWishlistClicked={() => addWishilist(item)}
                                                     onAddToCartClicked={asyncAddCart} key={index} /> )

                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="no-slider row">
                                    { items.map((item, index ) =>
                                        <ProductItem item={item} symbol={symbol}
                                                     onAddToCompareClicked={() => addToCompare(item)}
                                                     onAddToWishlistClicked={() => addWishilist(item)}
                                                     onAddToCartClicked={asyncAddCart} key={index} /> )
                                    }
                                </div>
                            </TabPanel>
                           
                        </Tabs>
                        <ToastContainer/>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    bestSeller: getBestSellerProducts(state.data.products, ownProps.type),
    newProducts: getNewProducts(state.data.products, ownProps.type),
    featuredProducts: getBestSellerProducts(state.data.products, ownProps.type).reverse(),
    symbol: state.data.symbol,
    items: state.data.items
})

const mapDispatchToProps = (dispatch) => ({

    addWishlist: (item) => dispatch(Actions.addWishlist(item)),
    fetchArtwork:() => dispatch(Actions.fetchArtwork()) ,
    addToCart:(item, qty)=>dispatch(addToCart(item, qty))
   
})

export default connect(mapStateToProps, mapDispatchToProps) (SpecialProducts);