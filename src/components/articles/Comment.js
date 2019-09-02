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

    onDelete = (e, articleId) => {
        e.preventDefault();
        this.props.articleDelete(articleId)
          .then(response => {
            this.props.history.push("/articles?boardId=" + this.props.article.boardName.boardId)
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
          <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <button className="btn btn-link" type="button" data-toggle="collapse"
              data-target="#collapseOne" aria-expanded="true"
              aria-controls="collapseOne">
              {this.state.comment.map(item => item.content)}
            </button>
          </h5>
        </div>
          :''}
          { (this.state.comment !== undefined) &&
            (((userDetails !== null) && (item.artist.memberId === userDetails.memberId)) || 
            ((userDetails !== null) && (userDetails.role === "ROLE_ADMIN")))?
            <div className="checkout_btn_inner d-flex align-items-center"><nav class="navbar navbar-light bg-light">
            <form className="form-inline">
              <button className="btn btn-outline-success my-2 my-sm-0">수정</button>
              <button className="btn btn-outline-success my-2 my-sm-0">삭제</button>
            </form>
          </nav>
          </div>:''
        }
        </div>
      )
    }
  }
  
  const mapStateToProps = (state) => ({
    article: state.article,
    auth: state.auth,
    data : state.data
  });
  
  const mapDispatchToProps = (dispatch) => ({
    getArticleDetail: (boardId, articleId) => dispatch(Actions.getArticleDetail(boardId, articleId)),
    articleSearch: ({ boardId, searchWord, searchCondition }) => dispatch(Actions.articleSearch({ boardId, searchWord, searchCondition })),
    commentList: (articleId) => dispatch(Actions.commentList(articleId))
  });
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))