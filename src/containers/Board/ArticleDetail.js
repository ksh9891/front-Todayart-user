import React, { useEffect } from 'react';
import { Actions } from '../../actions';
import { connect } from 'react-redux';

const ArticleDetail = ({ article }) => {
    const { item } = article;
    const { title, content } = item;
    return (
        <table class="table table-hover">

                    <div>
                <thead>
                    <tr className="table_head">
                        <th width="10%">제목</th>
                        <th width="50%"></th>
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