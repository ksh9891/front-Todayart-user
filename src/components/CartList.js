import React from 'react';
import './components.css';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';


const getCart=()=>{
    return (
        axios.get('http://localhost:1111/cart',{
        headers:{
            'Authorization': `Bearer 21e40735-20eb-4b11-a6f9-2bfe723df8a8`,
            'Cache-Control': 'no-cache'
        }})
        .then(response=>(console.log(response)))
        
        )
}


export function CartList(){    
    getCart();
    return (
        <div>
        <ul className="list-group">
            <li className="list-group-item">
                Test
            </li>
        </ul>
    </div>
              
    );   

}