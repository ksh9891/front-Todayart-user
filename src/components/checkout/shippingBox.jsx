import React from 'react';
import {connect} from 'react-redux';
import './shippingBox.css';
import { Actions } from '../../actions';
import Modal from 'react-responsive-modal';

class ShippingBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            member:props.member,
            addresses:props.member.memberAddresses?props.member.memberAddresses:null,
            mainAddress:props.member.memberAddresses?props.member.memberAddresses.filter(item=>item.mainAddress==='y')[0]:null,
            address:props.member.memberAddresses?props.member.memberAddresses.filter(item=>item.mainAddress==='y')[0]:null,
            checkedAddress:props.member.memberAddresses?props.member.memberAddresses.filter(item=>item.mainAddress==='y')[0]:null,
            selectAddress:"main",
            open:false
        }
        
        this.props.getAddress();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.addresses!==prevState.addresses){
            console.log("getDerivedStateFromProps", nextProps)
            return {addresses:nextProps.order.addresses, mainAddress:nextProps.order.mainAddress}
        }
        if(nextProps.address!==prevState.address){
            return {address:nextProps.address}}
        return prevState
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldComponentUpdate", this.state, nextState)
        return true;
    }

    componentWillUnmount(){
        
    }

    

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    
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
                                        {realName?realName:<input type="text" id="member"/>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        연락처
                                    </td>
                                    <td className="secondTd">
                                        {phone?phone:<input type="tel" id="memberPhone"/>}
                                        {phone?phone:<input type="tel" id="memberPhone"/>}
                                        {phone?phone:<input type="tel" id="memberPhone"/>}
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
                        <button type="button" data-toggle="modal" data-target="#exampleModalScrollable" className="btn btn-sm btn-solid ta-btn-sm" onClick={()=>this.onOpenModal}>배송지 목록</button>
                        

{/*Modal*/}

                        <div className="modal fade" id="exampleModalScrollable" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                            <div className="modal-content address_list">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalScrollableTitle">배송지 목록</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="table-responsive">
                                        <table className="table table-responsive-sm ta-table">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>주소</th>
                                                    <th>우편번호</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            { this.state.member.memberAddresses === null || this.state.member.memberAddresses === undefined ?
                                                <tr>
                                                    <td colSpan="4" className="ta-address-none">등록된 배송지가 없어요!</td>
                                                </tr>
                                                :
                                                this.state.member.memberAddresses.map((memberAddress, index) => {
                                                        return (
                                                            <tr key={memberAddress.addressId}>
                                                                <td>{index+1}</td>
                                                                <td style={{'textAlign': 'left'}}>{memberAddress.address} {memberAddress.addressDetail}</td>
                                                                <td>{memberAddress.postalNumber}</td>
                                                                <td><input type="radio" name="check" value={memberAddress.addressId} defaultChecked={memberAddress.mainAddress==='y'?true:false}
                                                                onClick={()=>this.setState({checkedAddress:memberAddress})}/></td>
                                                            </tr>
                                                        )
                                                    })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-solid ta-btn-sm" data-dismiss="modal" onClick={()=>{this.setState({address:this.state.checkedAddress, selectAddress:'main'})}}>주소 선택하기</button>
                                <button type="button" className="btn btn-sm btn-solid ta-btn-sm cl" data-dismiss="modal">닫기</button>
                            </div>
                            </div>
                        </div>
                        </div>



                    </div>
                    {this.state.selectAddress==="main"?
                    <div className="viewAddress">
                    {this.state.mainAddress?
                    <AsyncMainAddressBox mainAddress={this.state.mainAddress} address={this.state.address} />
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
            mainAddress : props.mainAddress[0],
            address:props.mainAddress[0]
        }
        console.log("CONSTROCTOR", this.props.mainAddress, this.state.mainAddress, this.state.address)
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.address!==nextProps.address){
            return {address:nextProps.address}
        }
        return null;
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.address!==nextState.address){
            return true
        }
        return false
    }


    render(){
        return(
            <div>
                {this.state.address?
            <table>
                <tbody className="addressTable">
                    <tr>
                        <td>수령인</td>
                        {this.state.address!==null&&this.state.address.consignee!==undefined&&this.state.address.consignee!==null?
                        <td className="secondTd">{this.state.address.consignee}</td>:
                        <td className="secondTd"><input type="text" id="consigee" required/></td>}
                    </tr>
                    <tr>
                        <td>연락처</td>
                        {this.state.address!==null&&this.state.address.consigneePhone!==undefined&&this.state.address.consigneePhone!==null?
                        <td className="secondTd">{this.state.address.consigneePhone}</td>:
                        <div>
                        <td className="secondTd" colSpan="3"><input type="tel" id="consigneePhone" required/><input type="tel" id="consigneePhone" required/><input type="tel" id="consigneePhone" required/></td>
                        </div>}
                    </tr>
                    <tr className="addressCell">
                        <td rowSpan="3">주소</td>
                        <td className="secondTd">{this.state.address.postalNumber}</td>
                    </tr>
                    <tr>
                        <td className="secondTd">{this.state.address.address}</td>
                        
                    </tr>
                    <tr>
                        <td className="secondTd">{this.state.address.addressDetail}</td>
                    </tr>
                </tbody>
            </table>
                :<div className="ta-address-none" style={{"marginTop":"30px","marginBottom":"10px", "textAlign":"left", "paddingLeft":"10px"}}>등록된 배송지가 없어요!</div>
                }
            </div>
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

   
    


    render(){
        return(
            <div>
                    <table>
                        <tbody>
                        <tr>
                        <td><label htmlFor="consignee">수령인</label></td>
                        <td colSpan="3" className="secondTd"><input type="text" id="consigee"/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="consigneePhone">연락처</label></td>
                            <td className="secondTd" colSpan="3"><input type="tel" id="consigneePhone"/>
                            <input type="tel" id="consigneePhone"/>
                            <input type="tel" id="consigneePhone"/></td>
                        </tr>
                        <tr className="addressCell">
                            <td rowSpan="3"><label htmlFor="address">주소</label></td>
                            <td colSpan="2" className="secondTd"><input type="number" id="postalNumber" placeholder="우편번호"/> </td>
                            <td><button type="button" data-toggle="modal" data-target="#searchPostalNumber" className="btn btn-sm btn-solid ta-btn-sm" onClick={()=>this.onOpenModal}>우편번호검색</button></td>                            
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
                <div className="modal fade" id="searchPostalNumber" tabIndex="-1" role="dialog" aria-labelledby="searchPostalNumberTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                            <div className="modal-content address_list">
                            <div className="modal-header">
                                <h5 className="modal-title" id="searchPostalNumberTitle">배송지 목록</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12">
                                   sdafdaf
                                </div>
                            </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-solid ta-btn-sm" data-dismiss="modal">주소 선택</button>
                                <button type="button" className="btn btn-sm btn-solid ta-btn-sm cl" data-dismiss="modal">닫기</button>
                            </div>
                        </div>
                    </div>
                </div>

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