// 상품상세페이지 하단 내용, 디테일, 비디오, 리뷰 쓰는 곳에 대한 코드

import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import queryString from 'query-string'
import ProductQandA from '../../articles/ProductQandA';
import { Actions } from '../../../actions'


class DetailsTopTabs extends Component {

    constructor(props) {
        super(props)
        this.state = {
          boardId: queryString.parse(props.location.search).boardId
        }
      }

    render() {

        const { symbol, item } = this.props
        const { userDetails } = this.props.auth;

        return (
            <section className="tab-product m-0">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                <Tab className="nav-item">
                                    <span className="nav-link active">
                                        <i className="icofont icofont-ui-home"></i>Description </span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Details</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Video</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Product Q&A</span>
                                    <div className="material-border"></div>
                                </Tab>
                            </TabList>
                            <TabPanel className="tab-pane fade mt-4 show active">
                                <table className="table table-striped mb-0">
                                    <tbody>

                                        <tr>
                                            <th>상품명 :</th>
                                            <td>{item.productName}</td>
                                        </tr>
                                        <tr>
                                            <th>작가 :</th>
                                            <td>{item.artistName}</td>
                                        </tr>
                                        <tr>
                                            <th>상품크기 :</th>
                                            <td>{item.productSize}</td>
                                        </tr>
                                        <tr>
                                            <th>상품가격 :</th>
                                            <td>{symbol}{item.productPrice}</td>
                                        </tr>
                                        <tr>
                                            <th>배송비 :</th>
                                            <td>{symbol}{item.shippingFee}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel>
                                <p className="mt-4 p-0">
                                    {item.productContent}
                                </p>
                            </TabPanel>
                            <TabPanel>
                                <div className="mt-4 text-center">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe
                                            src="https://www.youtube.com/embed/BUWzX78Ye_8"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <form className="theme-form mt-4">
                                    <div className="form-row">
                                        {/* <div className="col-md-12 ">
                                            <div className="media m-0">
                                                <label>Rating</label>
                                                <div className="media-body ml-3">
                                                    <div className="rating three-star">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Enter Your name" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email" required />
                                        </div> */}
                                        <ProductQandA />
                                        <span>
                                            {userDetails !== null ?
                                                <div className="checkout_btn_inner d-flex align-items-center">
                                                    <nav className="navbar navbar-light bg-light">
                                                        <form className="form-inline">
                                                            <button className="btn btn-outline-success my-2 my-sm-0">
                                                                <Link to={"/articleWrite"} boardId={this.props.article.boardName.boardId}>질문하기</Link>
                                                            </button>
                                                        </form>
                                                    </nav>
                                                </div> : ''}
                                        </span>
                                    </div>
                                </form>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({

    article: state.article,
    auth: state.auth,
    data: state.data,
    symbol: state.data.symbol,
    items : state.data.items
  });

export default withRouter(connect(mapStateToProps, null)(DetailsTopTabs))


