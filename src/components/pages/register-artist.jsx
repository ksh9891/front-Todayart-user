import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./register-artist.css"

class RegisterArtist extends Component {
    render (){
        const onSubmit = (e) => {
            e.preventDefault();
            alert("승인 결과는 이메일로 알려드릴게요 :)")
        }
        return (
            <div>
                <Breadcrumb title={'작가 신청'}/>

                {/*Forget Password section*/}
                <section className="contact-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <form className="theme-form" onSubmit={e => onSubmit(e)}>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="artistName">작가 이름</label>
                                            <input type="text"
                                                   className="form-control"
                                                   id="artistName"
                                                   placeholder="이름을 입력 해 주세요"
                                                   required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="artistContact">작가 연락처</label>
                                            <input type="text"
                                                   className="form-control"
                                                   id="artistContact"
                                                   placeholder="휴대폰 번호를 입력 해 주세요"
                                                   required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <label htmlFor="artistDesc">작가 소개</label>
                                            <textarea className="form-control"
                                                      placeholder="작가님의 소개를 간단하게 적어주세요 :)"
                                                      id="artistDesc"
                                                      rows="6"
                                                      required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <label htmlFor="mainProduct">주요 작품</label>
                                            <input type="file"
                                                   className="form-control"
                                                   id="mainProduct"
                                                   placeholder="자신의 작품 중 한 가지를 업로드 해 주세요. 승인 시 참고용으로 사용 됩니다."
                                                   required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <label htmlFor="productDesc">작품 소개</label>
                                            <textarea className="form-control"
                                                      placeholder="작가님의 작품에 대한 소개를 해주세요 :)"
                                                      id="productDesc"
                                                      rows="6"
                                                      required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">신청하기</button>
                                        </div>
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

export default RegisterArtist