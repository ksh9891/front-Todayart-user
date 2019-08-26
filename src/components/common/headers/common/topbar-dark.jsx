import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class TopBarDark extends Component {
    render() {
        return (
            <div className="top-header top-header-dark3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                    <li>오늘의아트 방문을 환영합니다!</li>
                                    <li><i className="fa fa-phone" aria-hidden="true"/>Call Us: 02 - 000 - 0000</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right">
                            <ul className="header-dropdown">
                                <li className="mobile-wishlist">
                                    <a href="#"><i className="fa fa-heart" aria-hidden="true"/> 찜 목록</a>
                                </li>
                                <li className="mobile-account">
                                    <Link to={`${process.env.PUBLIC_URL}/login`} aria-hidden="true"><i className="fa fa-user" aria-hidden="true"/> 로그인</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopBarDark;