import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import { Slider3 } from "../../../services/script"

class BlogSection extends Component {
    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Slider {...Slider3} className="slide-3 no-arrow ">
                            <div>
                                <div className="col-md-12">
                                    <a href="https://www.artbava.com/exhibit/정현두-개인전-얼굴을-던지는-사람들-jung-hyun-doo-people-throwing-ones-faces" target="_blank">
                                        <div className="classic-effect">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/blog/41.jpg`} className="img-fluid" alt="정현두 개인전" />

                                        </div>
                                    </a>

                                    <div className="blog-details">
                                        <h4>2019-08-23 ~ 2019-09-22</h4>
                                        <a href="https://www.artbava.com/exhibit/정현두-개인전-얼굴을-던지는-사람들-jung-hyun-doo-people-throwing-ones-faces" target="_blank">
                                            <p>정현두 개인전: 얼굴을 던지는 사람들 | People throwing one's faces </p></a>
                                        <hr className="style1" />
                                        <h6>장소: 스페이스 윌링앤딜링 | 서울</h6>
                                    </div>
                                </div>
                            </div>


                            <div>
                                <div className="col-md-12">
                                    <a href="https://www.artbava.com/exhibit/2019-r1211-open-studio" target="_blank">
                                        <div className="classic-effect">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/blog/40.jpg`} className="img-fluid" alt="2019 R1211" />
                                        </div>
                                    </a>
                                    <div className="blog-details">
                                        <h4>2019-09-07 ~ 2019-09-08</h4>
                                        <a href="https://www.artbava.com/exhibit/2019-r1211-open-studio" target="_blank">
                                            <p>2019 R1211 Open Studio </p></a>
                                        <hr className="style1" />
                                        <h6>장소: OCI미술관 | 서울 </h6>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="col-md-12">
                                    <a href="https://www.artbava.com/exhibit/%EA%B3%A0%EC%A7%84%EC%9D%B4-%EA%B0%9C%EC%9D%B8%EC%A0%84-%EB%8F%84%EA%B8%B0%EB%8B%A4%EC%8B%9C-kohjinyi-togidashi" target="_blank">
                                        <div className="classic-effect">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/blog/42.jpg`} className="img-fluid" alt="고진이 개인전" />

                                        </div>
                                    </a>
                                    <div className="blog-details">
                                        <h4>2019-08-17 ~ 2019-09-07</h4>
                                        <a href="https://www.artbava.com/exhibit/%EA%B3%A0%EC%A7%84%EC%9D%B4-%EA%B0%9C%EC%9D%B8%EC%A0%84-%EB%8F%84%EA%B8%B0%EB%8B%A4%EC%8B%9C-kohjinyi-togidashi" target="_blank">
                                            <p>고진이 개인전: 도기다시 </p></a>
                                        <hr className="style1" />
                                        <h6>장소: 플레이스막(placeMAK) | 인천 </h6>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="col-md-12">
                                    <a href=" https://www.artbava.com/exhibit/%EA%B9%80%ED%98%84%EC%A0%95-%EA%B0%9C%EC%9D%B8%EC%A0%84-painting-on-painting" target="_blank">
                                        <div className="classic-effect">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/blog/35.jpg`} className="img-fluid" alt="김현정 개인전" />
                                            <span></span>
                                        </div>
                                    </a>
                                    <div className="blog-details">
                                        <h4>2019-09-04 ~ 2019-10-12 </h4>
                                        <a href=" https://www.artbava.com/exhibit/%EA%B9%80%ED%98%84%EC%A0%95-%EA%B0%9C%EC%9D%B8%EC%A0%84-painting-on-painting" target="_blank">
                                            <p>김현정 개인전: Painting on Painting </p></a>
                                        <hr className="style1" />
                                        <h6>장소: 유아트스페이스 | 서울</h6>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="col-md-12">
                                    <a href="https://www.artbava.com/exhibit/%EA%B9%80%EC%88%98%EC%98%81-%EC%84%9C%EB%8F%99%EC%9A%B1-flashback" target="_blank">
                                        <div className="classic-effect">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/blog/37.jpg`} className="img-fluid" alt="김수영, 서동욱" />
                                        </div>
                                    </a>
                                    <div className="blog-details">
                                        <h4>2019-09-05 ~ 2019-10-05</h4>
                                        <a href="https://www.artbava.com/exhibit/%EA%B9%80%EC%88%98%EC%98%81-%EC%84%9C%EB%8F%99%EC%9A%B1-flashback" target="_blank">
                                            <p> 김수영, 서동욱: Flashback </p></a>
                                        <hr className="style1" />
                                        <h6>장소: 원앤제이 갤러리 | 서울 </h6>
                                    </div>
                                </div>
                            </div>

                           




                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogSection;