import React, { useEffect } from 'react';
import { Actions } from '../../actions';
import { connect } from 'react-redux';

const ArticleDetail = ({ article, auth }) => {

    const { item } = article;
    const { userDetails } = auth;
    const { title, content } = item;

    return (
        <table>
            {/* 댓글기능 / 작성자에게만 보이는 수정,삭제 버튼 미구현 */}
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
                        {item.memberId === userDetails.memberId ? 
                        <div className="checkout_btn_inner d-flex align-items-center"><nav class="navbar navbar-light bg-light">
                                <form class="form-inline">
                                    <input class="search" type="search" placeholder="Search" aria-label="Search" />
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">수정</button>
                                </form>
                            </nav>
                                <a className="nav-link primary-btn ml-2">삭제</a>
                        </div> : ''}
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
    getArticleDetail: () => dispatch(Actions.getArticleDetail())
});



export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)