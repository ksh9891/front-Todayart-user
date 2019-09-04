import React from 'react'
import {Term} from './term'

class TermnCondition extends React.Component{
render(){
    return(
        <div style={{ "marginTop":"50px", "marginBottom":"50px"}}>
        <div style={{"width":"75%", "margin":"auto", "textAlign":"left"}}><h2>이용약관</h2><p><h5>개인정보처리 방침</h5></p></div>
    <div style={{"width":"75%", "margin":"auto"}}>
        <Term/>
    </div>
    </div>
    )
}
}

export default TermnCondition