import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


import { getTotal, getCartProducts } from '../../../reducers'
import {addToCart, addToWishlist, addToCompare, Actions} from '../../../actions'
import {getVisibleproducts} from '../../../services';
import ProductListItem from "./product-list-item";

class ProductListing extends Component {

    constructor (props) {
        super (props);
        console.log(props);
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

    // getDerivedStateFromProps(nextProps, prevState){
    //     if(prevState.id!==nextProps.id){
    //     return {hasMoreItems: true}}
    //     return prevState
    // }
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log("shouldComponentUpdate111111", this.state, nextState, this.props, nextProps);
    //     if(this.props.id!==nextProps.id){
    //         return true
    //     }
    //     return true
    // }



   
    // static getDerivedStateFromProps(props, state) {
    //     if(props.items.length <= state.limit) {
    //         return {...state, hasMoreItems: false}
    //     } else {
    //         setTimeout(() => {
                
    //         }, 3000);
    //         return {...state, hasMoreItems: true,  limit: state.limit + 4}
    //     }
       
    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log("should", this.props, nextProps, this.state, nextState)

    //     if(nextState == this.state && this.props !== nextProps) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log("shouldComponentUpdate", this.state, nextState);
    //     return false
    // }


    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.setState({
    //         ...this.state,
    //         hasMoreItems: true
    //     })
    // }

    // componentDidCatch(error, errorInfo) {
    //     console.log("error", error);
    // }

    // componentDidMount() {

        


    //     console.log("props", this.props);
    //     this.setState({
    //         ...this.state,
    //         id: this.props.id           
    //     });

    //     // if ( this.props.id == 0){
    //     //     this.props.fetchArtwork();
    //     // }else {
    //     //     this.props.fetchCategory(this.props.id);
    //     // }
    //     // this.fetchMoreItems();
    // }

    // componentDidMount(){        
    //     if ( this.props.id == 0){
    //         this.props.fetchArtwork();
    //     }else {
    //         this.props.fetchCategory(this.props.id);
    // }
// }



    fetchMoreItems = () => {   

        console.log("33");
        if (this.state.limit >= this.props.items.length) {
            console.log("44");
            this.setState({ 
                ...this.state,
                hasMoreItems: false });
           // return;
        }else{
            console.log("5");
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    limit: this.state.limit + 4,
                    hasMoreItems: true
                });
            }, 1000);
        }
        // a fake async api call
        
          
        
        // // console.log("items :::" , this.props.items)
        // // this.props.items.slice(this.state.limit-4, this.state.limit)
        // // console.log("items >>>>>>> " ,this.props.items.slice(this.state.limit-4, this.state.limit ))
        // if (this.state.limit >= this.props.items.length) {  
        //     this.setState({ hasMoreItems: false });
        //     return;
        // }
        
        // this.setState({
        //     ...this.state,
        //     items : this.props.items.slice(this.state.limit-4, this.state.limit ),
        //     hasMoreItems : true,
        //     limit: this.state.limit + 4

        // })


        // // // a fake async api call
        // // setTimeout(() => {
        // //     this.setState({
        // //         limit: this.state.limit + 4
        // //     });
        // // }, 1000);

    }

    render (){
        const {products, items, addToCart, symbol, addToWishlist, addToCompare} = this.props;
        console.log("items >>",items);
        console.log("items.length >> ",items.length)
        console.log("this.state.limit >>",this.state.limit);
        console.log("this.fetchMoreItems >> ", this.fetchMoreItems);
        console.log("this.state.hasMoreItems >> ", this.state.hasMoreItems);

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
                                            <ProductListItem product={item} symbol={symbol}
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
    fetchArtwork:() => dispatch(Actions.fetchArtwork()),
    addToCart: () => dispatch(addToCart()),
    addToWishlist: () => dispatch(addToWishlist()),
    addToCompare: () => dispatch(addToCompare())
})

export default connect(
    mapStateToProps, {addToCart, addToWishlist, addToCompare}
)(ProductListing)