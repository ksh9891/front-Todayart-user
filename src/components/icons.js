import React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";


 const SearchIcon= () =>{
    return (
        <li className="nav-item"><button><i className="ti-search" /></button></li>
);
}


 const CartIcon=({isLogin})=>{
     let url = isLogin?"/cart":"/login";
return(
    
    <li className="nav-item"><Link className="nav-link" to={url}><button><i className="ti-shopping-cart"/><CircleIcon/></button></Link></li>
   
);
}

 const CircleIcon= () =>{
    return (
        <span className="nav-shop__circle">2</span>
    );
}

const mapStateToProps=(state)=>({
    isLogin:state.auth.isLogin
})

export const Icons={
    SearchIcon,
    CircleIcon,
    CartIcon:connect(mapStateToProps)(CartIcon)
}
