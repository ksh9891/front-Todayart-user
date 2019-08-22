import React, { useEffect } from 'react';
import { Actions } from '../../actions';
import { connect } from 'react-redux';


const ArticleList = ({ article, getArticleList, getArticleDetail, history }) => {
  const { items } = article;

  useEffect(() => { getArticleList().then(response => null) }, []);

  const detailHandler = (e, articleId) => {
    e.stopPropagation();

    getArticleDetail(articleId)
      .then(respons => {
        history.push("/article/" + { articleId })
      })
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
            const { articleId, title, memberId, writeDated, views } = item;
            return (
              <div>
                <th>{articleId}</th>
                <th><a onClick={e => detailHandler(e, articleId)} >{title}</a></th>
                <th>{memberId}</th>
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
  getArticleList: () => dispatch(Actions.getArticleList()),
  getArticleDetail: (articleId) => dispatch(Actions.getArticleDetail(articleId))
});



export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);