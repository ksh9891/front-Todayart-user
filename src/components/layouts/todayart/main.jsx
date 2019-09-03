import React, { Component } from 'react';
import '../../common/index.scss';
import Slider from 'react-slick';

// Import custom components
import SpecialProducts from "./special-products"
import BlogSection from "../common/blogsection"
import ThemeSettings from "../../common/theme-settings"
import FooterOne from "../../common/footers/footer-one";

import {Helmet} from 'react-helmet'

class Todayart extends Component {

    componentDidMount() {
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color8.css` );
    }

    render(){
        return (
            <div>
                <Helmet>
                    <title>TodayArt | 오늘의 아트</title>
                    <meta name="description" content="오늘의 아트에 오신 것을 환영합니다." />
                </Helmet>
                <section className="p-0 small-slider">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home home34 text-left">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>furniture sofa 배너</h4>
                                                    <h1>harmony sofa</h1><a href="#" className="btn btn-solid">shop
                                                    now</a></div>
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
                                                <div>
                                                    <h4>furniture sofa</h4>
                                                    <h1>harmony chair</h1><a href="#" className="btn btn-solid">shop
                                                    now</a></div>
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
                                            {/* 메인 배너 이미지 */}
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/furniture/test4.jpg`} alt=""
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
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/furniture/test5.jpg`} alt=""
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
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/furniture/test3.jpg`} alt=""
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