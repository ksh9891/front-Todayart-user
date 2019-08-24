import React, { useEffect } from 'react';
import { Actions } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

const ArticleDetail = ({ article, auth, articleDelete, history }) => {

    const { item } = article;
    const { userDetails } = auth;
    const { title, content, articleId, boardId } = item;

    const onList = () => {
        history.push("/article/"+{boardId})
    };

    const onDelete = (e) => {

        e.preventDefault();

        articleDelete(articleId)
            .then(response => {
                history.push("/article/"+{boardId});
            })
            .catch(error => {
                console.log('error >> ', error);
            });
    };


    return (
        <table>
            {/* 댓글기능 미구현 */}
            <div>
                <thead>
                    <tr className="table_head">
                        <th width="10%">title</th>
                        <th width="50%">content</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{title}</th>
                        <th>{content}</th>
                    </tr>
                    <td>
                        <form onSubmit={e => onList(e)}>
                            <button type="submit" class="btn btn-outline-success my-2 my-sm-0">목록</button>
                        </form>
                        <span>
                        {(userDetails !== null)&&(item.memberId=== userDetails.memberId) ?
                            <div className="checkout_btn_inner d-flex align-items-center"><nav class="navbar navbar-light bg-light">
                                <form class="form-inline">

                                    <button class="btn btn-outline-success my-2 my-sm-0">수정</button>
                                    <form onSubmit={e => onDelete(e)}>
                                        <button type="submit" class="btn btn-outline-success my-2 my-sm-0">삭제</button>
                                    </form>
                                </form>
                            </nav>
                            </div> : ''}
                            </span>
                    </td>

                </tbody>

            </div>

        </table>




    )

};
const mapStateToProps = (state) => ({
    article: state.article,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    articleDelete: (articleId) => dispatch(Actions.articleDelete(articleId))
});



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDetail));
