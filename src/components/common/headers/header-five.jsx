import React, { Component } from 'react';
import Pace from 'react-pace-progress'

// Import custom components
import store from '../../../store';
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import CartContainer from "./../../../containers/CartContainer";
import {changeCurrency} from '../../../actions'
import {connect} from "react-redux";
import TopBarDark from "./common/topbar-dark";
import LogoImage from "./common/logo";

import {Link, withRouter} from "react-router-dom";

import { Actions } from '../../../actions'

class HeaderFive extends Component {

    constructor(props) {
        super(props);

		this.state = {
			isLoading:false,
			cart:props.cart
		}

		this.textInput = React.createRef();
    }
    /*=====================
         Pre loader
		 ==========================*/


		static getDerivedStateFromProps(nextProps, prevState){
			 setTimeout(function() {
				 document.querySelector(".loader-wrapper").style = "display: none";
			 }, 2000);
			 if(prevState.cart!==nextProps.cart){
			 return {cart:nextProps.cart}
			 }
			 return null;
			 
			}
			
			shouldComponentUpdate(nextProps, nextState){
				if(this.state.cart!==nextState.cart){
				return true;}
				return false;
		 	}

		 getSnapshotBeforeUpdate(prevProps, prevState){
			 return window.addEventListener('scroll', this.handleScroll);
		 }

		 componentDidUpdate(prevProps, prevState){
			 if(prevState.cart!==this.state.cart){
			 this.forceUpdate()}
		 }

   
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let number = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        if (number >= 300) {
            if (window.innerWidth < 576) {
                document.getElementById("sticky").classList.remove('fixed');
            }else
                document.getElementById("sticky").classList.add('fixed');
        } else {
            document.getElementById("sticky").classList.remove('fixed');
        }
    }

    openNav() {
        var openmyslide = document.getElementById("mySidenav");
        if(openmyslide){
            openmyslide.classList.add('open-side')
		}
    }
    openSearch() {
        document.getElementById("search-overlay").style.display = "block";
    }

    closeSearch() {
        document.getElementById("search-overlay").style.display = "none";
    }

	load = ()=>{
		this.setState({isLoading: true});
		fetch().then(()=>{
			// deal with data fetched
			this.setState({isLoading: false})
		})
	};
	
	render() {


		const onSubmit = (e) => {
            e.preventDefault();
			const searchword = this.textInput.current.value.trim(); 
			
			console.log('word',searchword)
			//this.props.history.push('/collection');
            this.props.fetchProductBySearch(searchword)
                .then(response => {
				
					console.log('word',searchword)
                    this.props.history.push(`/collection`);
                })
                .catch(error => {
                    console.log('error >> ', error);
                });

		};
		
	


		return (
			<div>
				<header id="sticky" className="sticky">
					{this.state.isLoading ? <Pace color="#27ae60"/> : null}
					<div className="mobile-fix-option"></div>
					{/*Top Header Component*/}
					<TopBarDark />

					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<div className="main-menu">
									<div className="menu-left category-nav-right">
										<div className="brand-logo">
                                            <LogoImage logo={this.props.logoName} />
										</div>
										{/*<div className="navbar">*/}
										{/*	<a href="" onClick={this.openNav}>*/}
										{/*		<div className="bar-style"> <i className="fa fa-bars sidebar-bar" aria-hidden="true" /></div>*/}
										{/*	</a>*/}
										{/*	/!*SideBar Navigation Component*!/*/}
										{/*	<SideBar/>*/}
										{/*</div>*/}
									</div>
									<div className="menu-right pull-right">
										{/*Top Navigation Bar Component*/}
										<NavBar/>

										<div>
											<div className="icon-nav">
												<ul>
													<li className="onhover-div mobile-search">
														<div>
															<img src={`${process.env.PUBLIC_URL}/assets/images/icon/search.png`}
																 onClick={this.openSearch}
																 className="img-fluid"
																 alt=""
															/>
															<i className="fa fa-search" onClick={this.openSearch} />
														</div>
													</li>
													{/*Header Cart Component */}
													<CartContainer/>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>

                <div id="search-overlay" className="search-overlay">
                    <div>
                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">Ã—</span>
                        <div className="overlay-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12">
									<form onSubmit={e => onSubmit(e)}>
                                            <div className="form-group">
												<input type="text"
												 className="form-control" 
												 id="searchword"  
												 ref={this.textInput}
												 placeholder="Search a Product" />
                                            </div>
                                            <button type="submit"  onClick={this.closeSearch} className="btn btn-primary"><i className="fa fa-search" /></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			)
	}
}

const mapStateToProps = (state) => ({
	items : state.data.items,
	cart: state.cart
})

const mapDispatchToProps = (dispatch) => ({
    
    fetchProductBySearch:(searchword) => dispatch(Actions.fetchProductBySearch(searchword)),   
    changeCurrency: () => dispatch(changeCurrency())
   
})



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderFive));