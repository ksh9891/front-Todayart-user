import React from 'react';
import {Link} from 'react-router-dom'
import Logo from '../common/TodayArtlogo10.png'


function LogoImage(props) {

    return <Link to={`${process.env.PUBLIC_URL}/`} >
                <img src={Logo} alt="" className="img-fluid" />
            </Link>;
}

export default LogoImage;