import React, {Component} from 'react';
import Slider from 'react-slick';
import '../common/index.scss';
import {connect} from "react-redux";
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// import custom Components
import RelatedProduct from "../common/related-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe, addToWishlist } from '../../actions'
import ImageZoom from './common/product/image-zoom'
import SmallImages from './common/product/small-image'
import { withRouter } from 'react-router-dom'

import { Actions } from '../../actions'
import { Files } from '../../utils';
import { ActionTypes } from '../../constants/ActionTypes';





class NoSideBar extends Component {
    // this.props.location.state.item
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            item : this.props.location.state?this.props.location.state.item:null          
        };
    }

    componentWillReceiveProps(){
        

        // this.props.fetchSingleProduct2(this.props.match.params.id)
        // .then(() => this.setState({ ...this.state, item: this.props.item }));
        
        // if(this.state.item === null){
        //     this.setState({
        //         ...this.state,
        //         item : this.props.item
        //     })
        // }

    }

    componentWillMount(){
        
        console.log('WillMount >> ', this.props)
        this.props.fetchSingleProduct2(this.props.match.params.id)
        .then(() => this.setState({ ...this.state, item: this.props.item }));
        
        if(this.state.item === null){
            this.setState({
                ...this.state,
                item : this.props.item
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate111111", this.state, nextState);

        console.log("shouldComponentUpdate12221", this.props, nextProps);
        if(this.props.match.params.id!==nextProps.match.params.id || this.state.item !== nextState.item){
            console.log("들어ㅏ왔니?")

            return true
        }
        return false
    }

    componentDidUpdate(preProps, preState) {
        console.log("========================== component update start ====================")
        console.log(preProps, this.props);

        if(preProps.match.params.id!==this.props.match.params.id){
            console.log("실행!!");
            this.props.fetchSingleProduct2(this.props.match.params.id)
                .then(response => {
                    if(response.type === ActionTypes.FETCH_SINGLEPRODUCT_SUCCESS) {
                        this.setState({ ...this.state, item: this.props.item })
                       
                    }

                    console.log("패치 완료!");
                })
        }


        if (this.props.location.pathname !== preProps.location.pathname) {
            window.scrollTo(0, 0);
          }
        console.log("========================== component update end ====================")
        // this.props.fetchSingleProduct2(this.props.match.params.id)
        // .then(() => this.setState({ ...this.state, item: this.props.item }));


        
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            nav1: this.slider1,
            nav2: this.slider2
        });

       }

    render(){
        const {symbol, addToCartUnsafe, addToWishlist, calcPrice, auth} = this.props
        const {thumbnail} = this.state.item;
        const { userDetails } = auth;

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
            
        const addWishilist = (item) => {
            if (userDetails === null) {

                {
                    let confirm = window.confirm('로그인 이후에 이용 가능합니다\n' + '확인을 누르면 로그인 페이지로 이동합니다')
                    if (confirm === true) {
                        this.props.history.push(`/login`)
                    } else if (confirm === false) {

                    }
                }

            } else {
                this.props.addWishlist(item)
                    .then(response => {
                        if (response.type == ActionTypes.ADD_WISHLIST_SUCCESS) {
                            toast.info("작품이 찜하기에 추가되었습니다");
                            console.log('찜하기성공!')
                        }
                    }).catch(error => {
                        console.log('error >>', error)
                    })
            }
        }
        const asyncAddCart=(item,qty)=>{
            if (userDetails === null) {

                {
                    let confirm = window.confirm('로그인 이후에 이용 가능합니다\n' + '확인을 누르면 로그인 페이지로 이동합니다')
                    if (confirm === true) {
                        this.props.history.push(`/login`)
                    } else if (confirm === false) {

                    }
                }

            } else{
            this.props.addToCart(item,qty)
                .then(response=>{
                if(response.type===ActionTypes.ADD_CART_SUCCESS){
                    this.props.calcPrice();
                }
             }).catch(error=>{
                 console.log('error >>', error)
             })
            }
        }
        const buyNow=(item, qty)=>{
            if (userDetails === null) {

                {
                    let confirm = window.confirm('로그인 이후에 이용 가능합니다\n' + '확인을 누르면 로그인 페이지로 이동합니다')
                    if (confirm === true) {
                        this.props.history.push(`/login`)
                    } else if (confirm === false) {

                    }
                }

            } else{

            this.props.addToCart(item,qty)
            .then(response=>{
                if(response.type===ActionTypes.ADD_CART_SUCCESS){
                    this.props.snapOneItem();
                    this.props.calcPrice();
                }
               this.props.history.push(`${process.env.PUBLIC_URL}/checkout`)
            }).catch(error=>{
                console.log('error >>', error)
            })
        }
        }

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
                                            <div >
                                                <ImageZoom image={image} className="img-fluid image_zoom_cls-0" />
                                            </div>
                                    <SmallImages item={this.state.item} settings={productsnav} navOne={this.state.nav1} />
                                </div>
                                <DetailsWithPrice symbol={symbol} item={this.state.item} navOne={this.state.nav1} addToCartClicked={asyncAddCart} BuynowClicked={buyNow} addToWishlistClicked={addWishilist} calcPrice={calcPrice} />
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
                <ToastContainer/>
               
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    
        item: state.data.item,
        symbol: "￦",
        wishlist : state.wishlist.items,
        auth : state.auth
    
    
})




const mapDispatchToProps = (dispatch) => ({
    fetchSingleProduct2: (id) => dispatch(Actions.fetchSingleProduct2(id)),
    addToCart: (product, qty) => dispatch(addToCart(product, qty)),
    addWishlist: (item) => dispatch(Actions.addWishlist(item)),
    addToCartUnsafe: () => dispatch(addToCartUnsafe()),
    calcPrice:()=>dispatch(Actions.calcCartPrice()),
    snapOneItem:()=>dispatch(Actions.snapOneItem())
   
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NoSideBar));