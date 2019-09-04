import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";

class BlogDetails extends Component {

    constructor (props) {
        super (props)
    }

    render (){


        return (
            <div>
                <Breadcrumb title={'Blog - Details'}/>
                
                
                {/*Blog Details section*/}
                <section className="blog-detail-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 blog-detail">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/about/about%20us.jpg`} className="img-fluid" alt=""/>
                                <h3>Remaining essentially unchanged.</h3>
                                <ul className="post-social">
                                    <li>25 January 2018</li>
                                    <li>Posted By : Admin Admin</li>
                                    <li><i className="fa fa-heart"></i> 5 Hits</li>
                                    <li><i className="fa fa-comments"></i> 10 Comment</li>
                                </ul>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <p>
                                            전시회소개
                                            
                                            글_고윤정 (토탈미술관 객원편집장, 이미단체 대표)
회화의 장르적 특성은 예술가의 개인적인 특성이 손으로 만지고, 처리하고, 표면을 만들어가는 기법들 그 자체에 주목한다는 데에 있다. 붓의 흔적, 뿌리기, 물감 자체의 물성은 사각의 캔버스를 움직임의 장으로 만들고, 매순간의 예술가의 체계는 예술가 고유의 징후들로 나타난다. 고진이의 고유한 징후는 유화물감으로 붓터치를 겹치고 비벼서 표현하는 것인데, 그 행위가 화면에 축적되고, 촉감적인 느낌이 더해지는 것이다. 
더불어 고진이는 누군가의 ‘기억’이라는 비물질적인 시점에서 출발하여, 그 과정을 그때 받았던 감정, 흔적의 인상을 빛과 그 빛을 품은 공간 등 물질적인 작업으로 환원시킨다. 그때 마셨던 홍차의 향, 아침에 받았던 따듯한 햇살, 누군가의 공간에서 발견한 수 십년 전 자국은 켜켜이 쌓인 붓질 속에서 ‘색’과 ‘면’으로 드러난다. ‘기억’이라는 추상성에 기반한 작업은 그 시점에 받았던 감정을 충실하게 캔버스에 옮겨지고, 오래될수록 모호한 기억을 방증하듯 화폭에는 명확한 사물에 대한 인지보다는 잔상만이 남는다. 그 잔상은 어디가 테이블이었는지, 어디에 의자가 있었는지는 세세히 보이지 않지만, 하나하나 철저히 색과 경계의 기호로 변모하여 작가의 시선으로 다시 배치된다. 기억이 공간으로 바뀌어 가면서 색과 면의 배치는 공간 안에서의 ‘관계’와 맥을 같이 한다. 끊임없이 많은 이들의 사적인 상황들이 스쳐지나갔을 작업실 바닥의 흔적들을 보며 작가는 공간을 구성하는 사물들이 갖고 있는 공간 속의 텐션을 캔버스에 대입시킨다. 
초기작에서 최근작에 이르기까지 고진이의 작업이 작가가 살면서 보고 듣고 느낀 여러 가지 기억들이 중첩되는 과정에 기반하였다면, "Togidashi" 전시에서 보이는 기억은 오래된 작업실을 거쳐간 수많은 사람들이 만들어낸 기억이다. ‘도기다기’는 본래 공사현장에서 쓰이는 단어이면서 일본식 발음을 그대로 부르는 시멘트 바닥의 이름인데, 작가는 40년이 넘은 시멘트 바닥에 흩어져 있는 자국들을 표현하는 회화작업의 행위 과정을 ‘돌 따위를 갈아서 윤을 만들어 낸다는’ 뜻의 오랜 공사 용어에 빗대었다.
기존의 작업이 색면추상에 가깝다면, 시멘트 바닥이 연상되는 자국들에 작가의 감성이 묻어나면서 관객은 한 공간에 침투한 오래된 사건과 상황들을 상상하게 된다. 그 자국들이 좋은 기억이든 나쁜 기억이든 자연스럽게 주름진 듯한 공간의 패임과 깊이는 세월이 녹아난 이면의 이야기들을 소환한다. 
1층이 타인이 내고 간 흔적과 패임에 대한 기억들이라면 2층은 작가가 갖고 있는 공간에 대한 기억들이다. 작가의 시선으로 다시 환기하는 공간에 대한 느낌들은 단편적인 기록이 아닌 오랜 시간성을 함축한 화폭의 면으로 바뀐다. 1층과 2층을 연결하는 지점에는 Seeds of Space" 시리즈가 있다. 이는 작가가 관객이 작가의 기억을 읽어내는 것뿐 아니라 "Seeds of Space"와 금경거울을 통해 관객의 기억을 여백에 채워볼 수 있는 단서가 되기를 바라기 때문이다. 
고진이의 작업은 이처럼 ‘기억’을 중심으로 나의 관점에서 혹은 타인의 관점에서 여러 가지 상황들을 끊임없이 추적해 보고, 그 추적의 결과가 색면과 공간감, 붓자국으로 표현되고 있다 하겠다.</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div className="row section-b-space">
                            <div className="col-sm-12">
                                <ul className="comment-section">
                                    <li>
                                        <div className="media">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/avtar.jpg`} alt="Generic placeholder image" />
                                                <div className="media-body">
                                                    <h6>작가이름 <span>( 12 Jannuary 2018 at 1:30AM )</span></h6>
                                                    <p>
                                                        작가소개
                                                    </p>
                                                </div>
                                        </div>
                                    </li>
                                    
                                    

                                </ul>
                            </div>
                        </div>
                        <div className="row blog-contact">
                            <div className="col-sm-12">
                                <h2>Leave Your Comment</h2>
                                <form className="theme-form">
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="Enter Your name" required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email"
                                                   required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Comment</label>
                                            <textarea className="form-control" placeholder="Write Your Comment"
                                                      id="exampleFormControlTextarea1" rows="6"></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">Post Comment</button>
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

export default BlogDetails