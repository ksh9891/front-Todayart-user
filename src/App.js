import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Actions } from './actions';
import {Artwork, Home, Login, Register, Cart, Orders, Checkout, ArticleList, ArticleDetail, Test} from "./containers";
import { KakaoSuccess, KakaoSuccessFail, KakaoCancle } from './containers/Kakao';
import { Header, Footer } from './components'
import "./App.css"

const App = ({ location, match, auth, logout }) => {
    return (
        <div>
            <Header />
            <main className="site-main">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/artwork" component={Artwork} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/article/:id" component={ArticleDetail} />
                    <Route path="/article" component={ArticleList} />
                    <Route path="/test" component={Test}/>
                    <Route path="/kakaoSuccessFail" component={KakaoSuccessFail}/>
                    <Route path="/kakaoSuccess" component={KakaoSuccess}/>
                    <Route path="/kakaoCancel" component={KakaoCancle}/>

                </Switch>
            </main>
            <Footer />
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(Actions.logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
