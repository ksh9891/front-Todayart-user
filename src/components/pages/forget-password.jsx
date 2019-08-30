import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";

class ForgetPassword extends Component {
    render (){
        return (
            <div>
                <Breadcrumb title={'비밀번호 재설정'}/>

                {/*Forget Password section*/}
                <section className="pwd-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <h2>비밀번호 재설정</h2>
                                <form className="theme-form">
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control"
                                                   placeholder="가입 시 입력했던 이메일을 적어주세요" required />
                                        </div>
                                        <a href="#" className="btn btn-solid">메일 보내기</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default ForgetPassword