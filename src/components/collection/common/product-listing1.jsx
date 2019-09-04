import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Actions } from '../../../actions'
import {ActionTypes} from '../../../constants/ActionTypes'

import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { addToCart } from '../../../actions'
import {getVisibleproducts} from '../../../services';
import ProductListItem from "./product-list-item";

class ProductListing1 extends Component {

    constructor (props) {
        super (props);
        console.log("props", props);
        this.state = {
            limit: 0,
            hasMoreItems: true,
            id:this.props.id

        };
    }

    componentWillReceiveProps(){

        if (this.state.limit < this.props.items.length) {
            this.setState({
                ...this.state,
                limit: this.state.limit + 4,
                hasMoreItems: true

            })
        }else {
            this.setState({
                ...this.state,
                limit: 0,
                hasMoreItems: true
            })
        }
    }

    fetchMoreItems = () => {
        if (this.state.limit >= this.props.items.length) {
            this.setState({
                ...this.state,
                hasMoreItems: false });
            // return;
        }else{
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    limit: this.state.limit + 4,
                    hasMoreItems: true
                });
            }, 1000);
        }
    }

    render (){
        const {products, items, addToCart, symbol} = this.props;

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
                <div className="product-wrapper-grid">
                    <div className="container-fluid">
                        {items.length > 0 ?
                            <InfiniteScroll
                                dataLength={this.state.limit} //This is important field to render the next data
                                next={this.fetchMoreItems}
                                hasMore={this.state.hasMoreItems}
                                loader={<div className="loading-cls"></div>}
                                endMessage={
                                    <p className="seen-cls seen-it-cls">
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                <div className="row">
                                    { items.slice(0, this.state.limit).map((item, index) =>
                                        <div className={`${this.props.colSize===3?'col-xl-3 col-md-6 col-grid-box':'col-lg-'+this.props.colSize}`} key={index}>
                                        <ProductListItem item={item} symbol={symbol}
                                                         onAddToWishlistClicked={() => addWishilist(item)}
                                                         onAddToCartClicked={asyncAddCart} key={index}/>
                                        </div>)
                                    }
                                </div>
                            </InfiniteScroll>
                            :
                            <div className="row">
                                <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`} className="img-fluid mb-4" />
                                    <h3>Sorry! Couldn't find the product you were looking For!!!</h3>
                                    <p>Please check if you have misspelt something or try searching with other words.</p>
                                    <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid">continue shopping</Link>
                                </div>
                            </div>
                        }
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    products: getVisibleproducts(state.data, state.filters),
    symbol: state.data.symbol,
    items : state.data.items
})

const mapDispatchToProps = (dispatch) => ({
    fetchCategory: (id) => dispatch(Actions.fetchCategory(id)),
    fetchArtwork:() => dispatch(Actions.fetchArtwork()),
    addWishlist: (item) => dispatch(Actions.addWishlist(item)), 
    addToCart: (item, qty) => dispatch(addToCart(item, qty))
   


})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing1)