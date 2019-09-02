import React, {Component} from 'react';
import { Link} from 'react-router-dom';

import LogoImage from "../headers/common/logo"
import {SlideUpDown} from "../../../services/script";

class FooterTwo extends Component {

    componentDidMount(){
        var contentwidth = window.innerWidth;
        if ((contentwidth) < 750) {
            SlideUpDown('footer-title');
        } else {
            var elems = document.querySelectorAll(".footer-title");
            [].forEach.call(elems, function(elemt) {
                let el = elemt.nextElementSibling;
                el.style = "display: block";
            });
        }
    }

    render () {
        return (
                <footer className="footer-light pet-layout-footer">
                    <div className="white-layout">
                        <div className="container">
                            <section className="small-section">
                                <div className="row footer-theme2">
                                    <div className="col">
                                        <div className="footer-link link-white">
                                            <div className="footer-brand-logo">
                                                <LogoImage logo={this.props.logoName} />
                                            </div>
                                            <div className="footer-title footer-mobile-title">
                                                <h4>사이트 맵</h4>
                                            </div>
                                            <div className="footer-contant">
                                                <ul>
                                                    <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} >Home</Link></li>
                                                    <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} >작품 - 전체</Link></li>
                                                    <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} >작품 - 서양화</Link></li>
                                                    <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} >작품 - 동양화</Link></li>
                                                    <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} >작품 - 기타</Link></li>
                                                    <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} >FAQ</Link></li>
                                                    <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} >Q&A</Link></li>
                                                    <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} >공지사항</Link></li>
                                                    <li><Link to={`${process.env.PUBLIC_URL}/register-artist`} >작가 신청</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="sub-footer black-subfooter">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-md-6 col-sm-12">
                                    <div className="footer-end">
                                        <p><i className="fa fa-copyright" aria-hidden="true" /> 2019 Bitcamp final project - TodayArt</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-md-6 col-sm-12">
                                    <div className="payment-card-bottom">
                                        <ul>
                                            <li>
                                                <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/visa.png`} alt="" /></a>
                                            </li>
                                            <li>
                                                <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/mastercard.png`} alt="" /></a>
                                            </li>
                                            <li>
                                                <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/paypal.png`} alt="" /></a>
                                            </li>
                                            <li>
                                                <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/american-express.png`} alt="" /></a>
                                            </li>
                                            <li>
                                                <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/discover.png`} alt="" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
        );
    }
}

export default FooterTwo;