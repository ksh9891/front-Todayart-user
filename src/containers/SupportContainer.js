import React, { Component } from 'react';
import { Actions } from '../actions/index'
import { connect } from 'react-redux';
import FAQArticle from '../components/articles/FAQArticle';


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
                <div className="cs-nav">
                    
                    <ul className="cs-nav__menu-lists">
                        <li className="cs-nav__menu"><a className="cs-nav__menu-link" href="/article/1">FAQ</a></li>
                        <li className="cs-nav__menu"><a className="cs-nav__menu-link" href="/article/2">Q&A</a></li>
                        <li className="cs-nav__menu"><a className="cs-nav__menu-link" href="/article/3">공지사항</a></li>
                    </ul>
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