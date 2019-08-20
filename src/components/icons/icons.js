import React from 'react';
import { connect } from 'react-redux';
import CircleIcon from './CircleIcon';
import {Link} from "react-router-dom";


 const SearchIcon= () =>{
    return (
        <li className="nav-item"><button><i className="ti-search" /></button></li>
);
}

 const CartIcon=({isLogin})=>{
     console.log("isLogin:", isLogin);
     let url = isLogin?"/cart":"/login";


return(
    
    <li className="nav-item"><Link className="nav-link" to={url}><button><i className="ti-shopping-cart"/><CircleIcon/></button></Link></li>
   
);
}

const mapStateToProps=(state)=>({
    isLogin:state.auth.isLogin
})

export const Icons={
    SearchIcon,
    CartIcon:connect(mapStateToProps,null)(CartIcon),
    CircleIcon:connect(mapStateToProps,null)(CircleIcon)

}
