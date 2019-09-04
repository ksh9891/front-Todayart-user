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
                            <h2>이런 작품은 어떠세요~?</h2>
                        </div>
                    </div>
                    <div className="row search-product">
                        { items.slice(this.state.endSlice-6, this.state.endSlice).map((item, index ) =>
                            <div key={index} className="col-xl-2 col-md-4 col-sm-6">
                                <ProductItem item={item} symbol={symbol}    
                                             key={index} />
                            </div>)
                        }
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
       
        symbol: state.data.symbol,
        items: state.data.items
    }
}



const mapDispatchToProps = (dispatch) => ({   
     addWishlist: (item) => dispatch(Actions.addWishlist(item)),
    fetchArtwork:() => dispatch(Actions.fetchArtwork()) ,
    addToCart:(item, qty)=>dispatch(addToCart(item, qty))
   
})



export default connect(mapStateToProps,mapDispatchToProps)(RelatedProduct);
