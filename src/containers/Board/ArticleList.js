import React, { useEffect } from 'react';
import { Actions } from '../../actions';
import { connect } from 'react-redux';


const ArticleList = ({ article, getArticleList, getArticleDetail, history, match }) => {
  const { items } = article;
  const boardId = match.param !== null ? match.params.boardId : items;
  console.log(match);
  useEffect(() => { getArticleList(boardId).then(response => null) }, []);
  
  const detailHandler = (e, articleId, boardId) => {
    e.stopPropagation();
    
    getArticleDetail(boardId, articleId)
    .then(respons => {
      console.log("boardId:",boardId)
        history.push("/article/" +boardId+ "/" +articleId)
      })
      .then(console.log(articleId))
      .catch(error => {
        console.log('error>>', error);
      });

  };

  const onWrite = () => {
    history.push("/articleWrite")
  };

  return (

    <table class="table table-hover">
      <thead>
        <div class="cs-nav">
          <ul class="cs-nav__menu-lists">
            <li class="cs-nav__menu"><a class="cs-nav__menu-link" href="/article/1">FAQ</a></li>
            <li class="cs-nav__menu"><a class="cs-nav__menu-link" href="/article/2">Q&A</a></li>
          </ul>
        </div>
        <tr className="table_head">
          <th width="10%">번호</th>
          <th width="50%">제목</th>
          <th width="10%">작성자</th>
          <th width="20%">작성일</th>
          <th width="10%">조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {items.map((item, index) => {
            const { articleId, boardId, title, nickname, writeDated, views } = item;
            return (
              <div>
                <th>{articleId}</th>
                <th><a onClick={e => detailHandler(e, articleId, boardId)} >{title}</a></th>
                <th>{nickname}</th>
                <th>{writeDated}</th>
                <th>{views}</th>
              </div>
            );
          }
          )
          }
        </tr>
        <td>
          <div className="checkout_btn_inner d-flex align-items-center"><nav class="navbar navbar-light bg-light">
            <form class="form-inline">
              <input class="search" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">검색</button>
            </form>
          </nav>
            <a className="nav-link primary-btn ml-2" onClick={onWrite}>글쓰기</a>
          </div>
        </td>

      </tbody>
    </table>

  )

};
const mapStateToProps = (state) => ({
  article: state.article
});

const mapDispatchToProps = (dispatch) => ({
  getArticleList: (boardId) => dispatch(Actions.getArticleList(boardId)),
  getArticleDetail: (boardId, articleId) => dispatch(Actions.getArticleDetail(boardId, articleId))
});



export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);