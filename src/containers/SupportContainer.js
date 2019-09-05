import React, { Component } from 'react';
import { Actions } from '../actions/index'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import queryString from 'query-string'
import Breadcrumb from '../components/common/breadcrumb'
import FAQArticle from '../components/articles/FAQArticle';


class SupportContainer extends Component {

    constructor(props) {
        super(props)
        this.state={
            boardId : queryString.parse(props.location.search).boardId,
            boardName:props.article.boardName.boardName
        }
        console.log("constructor", props, this.state.boardId)
    }
    static getDerivedStateFromProps(nextProps, prevState){
        console.log("getDerivedStateFromProps", prevState, nextProps)

        return {boardId:queryString.parse(nextProps.location.search).boardId,
        boardName:nextProps.article.boardName.boardName}

    }

    getSnapshotBeforeUpdate(preProps, prevState){
        console.log("getSnapshotBeforeUpdate", preProps, prevState, this.state)
        return null;
    }

    componentDidUpdate(prevProps, prevState){
        prevProps.getArticleList(this.state.boardId);
    }
    
    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldComponentUpdate", this.state, nextState, nextProps)
        if(this.state.boardId !== nextState.boardId){
            return true;
        }
        if(this.state.boardName!==nextState.boardName){
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
            {this.props.article.boardName !== null && this.props.article.boardName !== undefined ?
            <Breadcrumb title={this.props.article.boardName.boardName} /> : ''}

                <section className="section-b-space" style={{"paddingTop":"15px"}}>
                    <div className="container"  style={{"maxWidth":"1400px"}}>


                <FAQArticle boardId={this.state.boardId}/>
                <span>
                    {(userDetails !== null && (userDetails.role === "ROLE_ADMIN" || this.state.boardId === "2")) ?
                        <div className="checkout_btn_inner d-flex align-items-center">
                            <nav className="navbar navbar-light">
                                <form className="form-inline">
                                        <button className="btn btn-outline-success my-2 my-sm-0" style={{"marginTop":"50px"}}> 
                                        <Link to={"/articleWrite"} boardId={this.state.boardId} style={{"color":"inherit", "transition":".3s easeInOut"}}>글쓰기</Link>
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
    boardName:state.article.boardName.boardName,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getArticleList: (boardId) => dispatch(Actions.getArticleList(boardId)),
    articleWrite: (boardId) => dispatch(Actions.articleWrite(boardId))
});



export default connect(mapStateToProps, mapDispatchToProps)(SupportContainer);