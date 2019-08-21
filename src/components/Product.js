import React, { useEffect } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from '../actions'


function Product({ items }) {

    // useEffect(() => {
    //     fetchArtwork()
    // }, [])

    return (

        <div className="row">
            {
                items.map((item, productId) => {
                    const { productName, productPrice, productContent } = item;
                    return (

                        < div className="col-md-6 col-lg-4 col-xl-3" key={productId} >
                            <div className="card text-center card-product">
                                <div className="card-product__img">
                                    <img className="card-img" src="img/product/product1.png" alt="" />
                                    <ul className="card-product__imgOverlay">
                                        <li>
                                            <button><i className="ti-search" /></button>
                                        </li>
                                        <li>
                                            <button><i className="ti-shopping-cart" /></button>
                                        </li>
                                        <li>
                                            <button><i className="ti-heart" /></button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <p>{productContent}</p>
                                    <h4 className="card-product__title"><a href="single-product.html">{productName}</a></h4>
                                    <p className="card-product__price">{productPrice}</p>
                                </div>
                            </div>
                        </div >

                    );
                })

            }
        </div >
    );
}

const mapStateToProps = (state) => ({
    items: state.product.items
})

const mapDispatchToProps = (dispatch) => ({
    fetchArtwork: () => dispatch(Actions.fetchArtwork())
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)