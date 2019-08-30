import React, { Component } from 'react';
import { Actions } from '../actions/index'
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";

import FAQArticle from '../components/articles/FAQArticle';
import Breadcrumb from '../components/common/breadcrumb'


class SupportContainer extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.match.params.boardId);
        this.props.getArticleList(this.props.match.params.boardId);
    }
    
    shouldComponentUpdate(nextProps, nextState){
        console.log('next props = ', nextProps)
        console.log('this.props.match.params.boardId', this.props.match.params.boardId)
        console.log('nextProps.match.params.boardId', nextProps.match.params.boardId)
        
        if(this.props.match.params.boardId !== nextProps.match.params.boardId){
            return true;
        }
        else {
            return false;
        }
    }
    
    componentWillUpdate(nextProps, nextState){
        
        this.props.getArticleList(nextProps.match.params.boardId);
    }
    

    render() {


        const { userDetails } = this.props.auth;

        return (
            <div>

                <Breadcrumb title={this.props.article.boardName.boardName} />
                
                <section className="section-b-space">
                    <div className="container">

                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-secondary">
                        <input type="radio" name="options" id="option1" autocomplete="off" checked /><Link to="/article/1">FAQ</Link>
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" name="options" id="option2" autocomplete="off" /> <Link to="/article/2">Q&A</Link>
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" name="options" id="option3" autocomplete="off" /> <Link to="/article/3">공지사항</Link>
                    </label>
                </div>


                <FAQArticle />
                <span>
                    {(userDetails !== null && userDetails.memberId === 1) ?
                        <div className="checkout_btn_inner d-flex align-items-center">
                            <nav class="navbar navbar-light bg-light">
                                <form class="form-inline">
                                        <button class="btn btn-outline-success my-2 my-sm-0"> 
                                        <Link to={"/articleWrite/"+`${this.props.match.params.boardId}`}>글쓰기</Link>
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
    getArticleDetail: (boardId, articleId) => dispatch(Actions.getArticleDetail(boardId, articleId)),
    articleWrite: (boardId) => dispatch(Actions.articleWrite(boardId))
});



export default connect(mapStateToProps, mapDispatchToProps)(SupportContainer);