import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Actions } from './actions';
import {Artwork, Home, Login, Register, SingleProduct, Category} from './containers';
import { Header, Footer } from './components';
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
                    <Route path="/singleproduct/:id" component={SingleProduct} /> 
                    <Route exact path="/category/:id" component={Category} />                   
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
