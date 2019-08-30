import React, { useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";

import { Actions } from '../../actions';
import Breadcrumb from '../common/breadcrumb'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class ArticleWrite extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    
  const { items } = this.props.article;
  const { userDetails } = this.props.auth;  

    return (
      <div>
        
        <body> 
          <div class="container">
            <h1>글쓰기</h1>
            <form onSubmit={e => this.onWrite(e)}>
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
                  type="title"
                  id="title"
                  name="title"
                  placeholder="제목을 입력하세요."
                  required
                />
              </div>

              <div className="App">
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
            </div>
  
              <div class="form-group">
                <label for=" Email1msg">내용</label>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    rows="10"
                    type="content"
                    id="content"
                    name="content"
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
  
              <button type="submit" class="btn btn-info">글쓰기</button>
            </form>
            <form onSubmit={e => this.onList(e)}>
            <button type="submit" class="btn btn-info">취소</button>
            </form>
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
  articleWrite: ({title, content, boardId, memberId}) => dispatch(Actions.articleWrite({title, content, boardId, memberId})),

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleWrite));