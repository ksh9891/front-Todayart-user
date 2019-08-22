import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import { Actions } from '../actions';
import { withRouter } from 'react-router-dom';
import { ActionTypes } from '../constants';



   
    function Search({ fetchProductByName, fetchProductByArtist }) {


    // Callback Refs
    let textInput;
    let target = document.getElementById("searchSelect");
    



    const onSubmit = (e) => {
        e.preventDefault();
        console.log(target.options[target.selectedIndex].value);
        const searchword = textInput.value.trim();
        if (searchword.length > 0 &&  target.options[target.selectedIndex].value === "1") {
            console.log("if 1")
            fetchProductByName(searchword);
        }else if (searchword.length > 0 &&  target.options[target.selectedIndex].value === "2") {
            console.log("if 2")
            fetchProductByArtist(searchword);
        }
        //textInput.value = '';
    };


    



    return (


        <form className="search-form ml-auto" onSubmit={e => onSubmit(e)}>
        <div className="ml-auto d-flex">
            <div className="sorting ml-auto">
                <select id="searchSelect">
                    <option value="1">작품명</option>
                    <option value="2">작가이름</option>
                </select>
            </div>


            <div className="input-group filter-bar-search">
                <input type="text" ref={(element) => textInput = element} placeholder="검색" />
                <div className="input-group-append">
                    <button  type="submit" ><i className="ti-search" /></button>
                </div>
            </div>
        </div>
        </form>



    );

}

const mapStateToProps = (state) =>({
    items: state.product.items
})
const mapDispatchToProps = (dispatch) => ({
    fetchProductByName : (searchword) => dispatch(Actions.fetchProductByName(searchword)),
    fetchProductByArtist : (searchword) => dispatch(Actions.fetchProductByArtist(searchword))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))