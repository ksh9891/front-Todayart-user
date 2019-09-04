import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import Modal from 'react-responsive-modal';
import { Actions } from '../../../../actions'
import { ActionTypes } from '../../../../constants/ActionTypes'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux'
import "./detailprice.css";
import CurrencyFormat from "react-currency-format";

class DetailsWithPrice extends Component {

    constructor (props) {
        super (props)
        this.state = {
            open: false,
            quantity: 1,
            stock: 'InStock',
            nav3: null
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.setState({
            nav3: this.slider3
        });
    }

    minusQty = () => {
        if (this.state.quantity > 1) {
            this.setState({ stock: 'InStock' })
            this.setState({ quantity: this.state.quantity - 1 })
        }
    }

    plusQty = () => {
        if (this.props.item.remain > this.state.quantity) {
            this.setState({ quantity: this.state.quantity + 1 })
        } else {
            this.setState({ stock: 'Out of Stock !' })
        }
    }

    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render (){
        const {symbol, item, addToCartClicked, BuynowClicked} = this.props
        const addWishilist=(item)=>{
            this.props.addWishlist(item)
                .then(response => {
                    if (response.type == ActionTypes.ADD_WISHLIST_SUCCESS) {
                        toast.success("작품이 찜하기에 추가되었습니다");
                        console.log('찜하기성공!')

                    }
                }).catch(error => {
                    console.log('error >>', error)
                })
        }

        var colorsnav = {
            slidesToShow: 6,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (
            <div className="col-lg-6 rtl-text">
                <div className="product-right">
                    <h2> {item.productName}  <small className="product-fontsize">{item.artistName}</small> </h2>
                    <h3>{symbol}<CurrencyFormat value={item.productPrice} displayType={'text'} thousandSeparator={true} /></h3>
                    {item.variants?
                    <ul >
                        <Slider {...colorsnav} asNavFor={this.props.navOne} ref={slider => (this.slider1 = slider)} className="color-variant">
                            {item.variants.map((vari, i) => {
                                return <li className={vari.color} key={i} title={vari.color}></li>
                            })}
                        </Slider>
                    </ul>:''}
                    <div className="product-description border-product">
                        <div>
                            <div>
                                <div>
                                    <h6 className="product-title size-text">작품크기 | Size</h6>
                                    <li >{item.productSize}</li>
                                </div>
                            </div>
                            <div className="product-stock">
                                <span className="instock-cls">{this.state.stock}</span>
                                <h6 className="product-title">수량 | quantity</h6>
                            </div>
                        </div>
                        <div className="qty-box">
                            <div className="input-group">
                                <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                     <i className="fa fa-angle-left" />

                                    </button>
                                </span>
                                <input type="text" name="quantity" value={this.state.quantity} onChange={this.changeQty} className="form-control input-number" />
                                <span className="input-group-prepend">

                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                <i className="fa fa-angle-right" />
                                </button>
                               </span>
                            </div>
                        </div>
                    </div>
                    <div className="product-buttons" >
                        <a className="btn btn-solid" onClick={() => {
                            addToCartClicked(item, this.state.quantity);
                            this.props.calcPrice()
                        }}
                        > 장바구니 </a>
                        <Link to={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid" onClick={() => BuynowClicked(item, this.state.quantity)} > 바로구매</Link>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">작품설명 | Details</h6>
                        <p>{item.productContent}</p>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">공유 | share it</h6>
                        <div className="product-icon">
                            <ul className="product-social">
                                <li><a href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="https://plus.google.com/discover" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                                <li><a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i></a></li>
                            </ul>
                                <button className="wishlist-btn" onClick={() => addWishilist(item)}>
                                    <i className="fa fa-heart" /><span className="title-font"> 찜하기 </span>
                                </button>
                        </div>
                    </div>
                    <div className="border-product" />
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Sheer Straight Kurta</h5>
                            </div>
                            <div className="modal-body">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </Modal>
                <ToastContainer />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addWishlist: (item) => dispatch(Actions.addWishlist(item))
})

export default connect(null,mapDispatchToProps)(DetailsWithPrice);
