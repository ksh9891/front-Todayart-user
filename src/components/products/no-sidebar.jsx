import React, {Component} from 'react';
import Slider from 'react-slick';
import '../common/index.scss';
import {connect} from "react-redux";


// import custom Components
import RelatedProduct from "../common/related-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe, addToWishlist, addToCompare } from '../../actions'
import ImageZoom from './common/product/image-zoom'
import SmallImages from './common/product/small-image'

import { Actions } from '../../actions'
import { Files } from '../../utils';



// import { getTotal, getCartProducts } from '../../../reducers'
import {getVisibleproducts} from '../../services';
// // import ProductListItem from "product-list-item";


class NoSideBar extends Component {
// this.props.location.state.item
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            item: this.props.location.state.item
        };
        console.log("constructor props >> ",props)
    }


    
    componentDidMount() {
        console.log("componentDidMount", this.state)

        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });



    }

    componentWillMount(){
        const { id } = this.props.match.params
        this.props.fetchSingleProduct2(id);
        }

    render(){


        console.log("render>>",this.props, this.state)
        const {symbol, addToCart, addToCartUnsafe, addToWishlist} = this.props
        const {thumbnail} = this.state.item;


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
        

        const { fileName } = thumbnail?thumbnail:{};
        const image = Files.filePath(fileName);

        return (
            <div>

                <Breadcrumb title={' Product / '+this.state.item.productName} />

                {/*Section Start*/}
                {(this.state.item)?
                <section >
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 product-thumbnail">

                                    {/* <Slider {...products} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} className="product-slick">
                                        {item.variants.map((vari, index) =>
                                            <div key={index}>
                                                <ImageZoom image={vari.images} className="img-fluid image_zoom_cls-0" />
                                            </div>
                                        )}
                                    </Slider> */}

                                            <div>
                                                <ImageZoom image={image} className="img-fluid image_zoom_cls-0" />
                                            </div>

                                       
                                    <SmallImages item={this.state.item} settings={productsnav} navOne={this.state.nav1} />

                                </div>
                                <DetailsWithPrice symbol={symbol} item={this.state.item} navOne={this.state.nav1} addToCartClicked={addToCart} BuynowClicked={addToCartUnsafe} addToWishlistClicked={addToWishlist} />
                            </div>
                        </div>
                    </div>
                </section> : ''}
                {/*Section End*/}

                <section className="tab-product m-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-lg-12">
                                <DetailsTopTabs item={this.state.item} />
                            </div>
                        </div>
                    </div>
                </section>

                <RelatedProduct />
            </div>
        )
    }
}

// const mapStateToProps = (state, ownProps) => {
//     let productId = ownProps.match.params.id;
//     return {
//         item: state.data.products.find(el => el.id == productId),
//         symbol: state.data.symbol
//     }
// }

// export default connect(mapStateToProps, {addToCart, addToCartUnsafe, addToWishlist}) (NoSideBar);

const mapStateToProps = (state) => ({
    products: getVisibleproducts(state.data, state.filters),
    item: state.data.item,
    symbol: state.data.symbol
})

const mapDispatchToProps = (dispatch) => ({
    fetchSingleProduct2: (id) => dispatch(Actions.fetchSingleProduct2(id)),
    addToCart:() => dispatch(addToCart()),
    addToWishlist:() => dispatch(addToWishlist()),
    addToCompare:() => dispatch(addToCompare())
})

export default connect(mapStateToProps, mapDispatchToProps)(NoSideBar)

