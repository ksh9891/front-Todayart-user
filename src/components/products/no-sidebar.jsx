import React, {Component} from 'react';
import Slider from 'react-slick';
import '../common/index.scss';
import {connect} from "react-redux";


// import custom Components
import RelatedProduct from "../common/related-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe, addToWishlist } from '../../actions'
import ImageZoom from './common/product/image-zoom'
import SmallImages from './common/product/small-image'

import { Actions } from '../../actions'
import { Files } from '../../utils';




class NoSideBar extends Component {

    constructor() {
        super();
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount(props) {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });

        const {id} = this.props.match.params
        this.props.fetchSingleProduct2(id);

    }

    render(){
       
        const {symbol, item, addToCart, addToCartUnsafe, addToWishlist} = this.props
        var products = {
            fade: true
        };

        var productsnav = {
            slidesToShow: 3,
            slidesToScroll:1,
            swipeToSlide:true,
            draggable:true,
            focusOnSelect: true
        };
        
        const { fileName } = item.thumbnail;       
        const image = Files.filePath(fileName);

        return (
            <div>

                <Breadcrumb title={' Product / '+item.productName} />

                {/*Section Start*/}
                {(item)?
                <section >
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 product-thumbnail">
                                    
                                            <div >
                                                <ImageZoom image={image} className="img-fluid image_zoom_cls-0" />
                                            </div>
                                       
                                    <SmallImages item={item} settings={productsnav} navOne={this.state.nav1} />
                                </div>
                                <DetailsWithPrice symbol={symbol} item={item} navOne={this.state.nav1} addToCartClicked={addToCart} BuynowClicked={addToCartUnsafe} addToWishlistClicked={addToWishlist} />
                            </div>
                        </div>
                    </div>
                </section> : ''}
                {/*Section End*/}

                <section className="tab-product m-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-lg-12">
                                <DetailsTopTabs item={item} />
                            </div>
                        </div>
                    </div>
                </section>

                <RelatedProduct />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
        item: state.data.item,
        symbol: state.data.symbol
    
    
})




const mapDispatchToProps = (dispatch) => ({
    fetchSingleProduct2: (id) => dispatch(Actions.fetchSingleProduct2(id)),
    addToCart: () => dispatch(addToCart()),
    addToWishlist: () => dispatch(addToWishlist()),
    addToCartUnsafe: () => dispatch(addToCartUnsafe())
   
})

export default connect(mapStateToProps, mapDispatchToProps) (NoSideBar);