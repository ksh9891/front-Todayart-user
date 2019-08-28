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

    render() {

        return (
            <div>

                <Breadcrumb title={this.props.article.boardName} />

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
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    article: state.article
});

const mapDispatchToProps = (dispatch) => ({
    getArticleList: (boardId) => dispatch(Actions.getArticleList(boardId)),
    getArticleDetail: (boardId, articleId) => dispatch(Actions.getArticleDetail(boardId, articleId))
});



export default connect(mapStateToProps, mapDispatchToProps)(SupportContainer);