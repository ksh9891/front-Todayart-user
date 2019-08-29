import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Actions } from '../../../actions'


import { getTotal, getCartProducts } from '../../../reducers'
import { addToCart, addToWishlist, addToCompare } from '../../../actions'
import {getVisibleproducts} from '../../../services';
import ProductListItem from "./product-list-item";

import { Actions } from '../../../actions'

class ProductListing extends Component {

    constructor (props) {
        super (props)

        this.state = { limit: 4, hasMoreItems: true };

    }

    componentWillMount(){
        this.fetchMoreItems();
        this.props.fetchArtwork();
    }

    fetchMoreItems = () => {
        if (this.state.limit >= this.props.items.length) {
            this.setState({ hasMoreItems: false });
            return;
        }
        // a fake async api call
        setTimeout(() => {
            this.setState({
                limit: this.state.limit + 4
            });
        }, 3000);


    }

    render (){
<<<<<<< HEAD
        const {products, addToCart, symbol, addToWishlist, addToCompare, items} = this.props;
=======
        const {products, items, addToCart, symbol, addToWishlist, addToCompare} = this.props;
       



>>>>>>> bb6217e418292c0898d49aa476c80942400bcf46
        console.log(this.props.colSize)
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
                                                         onAddToCompareClicked={() => addToCompare(item)}
                                                         onAddToWishlistClicked={() => addToWishlist(item)}
                                                         onAddToCartClicked={addToCart} key={index}/>
                                        </div>)
                                    }
                                </div>
                            </InfiniteScroll>
                            :
                            <div className="row">
                                <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`} className="img-fluid mb-4" />
                                    <h3>Sorry! Couldn't find the product you were looking For!!!    </h3>
                                    <p>Please check if you have misspelt something or try searching with other words.</p>
                                    <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid">continue shopping</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    products: getVisibleproducts(state.data, state.filters),
<<<<<<< HEAD
    items: state.data.items,
    symbol: state.data.symbol
=======
    symbol: state.data.symbol,
    items : state.data.items
>>>>>>> bb6217e418292c0898d49aa476c80942400bcf46
})

const mapDispatchToProps = (dispatch) => ({
    fetchArtwork: () => dispatch(Actions.fetchArtwork()),
<<<<<<< HEAD
    addToCart:() => dispatch(addToCart()),
    addToWishlist:() => dispatch(addToWishlist()),
    addToCompare:() => dispatch(addToCompare())
=======
    addToCart: () => dispatch(addToCart()),
    addToWishlist: () => dispatch(addToWishlist()),
    addToCompare: () => dispatch(addToCompare())
   
>>>>>>> bb6217e418292c0898d49aa476c80942400bcf46
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing)