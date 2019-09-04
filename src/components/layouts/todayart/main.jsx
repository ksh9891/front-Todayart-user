import React, { Component } from 'react';
import '../../common/index.scss';
import Slider from 'react-slick';
import './main.css'

// Import custom components
import SpecialProducts from "./special-products"
import BlogSection from "../common/blogsection"
import ThemeSettings from "../../common/theme-settings"

import {Helmet} from 'react-helmet'

class Todayart extends Component {

    componentDidMount() {
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color5.css` );
    }

    render(){
        return (
            <div>
                <Helmet>
                    <title>TodayArt | 오늘의 아트</title>
                    <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
                </Helmet>
                <section className="p-0 small-slider">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home home12 text-left">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div className={`tracking-in-expand`}>
                                                    <h4 className="ta-sub">today art</h4>
                                                    <h1 className="ta-main">Art Gallery Shop</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home13 text-left">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div className="tracking-in-expand">
                                                    <h4 className="ta-sub">today art</h4>
                                                    <h1 className="ta-main">Art Gallery Shop</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>

                {/*Collection Banner section*/}
                <section className="banner-furniture ratio_45">
                    <div className="container-fluid">
                        <div className="row partition3">
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/furniture/2banner1.jpg`} alt=""
                                                 className="img-fluid blur-up lazyload bg-img" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            <div>
                                                <h4>save 30%</h4>
                                                <h2>sofa</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/furniture/2banner2.jpg`} alt=""
                                                 className="img-fluid blur-up lazyload bg-img" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            <div>
                                                <h4>save 60%</h4>
                                                <h2>new arrival</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/furniture/2banner3.jpg`} alt=""
                                                 className="img-fluid blur-up lazyload bg-img" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            <div>
                                                <h4>save 60%</h4>
                                                <h2>chair</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/*Collection Banner section end*/}

                {/*Special Products Start*/}
                <SpecialProducts type={'todayart'} />
                {/*Special Products End*/}

                {/*Parallax banner*/}
                <section className="p-0">
                    <div className="full-banner parallax parallax-banner3  text-center p-center">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        <h2>2018</h2>
                                        <h3>interior design in home</h3>
                                        <h4>special offer</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*Parallax banner end*/}


                {/* Blog Section Section*/}
                <section className="blog blog-2 section-b-space ratio3_2">
                    <div className="container ">
                        <div className="row">
                            <div className="col">
                                <div className="title1">
                                    <h4>Recent Story</h4>
                                    <h2 className="title-inner1">from the blog</h2>
                                    <hr role="tournament6" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <BlogSection />
                </section>
                {/* Blog Section End*/}

                <ThemeSettings/>
            </div>
        )
    }
}


export default Todayart;