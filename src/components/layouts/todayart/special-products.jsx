import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {connect} from 'react-redux'

import {getBestSeller, getBestSellerProducts, getMensWear, getNewProducts, getWomensWear} from '../../../services/index'
import {addToCart, addToWishlist, addToCompare} from "../../../actions/index";
import ProductItem from '../common/product-item';

import {Actions} from '../../../actions'
import {ActionTypes} from '../../../constants/ActionTypes'

class SpecialProducts extends Component {

    componentWillMount(){
        // this.fetchMoreItems();
        this.props.fetchArtwork();
    }

    render (){

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

        const {symbol, addToCart, addToWishlist, addToCompare, items} = this.props

        return (
            <div>
                <div className="title1 section-t-space">
                    <h4>exclusive products</h4>
                    <h2 className="title-inner1">special products</h2>
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
                                                     onAddToCompareClicked={() => addToCompare(item)}
                                                     onAddToWishlistClicked={() => addToWishlist(item)}
                                                     onAddToCartClicked={asyncAddCart} key={index} /> )
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="no-slider row">
                                    { items.map((item, index ) =>
                                        <ProductItem item={item} symbol={symbol}
                                                     onAddToCompareClicked={() => addToCompare(item)}
                                                     onAddToWishlistClicked={() => addToWishlist(item)}
                                                     onAddToCartClicked={asyncAddCart} key={index} /> )
                                    }
                                </div>
                            </TabPanel>
                        </Tabs>
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
    // fetchCategory: (id) => dispatch(Actions.fetchCategory(id)),
    fetchArtwork:() => dispatch(Actions.fetchArtwork()),
    addToCart:(item, qty)=>dispatch(addToCart(item, qty))
   
})

export default connect(mapStateToProps, mapDispatchToProps) (SpecialProducts);

// export default connect(mapStateToProps, {addToCart, addToWishlist, addToCompare}) (SpecialProducts);