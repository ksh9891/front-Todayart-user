import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../actions';
import {withRouter} from "react-router";
import { ActionTypes } from "../../constants";



const ArticleWrite = ({ article, history, articleWrite, auth }) => {
  const { items } = article;
  const { userDetails } = auth;

  let titleInput = useRef('');
  let contentInput = useRef('');
  let boardIdInput = useRef('');

  const onWrite = (e) => {
    
    e.preventDefault();
    
    console.log('titleInput:',titleInput.current.value)
    console.log('contentInput:',contentInput.current.value)
    console.log('boardIdInput:',boardIdInput.current.value)

    const title = titleInput.current.value;
    const content = contentInput.current.value;
    const boardId = boardIdInput.current.value;
    const memberId = userDetails.memberId;

    
  console.log('memberId: ',memberId)

    articleWrite({title, content, boardId, memberId})
      .then(response => {
        history.push("/article");
      })
      .catch(error => {
        console.log('error >> ', error);
      });
  };


  return (
    <div>
      <body>
        <div class="container">
          <h1>글쓰기</h1>
          <form onSubmit={e => onWrite(e)}>
            <div class="form-group">
              <label for="Inputselect">Category</label>


              <select
                class="form-control"
                type="boardId"
                id="boardId"
                name="boardId"
                ref={boardIdInput}
                placeholder="카테고리"
                required>
                {items.map((item, index) => {
                  const { boardId } = item;
                  return (
                    <option value={boardId}>{boardId}</option>
                  )
                })}
              </select>

            </div>
            <div class="form-group">
              <label for="Name">제목</label>
              <input
                type="title"
                id="title"
                name="title"
                ref={titleInput}
                placeholder="제목을 입력하세요."
                required
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
                  ref={contentInput}
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
        </div>
      </body>
    </div>
  );

};

// 리액트 라우터 추가 + 리덕스 스토어 관련 된 옵션 추가
const mapStateToProps = (state) => ({
  article: state.article,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  articleWrite: ({title, content, boardId, memberId}) => dispatch(Actions.articleWrite({title, content, boardId, memberId})),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleWrite));