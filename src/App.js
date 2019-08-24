import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Actions } from './actions';
import {Artwork, Home, Login, Register, Cart, Orders, Checkout, Account, ArticleList, ArticleDetail, ArticleWrite, SingleProduct, Category, Test} from "./containers";
import KakaoSuccess, {KakaoSuccessFail, KakaoCancle } from './containers/Kakao';
import { Header, Footer } from './components';
import "./App.css";

const App = ({ location, match, auth, logout }) => {
    return (
        <div>
            <Header />
            <main className="site-main">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/account" component={Account} />
                    <Route path="/account/:memberId/orders" component={Orders} />
                    <Route exact path="/artwork" component={Artwork} />
                    <Route path="/singleproduct/:id" component={SingleProduct} /> 
                    <Route exact path="/category/:id" component={Category} />             
                    <Route exact path="/category/:id" component={Category} />               
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/article/:boardId/:id" component={ArticleDetail} />
                    <Route path="/article/:boardId" component={ArticleList} />
                    <Route exact path="/articleWrite" component={ArticleWrite} />
                    <Route path="/test" component={Test}/>
                    <Route path="/kakaoSuccessFail" component={KakaoSuccessFail}/>
                    <Route path="/kakaoSuccess" component={KakaoSuccess}/>
                    <Route path="/kakaoCancel" component={KakaoCancle}/>
                    <Route path="/article/:id" component={ArticleDetail} />
                    <Route path="/article" component={ArticleList} />
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
