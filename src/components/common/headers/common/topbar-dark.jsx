import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {Actions} from "../../../../actions";
import {isAuthenticated} from "../../../../utils";
import "./topbar-dark.css"

class TopBarDark extends Component {
    render() {
        return (
            <div className="top-header top-header-dark3 ta-color-navy">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                    <li className="ta-color">오늘의아트에 오신 것을 환영합니다</li>
                                    <li className="ta-color"><i className="fa fa-phone ta-color" aria-hidden="true"/>연락처 : 02 - 707 - 0491</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right">
                            {isAuthenticated(this.props.auth) ?
                                <ul className="header-dropdown">
                                    <li className="mobile-wishlist">
                                        <Link to="/wishlist" className="ta-color"><i className="fa fa-heart ta-color" aria-hidden="true"/> 찜 목록</Link>
                                    </li>
                                    <li className="onhover-dropdown mobile-account ta-color">
                                        <i className="fa fa-user ta-color" aria-hidden="true" /> {this.props.auth.userDetails.nickname}
                                        <ul className="onhover-show-div">
                                            <li>
                                                <Link to="/account">마이페이지</Link>
                                            </li>
                                            <li>
                                                <Link to="/" onClick={this.props.logout}>로그아웃</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                :
                                <ul className="header-dropdown">
                                    <li className="mobile-account">
                                        <Link to={`${process.env.PUBLIC_URL}/login`} className="ta-color" aria-hidden="true"><i className="fa fa-user ta-color" aria-hidden="true"/> 로그인</Link>
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(Actions.logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBarDark));