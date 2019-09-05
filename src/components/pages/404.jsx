import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Slider from 'react-slick';

import Breadcrumb from "../common/breadcrumb";

class PageNotFound extends Component {

    constructor (props) {
        super (props)

    }

    render (){

        return (
            <div>
                <Breadcrumb title={''}/>

                <section className="p-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="error-section">
                                    <h1 style={{"height":"200px"}}>:-(</h1>
                                    <h2>앗, 이런! 잘 못 찾아왔어요!</h2>
                                    <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid">메인화면으로 돌아가기</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default PageNotFound