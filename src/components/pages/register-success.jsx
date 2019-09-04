import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {connect} from "react-redux";
import {Actions} from "../../actions";
import {ActionTypes} from "../../constants/ActionTypes";

class RegisterWait extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSuccess: ''
        }
    }

    compareToken = () => {
        const { token } = this.props.match.params;

        this.props.checkRegisterToken(token)
            .then(response => {
                if(response.type === ActionTypes.CHECK_REGISTER_TOKEN_SUCCESS) {
                    this.setState({
                        ...this.state,
                        isSuccess: true
                    });
                } else {
                    this.setState({
                        ...this.state,
                        isSuccess: false
                    });
                }
            });
    }

    componentDidMount() {
        this.compareToken();
    }

    render (){
        const moveLogin = (e) => {
            e.preventDefault();
            this.props.history.push("/login")
        };

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
                                <h2>{this.state.isSuccess ? "회원 승인 완료!" : "회원 승인 실패!"}</h2>
                                <div className="row mb-3">
                                    {this.state.isSuccess ?
                                        <div className="col-sm-12">
                                            <h5>모든 가입과정이 성공적으로 완료되었습니다!</h5>
                                            <h5>이제 작가들의 다양한 작품을 감상하러 떠나보세요!</h5>
                                        </div>
                                        :
                                        <div className="col-sm-12">
                                            <h5>가입 인증메일이 만료되었거나, 유효하지 않은 경로로 접속하셨어요 ㅠㅠ</h5>
                                        </div>
                                    }
                                </div>
                                {this.state.isSuccess ?
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <button className="btn btn-solid" onClick={e => moveLogin(e)}>로그인 하러 가기
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <button className="btn btn-solid" onClick={e => moveHome(e)}>홈으로
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    checkRegisterToken: (token) => dispatch(Actions.checkRegisterToken(token))
});

export default connect(null, mapDispatchToProps)(RegisterWait);