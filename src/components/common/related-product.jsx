import React, {Component} from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import ProductItem from '../layouts/common/product-item';
import {ActionTypes} from '../../constants/ActionTypes'
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { addToCart } from '../../actions'
import {Actions} from '../../actions'



class RelatedProduct extends Component {


    constructor(props) {
        super(props);

        this.state = {
           
            endSlice: 6
        }
    }

    componentWillMount(){        
        this.props.fetchArtwork();
    }


    componentDidMount() {
        this.setState({
            ...this.state,
            endSlice: this.getRandomArbitrary(6, this.props.items.length)
        })

        console.log("this.state", this.state);
    }

    // min (포함) 과 max (불포함) 사이의 난수를 반환
    getRandomArbitrary = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }



    render (){
        const {items, symbol} = this.props;

                         

      

        return (
            <section className="section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-12 product-related">
                            <h2>related products 추천 상품</h2>
                        </div>
                    </div>



                                <div className="no-slider row">
                                    { items.slice(0, 4).map((item, index ) =>
                                        <ProductItem item={item} symbol={symbol}
                                                     
                                                     
                                                     onAddToCartClicked={() => addToCart(item, 1)} key={index} /> )
                                    }
                                </div>
                      



                    {/* <div className="row search-product">
                        { items.slice(0, 6).map((item, index ) =>
                            <div key={index} className="col-xl-2 col-md-4 col-sm-6">
                                <ProductItem item={item} symbol={symbol}
                                             onAddToCompareClicked={() => addToCompare(item)}
                                             onAddToWishlistClicked={() => addToWishlist(item)}
                                             onAddToCartClicked={() => addToCart(item, 1)} key={index} />

                            </div>)
                        }
                    </div> */}
                </div>
            </section>
        )
    }
}


// function mapStateToProps(state) {
//     return {
//         items: getBestSeller(state.data.products),
//         symbol: state.data.symbol,
        
//     }
// }

// export default connect(mapStateToProps, {addToCart, addToWishlist, addToCompare})(RelatedProduct);

const mapStateToProps = (state) => ({ 
    symbol: state.data.symbol,
    items: state.data.items
})

const mapDispatchToProps = (dispatch) => ({
    // fetchCategory: (id) => dispatch(Actions.fetchCategory(id)),
    fetchArtwork:() => dispatch(Actions.fetchArtwork()) 
   
})

export default connect(mapStateToProps, mapDispatchToProps) (RelatedProduct);

