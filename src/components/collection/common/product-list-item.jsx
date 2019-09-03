import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { Files } from '../../../utils';
import { getRelatedItems } from '../../../services';
import { Actions } from '../../../actions'

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
                                ><img src={image} className="img-fluid" alt="" /></Link>
                            </div>
                            <div className="cart-info cart-wrap">
                                <a  href="javascript:void(0)" title="Add to cart" onClick={() => onAddToCartClicked(this.props.item, 1)}>
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                </a>
                                <a  href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked} >
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                </a>
                                <a  href="javascript:void(0)" data-toggle="modal"

                                   data-target="#quick-view"
                                   title="Quick View"
                                   onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i></a>
                                

                            </div>
                            {/* {item.variants?
                            <ul className="product-thumb-list">
                                {item.variants.map((vari, i) =>
                                    <li className={`grid_thumb_img ${(vari.images === this.state.image)?'active':''}`} key={i}>
                                        <a href="javascript:void(0)" title="Add to Wishlist">
                                            <img src={`${vari.images}`} onClick={() => this.onClickHandle(vari.images)} />
                                        </a>
                                    </li>)
                                }
                            </ul>:''} */}

                        </div>
                        <div className="product-detail">
                            <div>
                                <div className="rating">
                                    {/* 카테고리에서 보이는 작품에 대한 이미지 */}
                                </div>

                                <Link to={{pathname :`${process.env.PUBLIC_URL}/product/${item.productId}`,
                                state :{ item:this.props.item }}}
                                >

                                    <h4>{item.productName}</h4>

                                </Link>

                                <h6><span className="money">{item.artist.artistName}</span></h6>
                                <h6>{symbol}{item.productPrice}</h6>

                                {item.variants?
                                <ul className="color-variant">
                                    {item.variants.map((vari, i) => {
                                        return (
                                            <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                                    })}
                                </ul>:''}
                            </div>
                        </div>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
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
                                                <h3>{symbol}{item.productPrice}</h3>
                                                   
                                                    <div className="border-product">
                                                        <h6 className="product-title">product details</h6>
                                                        <p>{item.productContent}</p>
                                                    </div>
                                                    <div className="product-description border-product">
                                                        
                                                        <div className="size-box">
                                                            <ul>
                                                               <li><a href="#">{item.productSize}</a></li>
                                                                
                                                            </ul>
                                                        </div>
                                                        <h6 className="product-title">quantity</h6>
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
                                                        <button  className="btn btn-solid" onClick={() => onAddToCartClicked(item, this.state.quantity)} >add to cart</button>
                                                       <Link to={{pathname :`${process.env.PUBLIC_URL}/product/${item.productId}`,
                                                        state :{ item:this.props.item }}} className="btn btn-solid">>view detail</Link>
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