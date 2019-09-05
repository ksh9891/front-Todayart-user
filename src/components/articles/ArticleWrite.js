import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";
import Breadcrumb from '../common/breadcrumb'
import { Actions } from '../../actions';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './article.css';

class ArticleWrite extends Component {

  constructor(props) {
    super(props)

    this.titleInput = React.createRef();
    this.contentInput = React.createRef();
    this.boardIdInput = React.createRef();
  }


  onWrite = (e) => {

    e.preventDefault();

    const title = this.props.article.boardName.boardId === 4 ? this.title = this.props.data.item.productName : this.titleInput.current.value;
    const content = this.contentInput.current.value;
    const boardId = this.props.article.boardName.boardId;
    const productId = this.props.data.item.productId !== null ? this.props.data.item.productId:null;


    this.props.articleWrite({title, content, boardId, productId})
      .then(response => {
        this.props.article.boardName.boardId === 4 ? 
        this.props.history.push("/product/" + this.props.data.item.productId) :
        this.props.history.push("/articles?boardId=" + this.props.article.boardName.boardId) 
      })
      .catch(error => {
        console.log('error>>', error);
      });
  };

  onUpdate = (e) => {

    const title = this.titleInput.current.value;
    const content = this.contentInput.current.value;
    const articleId = this.props.article.detail.articleId;

    e.preventDefault();

    this.props.articleUpdate({articleId, title, content})
      .then(response => {
        
        this.props.article.boardName.boardId === 4 ? 
        this.props.history.push("/product/" + this.props.article.detail.productId) :
        this.props.history.push("/articles?boardId=" + this.props.article.boardName.boardId) 

      })
      .then(console.log('thisprops = ', this.props))
      .catch(error => {
        console.log('error>>', error);
      });
  };

  

  render() {
    
  const { items } = this.props.article;
  const { userDetails } = this.props.auth;  

    return (
      <div>
        <div className="header">
         {this.props.article.boardName !== null && this.props.article.boardName !== undefined ?
            <Breadcrumb title={this.props.article.boardName.boardName}/> : ''}
          </div>
          <section className="section-b-space" style={{"height":"515px"}}>
          <div className="container" style={{"maxWidth":"1400px", "width":"100%", "height":"100%","paddingRight":"15px", "paddingLeft":"15px", "marginRight":"auto","marginLeft":"auto"}}>

            <form onSubmit={e => this.props.match.params.articleId !== undefined ? 
              this.onUpdate(e) : this.onWrite(e)}>
              <div className="titleArea">
              {this.props.article.boardName.boardId === 4 ? '' : <div class="form-group">
                <label for="Name">제목</label>
                <input
                class="form-control"
                  type="title"
                  id="title"
                  name="title"
                  ref={this.titleInput}
                  defaultValue={this.props.match.params.articleId !== undefined ? this.props.article.detail.title : null}
                  placeholder="제목을 입력하세요."
                  required
                  style={{"width":"90%", "float":"right"}}
                />
              </div>}
              </div>
              <div className="contents">
              <div className="form-group">
                <label for=" Email1msg">내용</label>
                  <textarea
                    class="form-control"
                    rows="10"
                    type="content"
                    id="content"
                    name="content"
                    ref={this.contentInput}
                    defaultValue={this.props.match.params.articleId !== undefined ? this.props.article.detail.content : null}
                    placeholder="내용을 입력하세요."
                    required
                    style={{"width":"90%", "float":"right", "resize":"none"}}
                  ></textarea>
                </div>
              </div>
              <div className="checkbox" style={{"marginBottom":"30px", "marginTop":"30px"}}>
                <div>
                  <input
                    type="checkbox"
                    id="is_hidden"
                    name="is_hidden"
                  />비밀글 여부
                </div>
                <div style={{"float":"right", "margin":"12px"}}>
                <button type="submit" class="btn btn-info mr-2 ml-2">확인</button>
              <button type="button" class="btn btn-info">  
              <Link to={"/articles?boardId="+`${this.props.article.boardName.boardId}`} style={{"color":"inherit", "transition":".3s easeInOut"}}>취소</Link>
            </button>
              </div>
              </div>
  
            </form>
<div className=""></div>
            
          </div>
        </section>
      </div>
    );    
  }
}

// 리액트 라우터 추가 + 리덕스 스토어 관련 된 옵션 추가
const mapStateToProps = (state) => ({
  article: state.article,
  auth: state.auth,
  data: state.data
});

const mapDispatchToProps = (dispatch) => ({
  articleWrite: ({title, content, boardId, productId}) => dispatch(Actions.articleWrite({title, content, boardId, productId})),
  articleUpdate: ({articleId, title, content}) => dispatch(Actions.articleUpdate({articleId, title, content}))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleWrite));