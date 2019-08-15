import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Actions } from './actions';
import { Route } from "react-router-dom";
import { TestContainer } from "./containers";

/**
 * App Stateless Component
 *
 * @param location
 * @param match
 */
const App = ({ location, match, auth, logout }) => {
    return (
        <div className="container">
            <h2>이곳에 라우터를 넣으면 되지 않을까? 사용자페이지</h2>
            <Route path="/test" component={TestContainer} />
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
