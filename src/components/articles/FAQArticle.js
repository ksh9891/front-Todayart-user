import React, { useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";

import { Actions } from '../../actions';
import Breadcrumb from '../common/breadcrumb'

class FAQArticle extends Component {

  constructor(props) {
    super(props)
  }

  componentDidmount(){
  }

  render() {

    
    console.log('props = ',this.props)

    const {items} = this.props.article

    return(
<div>
<Breadcrumb title={this.props.article.boardName} />

  
    {items.map((item) => {
      const {title, content} = item;
      return (
        <div>
          {/*Dashboard section*/}
          <section className="faq-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="accordion theme-accordion" id="accordionExample">
                    <div className="card">
                      <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                          <button className="btn btn-link" type="button" data-toggle="collapse"
                            data-target="#collapseOne" aria-expanded="true"
                            aria-controls="collapseOne">
                            {item.title}
                          </button>
                        </h5>
                      </div>
  
                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div className="card-body">
                          <p>{item.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
        </div >
      )
  })}
  </div>
  )
    
  }
}


const mapStateToProps = (state) => ({
  article: state.article
});

const mapDispatchToProps = (dispatch) => ({
  getArticleList: (boardId) => dispatch(Actions.getArticleList(boardId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FAQArticle))