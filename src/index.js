import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import './index.scss';

// Import custom components
import store from './store';

// Layouts
import TodayArt from './components/layouts/todayart/main';

// Product Pages
import NoSideBar from "./components/products/no-sidebar";
import CollectionCategory from "./components/collection/collection-no-sidebar1";
import CollectionSearch from "./components/collection/collection-no-sidebar";

// Features
import Cart from './components/cart'
import wishList from './components/wishlist'
import checkOut, {kakaoSuccessFail, kakaoCancel} from './components/checkout'
import kakaoSuccess from './components/checkout/kakao'
import orderSuccess from './components/checkout/success-page'

// Extra Pages
import Login from './components/pages/login'
import Register from './components/pages/register'
import RegisterWait from "./components/pages/register-wait";
import RegisterSuccess from "./components/pages/register-success";
import Account from './components/pages/account/account'
import Password from './components/pages/account/password'
import Orders from './components/pages/account/orders.jsx'
import RegisterArtist from './components/pages/register-artist'
import Address from './components/pages/account/address'
import AddressAdd from './components/pages/account/address-add'

import PageNotFound from './components/pages/404'
import Search from './components/pages/search'
import Collection from './components/pages/collection'
import ForgetPassword from './components/pages/forget-password'
import Faq from './components/pages/faq'
import SupportContainer from './containers/SupportContainer'

// Custom Components
import HeaderFive from './components/common/headers/header-five';

// ThemeSettings
import FooterTwo from "./components/common/footers/footer-two";

// Product Elements
import ArticleWrite from './components/articles/ArticleWrite';

import TermnCondition from './components/common/termncondition'

class Root extends React.Component {
    render() {
        return(
        	<Provider store={store}>
                <BrowserRouter basename={'/'} >
                    <ScrollContext>
                            <React.Fragment>
                                {/* eslint-disable-next-line react/jsx-no-undef */}
                                <HeaderFive logoName={'logo.png'}/>
                                <Switch>
                                {/* 메인페이지 */}
                                <Route exact path={`${process.env.PUBLIC_URL}/`} component={TodayArt}/>

                                {/* Account private area */}
                                <Route exact path={`${process.env.PUBLIC_URL}/account`} component={Account} />
                                <Route exact path={`${process.env.PUBLIC_URL}/account/password`} component={Password} />
                                <Route path={`${process.env.PUBLIC_URL}/account/orders`} component={Orders}/>
                                <Route path={`${process.env.PUBLIC_URL}/account/addresses`} component={Address}/>
                                <Route path={`${process.env.PUBLIC_URL}/account/addresses-add`} component={AddressAdd}/>

                                <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                                <Route path={`${process.env.PUBLIC_URL}/register`} component={Register}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/register-wait/:email`} component={RegisterWait}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/register-success/:token`} component={RegisterSuccess}/>
                                <Route path={`${process.env.PUBLIC_URL}/forget-password`} component={ForgetPassword}/>
                                <Route path={`${process.env.PUBLIC_URL}/cart`} component={Cart}/>
                                <Route path={`${process.env.PUBLIC_URL}/wishlist`} component={wishList} />

                                <Route path={`${process.env.PUBLIC_URL}/register-artist`} component={RegisterArtist}/>

                                {/* Product */}
                                <Route path={`${process.env.PUBLIC_URL}/product/:id`} component={NoSideBar}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/collections/:id`} component={CollectionCategory}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/collection`} component={CollectionSearch}/>

                                {/*Routes For custom Features*/}
                                <Route exact path={`${process.env.PUBLIC_URL}/checkout`} component={checkOut}/>
                                <Route path={`${process.env.PUBLIC_URL}/order-success`} component={orderSuccess}/>

                                <Route path={`${process.env.PUBLIC_URL}/checkout/kakaoSuccessFail`} component={kakaoSuccessFail}/>
                                <Route path={`${process.env.PUBLIC_URL}/checkout/kakaoSuccess`} component={kakaoSuccess}/>
                                <Route path={`${process.env.PUBLIC_URL}/checkout/kakaoCancel`} component={kakaoCancel}/>

                                {/*Routes For Extra Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/pages/404`} component={PageNotFound}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/search`} component={Search}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/collection`} component={Collection}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/faq`} component={Faq}/>
                                <Route path={`${process.env.PUBLIC_URL}/articles`} component={SupportContainer}/>
                                <Route exact path={`${process.env.PUBLIC_URL}/articleWrite`} component={ArticleWrite}/>
                                <Route path={`${process.env.PUBLIC_URL}/articleWrite/:articleId`} component={ArticleWrite}/>
                                <Route path={`${process.env.PUBLIC_URL}/term`} component={TermnCondition}/>

                                <Route component={PageNotFound}/>
                                </Switch>
                                <FooterTwo logoName={'logo.png'}/>
                            </React.Fragment>
                    </ScrollContext>
                </BrowserRouter>
			</Provider>
    	);
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


