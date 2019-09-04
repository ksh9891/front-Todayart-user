import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";
import queryString from 'query-string'
import { Actions } from '../../actions';
import Comment from './Comment';

class ProductQandA extends Component {

  constructor(props) {
    super(props)
    this.state = {
      boardId: queryString.parse(props.location.search).boardId,
      reply: ''
    }
  }

  componentDidMount() {
    this.props.getArticleList(this.state.boardId);
    // this.props.commentList(this.articleId);
  }

  //  shouldComponentUpdate(nextProps, nextState) {
  //    if(this.props.article.data.items)
  //  }

  onDelete = (e, articleId) => {
    e.preventDefault();
    this.props.articleDelete(articleId)
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

    const replyContent = this.state.reply;

    this.props.commentWrite({ articleId, replyContent })
      .then(response => {
        this.props.history.push("/product/" + this.props.data.item.productId)
      })
      .then(console.log('thisprops = ', this.props))
      .catch(error => {
        console.log('error>>', error);
      });
  };

  onComment = (articleId) => {
    this.props.commentList(articleId)
  }

  onWriting = (e) => {
    console.log("write", e.target.value);
    this.setState({
      ...this.state,
      reply: e.target.value
    })
  }

  render() {
    this.state.boardId = (this.props.match.params.product !== true) ? '4' : '';
    const { items } = this.props.article;
    const { userDetails } = this.props.auth;
    const { item } = this.props.data;

    return (
      <div>

        {items ?
          items.filter((detail) => {
            return detail.productId == this.props.match.params.id
          }
          ).map((detail) => {
            return (
              <div>

                {/*Dashboard section*/}

                <div class="media">
                  <img class="d-flex rounded-circle avatar z-depth-1-half mr-3" src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
                    alt="Avatar" />
                  <div class="media-body">
                    <h5 class="mt-0 font-weight-bold blue-text">{detail.nickname}</h5>
                    <p>{detail.content}</p>
                    <span >
                      {((userDetails !== null) && (detail.memberId === userDetails.memberId)) || ((userDetails !== null) && (userDetails.memberId === 1)) ?
                        <div className="checkout_btn_inner d-flex align-items-center"><nav class="navbar navbar-light bg-light">
                          <form className="form-inline">
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.onModify(e, detail.boardId, detail.articleId)}>수정</button>
                            <button className="btn btn-outline-success my-2 my-sm-0" oneClick={(e) => this.onDelete(e, detail.articleId)}>삭제</button>
                          </form>
                        </nav>
                        </div> : ''}
                    </span>

                    {((userDetails !== null) && (item.artist.memberId === userDetails.memberId)) || ((userDetails !== null) && (userDetails.role === "ROLE_ADMIN")) ?
                      <form onSubmit={element => this.onReply(element, detail.articleId)}>
                        <span>
                          <div className="accordion theme-accordion" id="accordionExample">
                            <div className="card">
                              <div className="card-header" id="headingOne">
                                <button type="button" data-toggle="collapse" data-target={"#collapse" + `${detail.articleId}`}
                                  aria-controls={"collapse" + `${detail.articleId}`}>답변
                              </button>



                              </div>

                              <div id={"collapse" + `${detail.articleId}`} className="collapse" aria-labelledby={"heading" + `${detail.articleId}`}
                                data-parent="#accordionExample">
                                <div className="card-body">
                                  <textarea
                                    class="form-control"
                                    rows="3"
                                    type="reply"
                                    id="reply"
                                    name="reply"
                                    onChange={(e) => this.onWriting(e)}
                                    placeholder="내용을 입력하세요."
                                    required
                                  ></textarea>
                                </div>
                                <button type="submit">확인</button>
                              </div>
                            </div>
                          </div>
                        </span>
                      </form>
                      : ''}

                    <Comment articleId={detail.articleId} onComment={this.props.commentList} />

                  </div>
                </div>

                {/* <section className="faq-section section-b-space">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="accordion theme-accordion" id="accordionExample">
                          <div className="card">
                            <div className="card-header" id={"heading"+`${detail.articleId}`}>
                              <h5 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse" 
                                  data-target={"#collapse"+`${detail.articleId}`} aria-expanded="false"
                                  aria-controls={"collapse"+`${detail.articleId}`}>
                                  {detail.title}
                                </button>
                              </h5>
                            </div>

                            <div id={"collapse"+`${detail.articleId}`} className="collapse" aria-labelledby={"heading"+`${detail.articleId}`}
                              data-parent="#accordionExample">
                              <div className="card-body">
                                <p>{detail.content}</p>
                                <span>
                                  {((userDetails !== null) && (detail.memberId === userDetails.memberId)) || ((userDetails !== null) && (userDetails.memberId === 1)) ?
                                    <div className="checkout_btn_inner d-flex align-items-center"><nav class="navbar navbar-light bg-light">
                                      <form className="form-inline">
                                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.onModify(e, detail.boardId, detail.articleId)}>수정</button>
                                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.onDelete(e, detail.articleId)}>삭제</button>
                                      </form>
                                    </nav>
                                    </div> : ''}
                                </span>
                                <span>
                                    {((userDetails !== null) && (item.artist.memberId === userDetails.memberId)) || ((userDetails !== null) && (userDetails.role === "ROLE_ADMIN")) ?
                                      <div className="checkout_btn_inner d-flex align-items-center"><nav class="navbar navbar-light bg-light">
                                        <form className="form-inline">
                                          <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.onReply(e, detail.articleId)}>답변</button>
                                        </form>
                                      </nav>
                                      </div> : ''}
                                  </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <Comment articleId={detail.articleId} onComment={this.props.commentList} /> */}

              </div >
            )
          }) : ''}

        
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
  getArticleList: (boardId) => dispatch(Actions.getArticleList(boardId)),
  articleDelete: (boardId) => dispatch(Actions.articleDelete(boardId)),
  getArticleDetail: (boardId, articleId) => dispatch(Actions.getArticleDetail(boardId, articleId)),
  articleSearch: ({ boardId, searchWord, searchCondition }) => dispatch(Actions.articleSearch({ boardId, searchWord, searchCondition })),
  commentList: (articleId) => dispatch(Actions.commentList(articleId)),
  commentWrite: ({ articleId, replyContent }) => dispatch(Actions.commentWrite({ articleId, replyContent }))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductQandA))

