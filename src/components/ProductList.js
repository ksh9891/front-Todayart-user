import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../actions';
import { Files } from '../utils';
import { withRouter, Link } from 'react-router-dom';




function ProductList ({ items, match }){  
    
    const { id } = match.params;


    

    

    return (
        
        <div className="row">                   
                       
        {
            items.map((item, index) => {
               const { productName, productPrice, productId, thumbnail, artistName } = item;
               const { fileName } = thumbnail;
               const image = Files.filePath(fileName);
               return(

       <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
           <div className="card text-center card-product">
               <div className="card-product__img">
               <Link to={`/singleproduct/${productId}`}><img className="card-img" src={image} alt={productName} /></Link>
                   <ul className="card-product__imgOverlay">
                       <li>
                           <button><i className="ti-search" /></button>
                       </li>
                       <li>
                           <button><i className="ti-shopping-cart" /></button>
                       </li>
                       <li>
                           <button><i className="ti-heart" /></button>
                       </li>
                   </ul>
               </div>
               <div className="card-body">
                   <p>{artistName}</p>
                   <h4 className="card-product__title"><Link to={`/singleproduct/${productId}`}>{productName}</Link></h4>
                   <p className="card-product__price">{productPrice}</p>
               </div>
           </div>
       </div>
       
           );
           })
       }
       </div>
    );

}


const mapStateToProps = (state) =>({
    items: state.product.items
})




export default withRouter(connect(mapStateToProps, null)(ProductList))