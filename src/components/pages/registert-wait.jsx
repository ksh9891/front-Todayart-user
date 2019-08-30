

import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {connect} from "react-redux";
import {Actions} from "../../actions";

class RegisterWait extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(atob(this.props.match.params.email));
        this.props.registerVerification(atob(this.props.match.params.email));
    }

    render (){
        const moveHome = (e) => {
            e.preventDefault();
            this.props.history.push("/")
        };

        return (
            <div>
                <Breadcrumb title={'회원가입'}/>

                {/*Forget Password section*/}
                <section className="pwd-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <h2>가입을 환영합니다!</h2>
                                <div className="row mb-3">
                                    <div className="col-sm-12">
                                        <h5>마지막 과정입니다! 가입 한 메일로 인증메일을 발송했습니다.</h5>
                                        <h5>메일에서 링크를 클릭하여 가입을 완료 해 주세요!</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <button className="btn btn-solid" onClick={e => moveHome(e)}>홈으로 이동</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    registerVerification: (email) => dispatch(Actions.registerVerification(email))
});

export default connect(null, mapDispatchToProps)(RegisterWait);