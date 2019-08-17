import React from 'react';
import {connect} from 'react-redux';
import {Actions} from '../actions';
import {CartList} from '../components';
import './Cart.css';

export function Cart(){
    return(
        <div>
        <h1 className = "cart"> 장바구니 </h1>
          <CartList/>
        </div>
      
    );
}