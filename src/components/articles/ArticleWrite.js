import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";

import { Actions } from '../../actions';
import Breadcrumb from '../common/breadcrumb'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class ArticleWrite extends Component {

  constructor(props) {
    super(props)

    this.titleInput = React.createRef();
    this.contentInput = React.createRef();
    this.boardIdInput = React.createRef();
  }


  onWrite = (e) => {

    e.preventDefault();

    const title = this.titleInput.current.value;
    const content = this.contentInput.current.value;
    const boardId = this.props.article.boardName.boardId;

    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa',boardId)

    this.props.articleWrite({title, content, boardId})
      .then(response => {
        this.props.history.push("/articles?boardId=" + boardId)
      })
      .then(console.log('titleeeeeeeeeeeeeeeeeeeeeeeeee = ', title))
      .catch(error => {
        console.log('error>>', error);
      });
  };

  onUpdate = (e) => {

    const title = this.titleInput.current.value;
    const content = this.contentInput.current.value;
    const articleId = this.props.article.item.articleId;

    e.preventDefault();

    this.props.articleUpdate({articleId, title, content})
      .then(response => {
        
        this.props.article.boardName.boardId === 4 ? 
        this.props.history.push("/product/" + this.props.article.item.productId) :
        this.props.history.push("/articles?boardId=" + this.props.article.item.boardId) 
        console.log('777777777777777777777777=', this.props.article.boardName.boardId)
        console.log('00000000000000000000=', this.props.article.item.productId)

      })
      .then(console.log('thisprops = ', this.props))
      .catch(error => {
        console.log('error>>', error);
      });
  };

  

  render() {
    
  const { items } = this.props.article;
  const { userDetails } = this.props.auth;  
  // function hidden() {
  //   var chkbox = document.getElementsByName('is_hidden');
  //   var chk = false;

  //   for(var i=0 ; i<chkbox.length ; i++) {
  //     if(chkbox[i].checked) {
  //        chk = true; 
  //     }
  //     else {
  //       chk = false; 
  //     } 
  //   }  
  //   }



    return (
      <div>
        
        <body> 
          <div class="container">
            <form onSubmit={e => this.props.match.params.articleId !== undefined ? 
              this.onUpdate(e) : this.onWrite(e)}>
              <div class="form-group">
                <label for="Inputselect">Category</label>
  
  
                <select
                  class="form-control"
                  type="boardId"
                  id="boardId"
                  name="boardId"
                  placeholder="카테고리"
                  required>
                      <option value={this.props.article.boardName.boardName}>{this.props.article.boardName.boardName}</option>
                </select>
  
              </div>
              <div class="form-group">
                <label for="Name">제목</label>
                <input
                class="form-control"
                  type="title"
                  id="title"
                  name="title"
                  ref={this.titleInput}
                  defaultValue={this.props.match.params.articleId !== undefined ? this.props.article.item.title : null}
                  placeholder="제목을 입력하세요."
                  required
                />
              </div>

              {/* <div className="App">
                <h4>내용</h4>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>내용을 입력하세요.</p>"
                    onInit={ editor => {
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                />
            </div> */}
  
              <div class="form-group">
                <label for=" Email1msg">내용</label>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    rows="10"
                    type="content"
                    id="content"
                    name="content"
                    ref={this.contentInput}
                    defaultValue={this.props.match.params.articleId !== undefined ? this.props.article.item.content : null}
                    placeholder="내용을 입력하세요."
                    required
                  ></textarea>
                </div>
  
              </div>
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    id="is_hidden"
                    name="is_hidden"
                  /> 비밀글 여부
                </label>
              </div>
              
  
              <button type="submit" class="btn btn-info">확인</button>
            </form>
            <button type="submit" class="btn btn-info">
              <Link to={"/articles?boardId="+`${this.props.article.boardName.boardId}`}>취소</Link>
            </button>
          </div>
        </body>
      </div>
    );    
  }
}

// 리액트 라우터 추가 + 리덕스 스토어 관련 된 옵션 추가
const mapStateToProps = (state) => ({
  article: state.article,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  articleWrite: ({title, content, boardId}) => dispatch(Actions.articleWrite({title, content, boardId})),
  articleUpdate: ({articleId, title, content}) => dispatch(Actions.articleUpdate({articleId, title, content}))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleWrite));