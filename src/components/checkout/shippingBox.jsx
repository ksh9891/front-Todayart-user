import React from 'react';
import {connect} from 'react-redux';
import './shippingBox.css';
import { Actions } from '../../actions';

class ShippingBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            member:props.member,
            addresses:props.order.addresses,
            mainAddress:props.order.mainAddress,
            selectAddress:"main"
        }
        
        this.props.getAddress();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.addresses!==prevState.addresses){
            console.log("getDerivedStateFromProps", nextProps)
            return {addresses:nextProps.order.addresses, mainAddress:nextProps.order.mainAddress}
        }
        return prevState
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldComponentUpdate", this.state, nextState)
        return true
    }

    
    render(){
        const {member, mainAddress} = this.state;
        
        const {realName, phone, email} = member;
        return(
            <div className="col-lg-6 col-sm-12 col-xs-12">
                    <div className="checkout-title">
                        <div className="shippingBox orderUser">
                        <h3>주문자 정보</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        이름
                                    </td>
                                    <td  className="secondTd">
                                        {realName}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        연락처
                                    </td>
                                    <td className="secondTd">
                                        {phone}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Email
                                    </td>
                                    <td className="secondTd">
                                        {email}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    
                <div className="checkout-title">
                    <div className="shippingBox">
                    <h3>배송지 정보</h3>
                    <div className="selectAddressBox">
                        <span id="mainAddress">
                        <input type="radio" name="address" value="MainAddress" id="MainAddress" defaultChecked="true" onClick={()=>{this.setState({selectAddress:"main"})}}/>
                        <label htmlFor="MainAddress">기본배송지 </label>
                        </span>
                        <span>
                        <input type="radio" name="address" value="otherAddress" id="otherAddress"onClick={()=>{this.setState({selectAddress:"new"})}}/>
                        <label htmlFor="otherAddress">신규배송지 </label>
                        </span>
                        <button onClick={()=>{}}>배송지 목록</button>
                    </div>
                    {this.state.selectAddress==="main"?
                    <div className="viewAddress">
                    {this.state.mainAddress?
                    <AsyncMainAddressBox mainAddress={this.state.mainAddress} />
                    : "로딩중입니다"
                    }
                   </div>
                   :
                   <div className="viewAddress">
                    <NewAddressBox/>
                    </div>
                    }
                    </div>
                </div>
            </div>
    )
}
}

class AsyncMainAddressBox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mainAddress : props.mainAddress[0]
        }
    }
    render(){
        console.log("asyncAddressBox", this.props.mainAddress);
        return(
            <table>
                <tbody className="addressTable">
                    <tr>
                        <td>수령인</td>
                        <td className="secondTd">{this.state.mainAddress.consignee}</td>
                    </tr>
                    <tr>
                        <td>연락처</td>
                        <td className="secondTd">{this.state.mainAddress.consigneePhone}</td>
                    </tr>
                    <tr className="addressCell">
                        <td rowSpan="3">주소</td>
                        <td className="secondTd">{this.state.mainAddress.postalNumber}</td>
                    </tr>
                    <tr>
                        <td className="secondTd">{this.state.mainAddress.address}</td>
                        
                    </tr>
                    <tr>
                        <td className="secondTd">{this.state.mainAddress.addressDetail}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

class NewAddressBox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            addAddress:false
        }
    }

    sample6_execDaumPostcode(){
        this.daum.Postcode.load({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("sample6_extraAddress").value = extraAddr;
                
                } else {
                    document.getElementById("sample6_extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample6_postcode').value = data.zonecode;
                document.getElementById("sample6_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("sample6_detailAddress").focus();
            }
        }).open();
    }


    render(){
        return(
            <div>
                <form>
                    <table>
                        <tbody>
                        <tr>
                        <td><label htmlFor="consignee">수령인</label></td>
                        <td colSpan="3" className="secondTd"><input type="text" id="consigee"/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="consigneePhone">연락처</label></td>
                            <td className="secondTd"><input type="tel" id="consigneePhone"/></td>
                            <td><input type="tel" id="consigneePhone"/></td>
                            <td><input type="tel" id="consigneePhone"/></td>
                        </tr>
                        <tr className="addressCell">
                            <td rowSpan="3"><label htmlFor="address">주소</label></td>
                            <td colSpan="2" className="secondTd"><input type="number" id="postalNumber" placeholder="우편번호"/> </td>
                            <td><button onClick={()=>{this.sample6_execDaumPostcode()}}>우편번호검색</button></td>
                            
                        </tr>
                        <tr>
                            <td colSpan="3" className="secondTd"><input type="number" id="address" placeholder="도로명 주소"/></td>
                            
                        </tr>
                        <tr>
                            <td colSpan="3" className="secondTd"><input type="number" id="addressDetail" placeholder="상세주소"/></td>
                        </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            <td></td>
                            <td colSpan="3" className="secondTd"><input type="checkBox" defaultChecked={false}
                             onClick={()=>{this.state.addAddress?this.setState({addAddress:false}):this.setState({addAddress:true})}}/>내 배송지에 추가합니다</td>
                            </tr>
                        </tfoot>
                    </table>
                </form>

                <script type="text/javascript">
                    <script></script>

                </script>

                </div>
            
        )
    }
}

const mapStateToProps=(state)=>({
    member:state.auth.userDetails,
    order:state.order
})

const mapDispatchToProps=(dispatch)=>({
    getAddress:()=>dispatch(Actions.getAddress())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingBox);