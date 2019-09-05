import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { Files } from '../../../utils';
import { getRelatedItems } from '../../../services';
import "./productlistitem.css";
import CurrencyFormat from 'react-currency-format';


class ProductListItem extends Component {

    constructor(props){
        super(props)

        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: ''
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onClickHandle(img) {
        this.setState({ image : img} );
    }

    minusQty = () => {
        if(this.state.quantity > 1) {
            this.setState({stock: 'InStock'})
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    plusQty = () => {
        if(this.props.product.stock >= this.state.quantity) {
            this.setState({quantity: this.state.quantity+1})
        }else{
            this.setState({stock: 'Out of Stock !'})
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }


    render() {
        const {symbol, onAddToCartClicked, onAddToWishlistClicked, item} = this.props;
        const {open} = this.state;
        const { fileName } = item.thumbnail;

        const image = Files.filePath(fileName);

            // let RatingStars = []
            // for(var i = 0; i < product.rating; i++) {
            //     RatingStars.push(<i className="fa fa-star" key={i}></i>)
            // }

        return (

                    <div className="product-box">
                        <div className="img-wrapper">
                            <div className="front">
                                <Link to={{pathname :`${process.env.PUBLIC_URL}/product/${item.productId}`,
                                state :{ item:this.props.item }}}
                                ><img
                                    src={image}
                                    className="img-fluid"
                                    alt="" /></Link>
                            </div>
                            <div className="cart-info cart-wrap">
                                <a title="Add to cart" onClick={() => onAddToCartClicked(this.props.item, 1)}>
                                    <i className="fa fa-shopping-cart" style={{"color": "white", "cursor": "pointer"}} aria-hidden="true" />
                                </a>
                                <a title="Add to Wishlist" onClick={onAddToWishlistClicked} >
                                    <i className="fa fa-heart" style={{"color": "white", "cursor": "pointer"}} aria-hidden="true" />
                                </a>
                                <a data-toggle="modal"
                                   data-target="#quick-view"
                                   title="Quick View"
                                   onClick={this.onOpenModal}><i className="fa fa-search" style={{"color": "white", "cursor": "pointer"}} aria-hidden="true" /></a>
                                
                            </div>
                            {item.variants?
                            <ul className="product-thumb-list">
                                {item.variants.map((vari, i) =>
                                    <li className={`grid_thumb_img ${(vari.images === this.state.image)?'active':''}`} key={i}>
                                        <a href="javascript:void(0)" title="Add to Wishlist">
                                            <img src={`${vari.images}`} onClick={() => this.onClickHandle(vari.images)} />
                                        </a>
                                    </li>)
                                }
                            </ul>:''}

                        </div>
                        <div className="product-detail">
                            <div>
                                <div className="rating" />
                                <Link to={{pathname :`${process.env.PUBLIC_URL}/product/${item.productId}`,
                                state :{ item:this.props.item }}}
                                >
                                    <h4>{item.productName}</h4>
                                </Link>
                                <h6><span className="money">{item.artist.artistName}</span></h6>
                                <h6><CurrencyFormat value={item.productPrice} suffix={symbol} displayType={'text'} thousandSeparator={true} /></h6>
                                {item.variants?
                                <ul className="color-variant">
                                    {item.variants.map((vari, i) => {
                                        return (
                                            <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                                    })}
                                </ul>:''}
                            </div>
                        </div>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content quick-view-modal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-6  col-xs-12">
                                            <div className="quick-view-img">
                                                <img src={image} alt="" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 rtl-text">
                                            <div className="product-right">
                                                <h2> {item.productName} </h2>
                                                <h3><CurrencyFormat value={item.productPrice} suffix={symbol} displayType={'text'} thousandSeparator={true} /></h3>
                                                <div className="border-product">
                                                    <h6 className="product-title">작가 | Artist </h6>
                                                    <li>{item.artistName} </li>
                                                </div>
                                                <div className="product-description border-product">

                                                    <div className="size-box">
                                                        <ul>
                                                        <h6 className="product-title">상품크기 | Size</h6>
                                                           <li>{item.productSize}</li>

                                                        </ul>
                                                    </div>
                                                    <h6 className="product-title">수량 | quantity</h6>
                                                    <div className="qty-box">
                                                        <div className="input-group">
                                                          <span className="input-group-prepend">
                                                            <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                                             <i className="fa fa-angle-left"></i>
                                                            </button>
                                                          </span>
                                                            <input type="text" name="quantity" value={this.state.quantity}  onChange={this.changeQty} className="form-control input-number" />
                                                            <span className="input-group-prepend">
                                                            <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                                            <i className="fa fa-angle-right"></i>
                                                            </button>
                                                           </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-buttons">
                                                    <button  className="btn btn-solid" onClick={() => onAddToCartClicked(item, this.state.quantity)} > 장바구니 </button>
                                                  <Link to={{pathname :`${process.env.PUBLIC_URL}/product/${item.productId}`,
                                                    state :{ item:this.props.item }}} className="btn btn-solid"> 상품페이지로 이동</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
        )
    }
}

export default ProductListItem;