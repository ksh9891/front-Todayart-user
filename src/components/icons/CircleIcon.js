import React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

 const CircleIcon=({items})=>{
    
    return (
        <span className="nav-shop__circle">{items.length===0?'':items.length}</span>
    );
}

const mapStateToProps=(state)=>({
    items:state.cart.items
})

export default connect(mapStateToProps)(CircleIcon);