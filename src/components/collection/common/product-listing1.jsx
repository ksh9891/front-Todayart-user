import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Actions } from '../../../actions'
import {ActionTypes} from '../../../constants/ActionTypes'


import { getTotal, getCartProducts } from '../../../reducers'
import { addToCart, addToWishlist, addToCompare } from '../../../actions'
import {getVisibleproducts} from '../../../services';
import ProductListItem from "./product-list-item";

class ProductListing1 extends Component {

    constructor (props) {
        super (props);
        console.log(props);
        this.state = {
            limit: 4,
            hasMoreItems: true,
            id:this.props.id
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("should", this.props, nextProps, this.state, nextState)
        
        if(this.props !== nextProps) {
            return true;
        } else {
            return false;
        }

        // if(nextState !== this.state) {
        //     return true;
        // } else {
        //     return false;
        // }
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log("shouldComponentUpdate", this.state, nextState);
    //     return false
    // }



    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("prevState >> ", prevState);
        console.log("Didstate >> ",this.state);
        console.log("this.props.ltems.length >> ",this.props.items.length);

        this.setState({
            ...this.state,
            hasMoreItems: true
        })
    }

    componentDidCatch(error, errorInfo) {
        console.log("error", error);
    }

    componentDidMount() {
        console.log("props", this.props);
        this.setState({
            ...this.state,
            id: this.props.id           
        });

        // if ( this.props.id == 0){
        //     this.props.fetchArtwork();
        // }else {
        //     this.props.fetchCategory(this.props.id);
        // }
        // this.fetchMoreItems();
    }

    // componentDidMount(){        
    //     if ( this.props.id == 0){
    //         this.props.fetchArtwork();
    //     }else {
    //         this.props.fetchCategory(this.props.id);
    // }
// }

    fetchMoreItems = () => {
        if (this.state.limit >= this.props.items.length) {
            console.log("!23123");
            this.setState({ hasMoreItems: false });
            return;
        }
        // a fake async api call
        setTimeout(() => {
            this.setState({
                limit: this.state.limit + 4
            });
        }, 1000);


    }

    render (){
        const {products, items, addToCart, symbol, addToWishlist, addToCompare} = this.props;
        console.log("items >>",items);
        console.log("items.length >> ",items.length)
        console.log("this.state.limit >>",this.state.limit);

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
                                                         onAddToCompareClicked={() => addToCompare(item)}
                                                         onAddToWishlistClicked={() => addToWishlist(item)}
                                                         onAddToCartClicked={asyncAddCart} key={index}/>
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
    fetchArtwork:() => dispatch(Actions.fetchArtwork()),
    addToCart: (item, qty) => dispatch(addToCart(item, qty)),
    addToWishlist: () => dispatch(addToWishlist()),
    addToCompare: () => dispatch(addToCompare())
   
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing1)