import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navClose: { right: '0px' }
        }
    }

    componentWillMount() {
        if (window.innerWidth < 750) {
            this.setState({ navClose: { right: '-410px' } })
        }
        if (window.innerWidth < 1199) {
            this.setState({ navClose: { right: '-300px' } })
        }
    }

    openNav() {
        console.log('open')
        this.setState({ navClose: { right: '0px' } })
    }
    closeNav() {
        this.setState({ navClose: { right: '-410px' } })
    }

    onMouseEnterHandler() {
        if (window.innerWidth > 1199) {
            document.querySelector("#main-menu").classList.add("hover-unset");
        }
    }

    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensubmenu'))
            event.target.nextElementSibling.classList.remove('opensubmenu')
        else{
            document.querySelectorAll('.nav-submenu').forEach(function (value) {
                value.classList.remove('opensubmenu');
            });
            document.querySelector('.mega-menu-container').classList.remove('opensubmenu')
            event.target.nextElementSibling.classList.add('opensubmenu')
        }
    }

    handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.parentNode.nextElementSibling.classList.contains('opensubmegamenu'))
            event.target.parentNode.nextElementSibling.classList.remove('opensubmegamenu')
        else{
            document.querySelectorAll('.menu-content').forEach(function (value) {
                value.classList.remove('opensubmegamenu');
            });
            event.target.parentNode.nextElementSibling.classList.add('opensubmegamenu')
        }
    }

    render() {
        return (
            <div>
                <div className="main-navbar">
                    <div id="mainnav" >
                        <div className="toggle-nav" onClick={this.openNav.bind(this)} >
                            <i className="fa fa-bars sidebar-bar"/>
                        </div>
                        <ul className="nav-menu" style={this.state.navClose}>
                            <li className="back-btn" onClick={this.closeNav.bind(this)} >
                                <div className="mobile-back text-right">
                                    <span>닫기</span>
                                    <i className="fa fa-angle-right pl-2" aria-hidden="true"/>
                                </div>
                            </li>
                            <li>
                                <Link to={`${process.env.PUBLIC_URL}/`} className="nav-link">HOME</Link>
                            </li>
                            <li>
                                <Link to="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>작품<span className="sub-arrow" /></Link>
                                <ul className="nav-submenu">
                                    <li><Link to={`${process.env.PUBLIC_URL}/collections/${0}`}>전체</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/collections/${1}`}>서양화</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/collections/${2}`}>동양화</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/collections/${3}`}>기타</Link></li>
                                    
                                     
                                </ul>
                            </li>
                            <li>
                                <Link to="#" className="nav-link">지원<span className="sub-arrow" /></Link>
                                <ul className="nav-submenu">
                                    <li><Link to={`${process.env.PUBLIC_URL}/right-sidebar/collection`}>공지사항</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>FAQ</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/right-sidebar/collection`}>Q&A</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default NavBar;