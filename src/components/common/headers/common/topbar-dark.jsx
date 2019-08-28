import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {Actions} from "../../../../actions";
import {isAuthenticated} from "../../../../utils";

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
                            {isAuthenticated(this.props.auth) ?
                                <ul className="header-dropdown">
                                    <li className="mobile-wishlist">
                                        <Link to="/wishlist"><i className="fa fa-heart" aria-hidden="true"/> 찜 목록</Link>
                                    </li>
                                    <li className="onhover-dropdown mobile-account">
                                        <i className="fa fa-user" aria-hidden="true" /> {this.props.auth.userDetails.nickname}
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
                                        <Link to={`${process.env.PUBLIC_URL}/login`} aria-hidden="true"><i className="fa fa-user" aria-hidden="true"/> 로그인</Link>
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