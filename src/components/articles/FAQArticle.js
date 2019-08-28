import React, { useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";

import { Actions } from '../../actions';
import Breadcrumb from '../common/breadcrumb'

class FAQArticle extends Component {

  constructor(props) {
    super(props)
  }

  componentDidmount(){
    this.props.articleDelete(this.props.articleId)
    this.props.articleModify(this.props.articleId)
  }

  render() {

    
    console.log('props = ',this.props)

    const {items} = this.props.article;
    const {userDetails} = this.props.auth;

    const onDelete = (e, history, {articleDelete}) => {

      e.preventDefault();

      articleDelete(this.props.articleId)
      .then(response => {
          history.push("/article/"+this.props.boardId)
        })
        .catch(error => {
          console.log('error>>', error);
        });
  };

  const onModify = (e, history, {articleModify}) => {

      e.preventDefault();

      articleModify(this.props.articleId)
      .then(response => {
          history.push("/articleWrite")
        })
        .catch(error => {
          console.log('error>>', error);
        });
  };

    return(
<div>
  
    {items.map((item) => {
      const {title, content} = item;
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
                                <div className="checkout_btn_inner d-flex align-items-center"><nav class="navbar navbar-light bg-light">
                                    <form class="form-inline">
                                        <form onSubmit={e => onModify(e)}>
                                        <button class="btn btn-outline-success my-2 my-sm-0">수정</button>
                                        </form>
                                        <form onSubmit={e => onDelete(e)}>
                                        <button type="submit" class="btn btn-outline-success my-2 my-sm-0">삭제</button>
                                        </form>
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
  })}
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
  articleModify: (boardId) => dispatch(Actions.articleModify(boardId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FAQArticle))