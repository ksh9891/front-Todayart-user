import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Actions } from './actions';
import { Route } from "react-router-dom";
import { Main, Cart, Orders } from "./containers";
import {Header} from "./components";

/**
 * App Stateless Component
 *
 * @param location
 * @param match
 */
const App = ({ location, match, auth, logout }) => {
    return (
        <div className="container">
            <Header/>
            <Route path="/main" component={Main}/>
            <Route path="/cart" component={Cart} />
            <Route path="/orders" component={Orders} />
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
