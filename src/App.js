import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Actions } from './actions';
import {Artwork, Home, Login, Register, Cart, Orders, Checkout, ArticleList, ArticleDetail, ArticleWrite} from "./containers";
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
                    <Route path="/article/:boardId/:id" component={ArticleDetail} />
                    <Route path="/article/:boardId" component={ArticleList} />
                    <Route exact path="/articleWrite" component={ArticleWrite} />
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
