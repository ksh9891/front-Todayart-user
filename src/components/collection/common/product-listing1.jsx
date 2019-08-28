import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Actions } from '../../../actions'


import { getTotal, getCartProducts } from '../../../reducers'
import { addToCart, addToWishlist, addToCompare } from '../../../actions'
import {getVisibleproducts} from '../../../services';
import ProductListItem from "./product-list-item";

class ProductListing1 extends Component {

    constructor (props) {
        super (props)
        this.state = { limit: 4, hasMoreItems: true, id:this.props.id };       
    }

    componentWillMount(){
        this.fetchMoreItems(); 
        
    }
    
    componentDidMount(){
        console.log('id2 : ' , this.state.id)             
        this.props.fetchCategory(this.state.id);    
    }

        shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { id } = nextProps.id;
        if (this.props !== nextProps) {
            console.log('CollectionCategory 2 >>  ', id);
            return true;
        }
        return false;
    }


    componentWillUpdate(nextProps, nextState){
        const { id } = nextProps.id;
        console.log('componentWillUpdate >>  ', id);

        this.props.fetchCategory(id);    
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
      
        const {products, items, addToCart, symbol, addToWishlist, addToCompare} = this.props;
       



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
    symbol: state.data.symbol,
    items : state.data.items
})

const mapDispatchToProps = (dispatch) => ({
    fetchCategory: (id) => dispatch(Actions.fetchCategory(id)),
    addToCart: () => dispatch(addToCart()),
    addToWishlist: () => dispatch(addToWishlist()),
    addToCompare: () => dispatch(addToCompare())
   
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing1)