
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Actions } from '../actions';
import ProductList from '../components/ProductList';

function Artwork  ({ fetchArtwork }) {

    useEffect(() => {
        fetchArtwork()
    }, []);

    
  return (
      <div>
          <section className="section-margin--small mb-5">
              <div className="container">
                  <div className="row">
                      <div className="col-xl-3 col-lg-4 col-md-5">
                          <div className="sidebar-categories">
                              <div className="head">Browse Categories</div>
                              <ul className="main-categories">
                                  <li className="common-filter">
                                      <form action="#">
                                          <ul>
                                              <li className="filter-list"><input className="pixel-radio" type="radio" id="men" name="brand" /><label for="men">Men<span> (3600)</span></label></li>
                                              <li className="filter-list"><input className="pixel-radio" type="radio" id="women" name="brand" /><label for="women">Women<span> (3600)</span></label></li>
                                              <li className="filter-list"><input className="pixel-radio" type="radio" id="accessories" name="brand" /><label for="accessories">Accessories<span> (3600)</span></label></li>
                                              <li className="filter-list"><input className="pixel-radio" type="radio" id="footwear" name="brand" /><label for="footwear">Footwear<span> (3600)</span></label></li>
                                              <li className="filter-list"><input className="pixel-radio" type="radio" id="bayItem" name="brand" /><label for="bayItem">Bay item<span> (3600)</span></label></li>
                                              <li className="filter-list"><input className="pixel-radio" type="radio" id="electronics" name="brand" /><label for="electronics">Electronics<span> (3600)</span></label></li>
                                              <li className="filter-list"><input className="pixel-radio" type="radio" id="food" name="brand" /><label for="food">Food<span> (3600)</span></label></li>
                                          </ul>
                                      </form>
                                  </li>
                              </ul>
                          </div>
                          <div className="sidebar-filter">
                              <div className="top-filter-head">Product Filters</div>
                              <div className="common-filter">
                                  <div className="head">Brands</div>
                                  <form action="#">
                                      <ul>
                                          <li className="filter-list"><input className="pixel-radio" type="radio" id="apple" name="brand" /><label for="apple">Apple<span>(29)</span></label></li>
                                          <li className="filter-list"><input className="pixel-radio" type="radio" id="asus" name="brand" /><label for="asus">Asus<span>(29)</span></label></li>
                                          <li className="filter-list"><input className="pixel-radio" type="radio" id="gionee" name="brand" /><label for="gionee">Gionee<span>(19)</span></label></li>
                                          <li className="filter-list"><input className="pixel-radio" type="radio" id="micromax" name="brand" /><label for="micromax">Micromax<span>(19)</span></label></li>
                                          <li className="filter-list"><input className="pixel-radio" type="radio" id="samsung" name="brand" /><label for="samsung">Samsung<span>(19)</span></label></li>
                                      </ul>
                                  </form>
                              </div>
                              <div className="common-filter">
                                  <div className="head">Color</div>
                                  <form action="#">
                                      <ul>
                                          <li className="filter-list"><input className="pixel-radio" type="radio" id="black" name="color" /><label for="black">Black<span>(29)</span></label></li>
                                          <li className="filter-list"><input className="pixel-radio" type="radio" id="balckleather" name="color" /><label for="balckleather">Black
                                              Leather<span>(29)</span></label></li>
                                          <li className="filter-list"><input className="pixel-radio" type="radio" id="blackred" name="color" /><label for="blackred">Black
                                              with red<span>(19)</span></label></li>
                                          <li className="filter-list"><input className="pixel-radio" type="radio" id="gold" name="color" /><label for="gold">Gold<span>(19)</span></label></li>
                                          <li className="filter-list"><input className="pixel-radio" type="radio" id="spacegrey" name="color" /><label for="spacegrey">Spacegrey<span>(19)</span></label></li>
                                      </ul>
                                  </form>
                              </div>
                              <div className="common-filter">
                                  <div className="head">Price</div>
                                  <div className="price-range-area">
                                      <div id="price-range"></div>
                                      <div className="value-wrapper d-flex">
                                          <div className="price">Price:</div>
                                          <span>$</span>
                                          <div id="lower-value"></div>
                                          <div className="to">to</div>
                                          <span>$</span>
                                          <div id="upper-value"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-xl-9 col-lg-8 col-md-7">
                          <div className="filter-bar d-flex flex-wrap align-items-center">
                              <div className="sorting">
                                  <select>
                                      <option value="1">Default sorting</option>
                                      <option value="1">Default sorting</option>
                                      <option value="1">Default sorting</option>
                                  </select>
                              </div>
                              <div className="sorting mr-auto">
                                  <select>
                                      <option value="1">Show 12</option>
                                      <option value="1">Show 12</option>
                                      <option value="1">Show 12</option>
                                  </select>
                              </div>
                              <div>
                                  <div className="input-group filter-bar-search">
                                      <input type="text" placeholder="Search" />
                                          <div className="input-group-append">
                                              <button type="button"><i className="ti-search" /></button>
                                          </div>
                                  </div>
                              </div>
                          </div>
                          <section className="lattest-product-area pb-40 category-list">
                              <ProductList/>
                          </section>
                      </div>
                  </div>
              </div>
          </section>
          <section className="related-product-area">
              <div className="container">
                  <div className="section-intro pb-60px">
                      <p>Popular Item in the market</p>
                      <h2>Top <span className="section-intro__style">Product</span></h2>
                  </div>
                  <div className="row mt-30">
                      <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                          <div className="single-search-product-wrapper">
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-1.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-2.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-3.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                          <div className="single-search-product-wrapper">
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-4.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-5.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-6.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                          <div className="single-search-product-wrapper">
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-7.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-8.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-9.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                          <div className="single-search-product-wrapper">
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-1.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-2.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                              <div className="single-search-product d-flex">
                                  <a href="#"><img src="img/product/product-sm-3.png" alt="" /></a>
                                  <div className="desc">
                                      <a href="#" className="title">Gray Coffee Cup</a>
                                      <div className="price">$170.00</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <section className="subscribe-position">
              <div className="container">
                  <div className="subscribe text-center">
                      <h3 className="subscribe__title">Get Update From Anywhere</h3>
                      <p>Bearing Void gathering light light his eavening unto dont afraid</p>
                      <div id="mc_embed_signup">
                          <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" className="subscribe-form form-inline mt-5 pt-1">
                              <div className="form-group ml-sm-auto">
                                  <input className="form-control mb-1" type="email" name="EMAIL" placeholder="Enter your email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your Email Address '" />
                                      <div className="info" />
                              </div>
                              <button className="button button-subscribe mr-auto mb-1" type="submit">Subscribe Now</button>
                              <div style={{position: 'absolute', left: '-5000px'}}>
                                  <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabindex="-1" value="" type="text" />
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
};


const mapStateToProps = (state) =>({
    items: state.product.items
})
const mapDispatchToProps = (dispatch) => ({
    fetchArtwork : () => dispatch(Actions.fetchArtwork())
})


export default connect(mapStateToProps, mapDispatchToProps)(Artwork)
