import React, { useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";
import queryString from 'query-string'
import { Actions } from '../../actions';

class FAQArticle extends Component {

  constructor(props) {
    super(props)
    this.state={
      boardId : queryString.parse(props.location.search).boardId
  }
  }

  componentDidMount() {
    this.props.getArticleList(this.state.boardId);
}

componentWillUnmount(){
        
}



 onDelete = (e, articleId) => {
e.preventDefault();
  this.props.articleDelete(articleId)

    .then(console.log('articleID==============', this.props.articleId))
    .catch(error => {
      console.log('error>>', error);
    });
};

onModify = (e, articleId) => {

  e.preventDefault();

  this.props.getArticleDetail(articleId)
    .then(response => {
      this.props.history.push("/articleWrite/"+articleId)
    })
    .then(console.log('thisprops = ',this.props))
    .catch(error => {
      console.log('error>>', error);
    });
};

  render() {
    const { items } = this.props.article;
    const { userDetails } = this.props.auth;

    return (
      <div>

        { items?
          
          items.map((item) => {
          const { title, content } = item;
          return (
            <div>
              {/*Dashboard section*/}
              <section className="faq-section section-b-space">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="accordion theme-accordion" id="accordionExample">
                        <div className="card">
                          <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                              <button className="btn btn-link" type="button" data-toggle="collapse"
                                data-target="#collapseOne" aria-expanded="true"
                                aria-controls="collapseOne">
                                {item.title}
                              </button>
                            </h5>
                          </div>

                          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                            data-parent="#accordionExample">
                            <div className="card-body">
                              <p>{item.content}</p>
                              <span>
                                {(userDetails !== null) && (item.memberId === userDetails.memberId) ?
                                  <div className="checkout_btn_inner d-flex align-items-center"><nav className="navbar navbar-light bg-light">
                                    <form className="form-inline">
                                      <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.onModify(e, item.articleId)}>수정</button>
                                      <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.onDelete(e, item.articleId)}>삭제</button>
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

            </div >
          )
        }):''}
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
  articleDelete: (boardId) => dispatch(Actions.articleDelete(boardId)),
  getArticleDetail: (boardId, articleId) => dispatch(Actions.getArticleDetail(boardId, articleId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FAQArticle))

