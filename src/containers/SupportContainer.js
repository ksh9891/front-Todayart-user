import React, { Component } from 'react';
import { Actions } from '../actions/index'
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";
import queryString from 'query-string'

import FAQArticle from '../components/articles/FAQArticle';


class SupportContainer extends Component {

    constructor(props) {
        super(props)
        this.state={
            boardId : queryString.parse(props.location.search).boardId
        }
        console.log("constructor", props, this.state.boardId)
    }
    static getDerivedStateFromProps(nextProps, prevState){
        return {boardId:queryString.parse(nextProps.location.search).boardId}
    }

    getSnapshotBeforeUpdate(preProps, prevState){
        console.log("getSnapshotBeforeUpdate", preProps, prevState, this.state)
        return this.props.getArticleList(this.state.boardId);
    }

    componentDidUpdate(prevProps, prevState){

    }
    
    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldComponentUpdate", this.state, nextState, nextProps)
        if(this.state.boardId !== nextState.boardId){
            return true;
        }
            return false;
        
    }
    
    componentWillUnmount(){
        
    }

    render() {


        const { userDetails } = this.props.auth;

        return (
            <div>
                
                <section className="section-b-space">
                    <div className="container">

                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked={true} /><Link to="/articles?boardId=1">FAQ</Link>
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option2" autoComplete="off"/> <Link to="/articles?boardId=2">Q&A</Link>
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option3" autoComplete="off"/> <Link to="/articles?boardId=3">공지사항</Link>
                    </label>
                </div>
                <FAQArticle boardId={this.state.boardId}/>
                <span>
                    {(userDetails !== null && (userDetails.role === "ROLE_ADMIN" || this.state.boardId === "2")) ?
                        <div className="checkout_btn_inner d-flex align-items-center">
                            <nav className="navbar navbar-light bg-light">
                                <form className="form-inline">
                                        <button className="btn btn-outline-success my-2 my-sm-0"> 
                                        <Link to={"/articleWrite"} boardId={this.state.boardId}>글쓰기</Link>
                                        </button>
                                </form>
                            </nav>
                        </div> : ''}
                </span>
                        </div>
                        </section>

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    article: state.article,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getArticleList: (boardId) => dispatch(Actions.getArticleList(boardId)),
    articleWrite: (boardId) => dispatch(Actions.articleWrite(boardId))
});



export default connect(mapStateToProps, mapDispatchToProps)(SupportContainer);