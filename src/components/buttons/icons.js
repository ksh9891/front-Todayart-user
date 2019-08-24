import React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";


 const SearchIcon= () =>{
    return (
        <li className="nav-item"><button><i className="ti-search" /></button></li>
);
}

 const CartIcon=({isLogin,items})=>{
     console.log("isLogin:", isLogin);
     let url = isLogin?"/cart":"/login";


return(
    <li className="nav-item"><Link className="nav-link" to={url}><button><i className="ti-shopping-cart"/>
            <span className="nav-shop__circle">{items.length===0?'':items.length}</span>
    </button></Link></li>
   
);
}

const mapStateToProps=(state)=>({
    isLogin:state.auth.isLogin,
    items:state.cart.items
})

export const Icons={
    SearchIcon,
    CartIcon:connect(mapStateToProps,null)(CartIcon),

}
