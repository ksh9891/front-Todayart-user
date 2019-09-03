import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Actions } from '../../actions';
import { ActionTypes } from '../../constants/ActionTypes';

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onComment: props.onComment,
            articleId: props.articleId,
            comment: null
        }
        this.searchWordInput = React.createRef();
        this.searchConditionInput = React.createRef();
    }

    componentDidMount() {
        if (this.state.comment === null || this.state.comment === undefined) {
            this.state.onComment(this.state.articleId).then((response) => {
                if (response.type === ActionTypes.COMMENTLIST_SUCCESS) {
                    this.setState({ comment: response.payload.data.items })
                }
            })
        }
    }

    onCommentDelete = (e) => {

        const [{commentId}] = this.state.comment

        e.preventDefault();
        this.props.commentDelete({commentId})
        .then(response => {
            this.props.article.boardName.boardId === 4 ?
              this.props.history.push("/product/" + this.props.data.item.productId) :
              this.props.history.push("/articles?boardId=" + this.props.article.detail.boardId)
          })
            .catch(error => {
                console.log('error>>', error);
            });
    };

    onModify = (e, boardId, articleId) => {

        e.preventDefault();

        this.props.getArticleDetail(boardId, articleId)
            .then(response => {
                this.props.history.push("/articleWrite/" + articleId)
            })
            .then(console.log('thisprops = ', this.props))
            .catch(error => {
                console.log('error>>', error);
            });
    };

    onReply = (e, articleId) => {

        e.preventDefault();
    };

    onComment = (articleId) => {
        this.props.commentList(articleId)
    }

    render() {
        const { items } = this.props.article;
        const { userDetails } = this.props.auth;
        const { item } = this.props.data;

        return (
            <div>
                {this.state.comment ?
                    <div class="media mt-3 shadow-textarea">
                        <img class="d-flex rounded-circle avatar z-depth-1-half mr-3" src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"
                            alt="Generic placeholder image" />
                        <div class="media-body">
                            <h5 class="mt-0 font-weight-bold blue-text">{this.state.comment.map(detail => detail.nickname)}</h5>
                            <div class="form-group basic-textarea rounded-corners">
                                {this.state.comment.map(detail => detail.replyContent)}
                            </div>

                            {console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',this.state)}

                            {((userDetails !== null) && (item.artist.memberId === userDetails.memberId)) || ((userDetails !== null) && (userDetails.memberId === 1)) ?
                                <div className="checkout_btn_inner d-flex align-items-center">
                                    <nav className="navbar navbar-light bg-light">
                                        <form className="form-inline">
                                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.onCommentDelete(e, this.state.articleId)}>삭제</button>
                                        </form>
                                    </nav>
                                </div> : ''}
                        </div>
                    </div>
                    : ''}



            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    article: state.article,
    auth: state.auth,
    data: state.data
});

const mapDispatchToProps = (dispatch) => ({
    getArticleDetail: (boardId, articleId) => dispatch(Actions.getArticleDetail(boardId, articleId)),
    articleSearch: ({ boardId, searchWord, searchCondition }) => dispatch(Actions.articleSearch({ boardId, searchWord, searchCondition })),
    commentList: (articleId) => dispatch(Actions.commentList(articleId)),
    commentDelete: ({commentId}) => dispatch(Actions.commentDelete({commentId}))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))