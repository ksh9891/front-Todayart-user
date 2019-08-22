import React, { useEffect } from 'react';
import { Actions } from '../../actions';
import { connect } from 'react-redux';

const ArticleDetail = ({ article }) => {
    const { item } = article;
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

                </tbody>

            </div>

        </table>

    )

};
const mapStateToProps = (state) => ({
    article: state.article
});

const mapDispatchToProps = (dispatch) => ({
    getArticleDetail: () => dispatch(Actions.getArticleDetail())
});



export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)