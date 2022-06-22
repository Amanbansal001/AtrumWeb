import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isMobile, mobileMenu } from "../Utils";
import { getProfile, logout } from "../Utils/token";

const Footer = (props) => {

    const profile = getProfile();
    const [name, setname] = useState()
    const location = useLocation();
    const [categorys, setcategorys] = useState([]);

    useEffect(() => {
        fetchCategory();
        if (profile) {
            setname(profile.name)
        } else {
            setname(``);
        }
    }, [])

    useEffect(() => {

        if (location.pathname) {
            if (profile) {
                setname(profile.name)
            } else {
                setname(``);
            }
        }

    }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps


    const fetchCategory = () => {
        props._list('categorys?v=3', ``, res => {
            setcategorys(res.data.fetch);
        })
    }

    if(props.propsQuery && props.propsQuery.footer==0){
        return <></>
    }

    if (isMobile() && (!location.pathname.includes('/home') && location.pathname != '/')) {
        return <footer className="bg-white">


            <div class="foot-menu">
                <ul>
                    <li><Link to="/"><img src="/assets/images/homeblack.png" /></Link></li>
                    <li><Link to="/cart"><img src="/assets/images/Cart icon_Black.png" /></Link></li>
                    {!name ?
                        <li><Link to="/login"><img src="/assets/images/user.png" /></Link></li>
                        :
                        <li><Link to="/dashboard"><img src="/assets/images/user.png" /></Link></li>
                    }
                </ul>
            </div>
        </footer>
    }

    return (
        <>
            <footer>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-12 row pr-0 align-items-center">
                            <div className="foot-logo col-md-12 col-6">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/atrum-white-logo.svg" className="img-fluid" />
                            </div>
                            <div className="foot-logo text-center col-6">
                                <a href="/assets/vat/VAT certificate.pdf" target={`_blank`}><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={`/assets/images/vat.png`} style={{ width: "105px" }} className="img-fluid" /></a>
                            </div>
                        </div>
                        <div className="col-md-2 col-6 order-3 order-sm-1">
                            <div className="foot-box">
                                {!isMobile() ?
                                    <h3 className="foot-head">Know More</h3>
                                    : <></>}

                                <ul className="d-sm-block d-none">
                                    <li><Link to="/aboutus">About Us</Link></li>
                                    <li><Link to="/contact">Contact Us</Link></li>
                                </ul>

                            </div>
                        </div>

                        {!isMobile() ?
                            <>
                                <div className="col-md-2 col-6 order-1 order-sm-2">
                                    <div className="foot-box">
                                        <h3 className="foot-head">Categories</h3>
                                        <ul>
                                            {categorys && categorys.length > 0 ? categorys.map((data, idx) => {
                                                return (
                                                    <li key={idx}><Link to={`/product/listing?category=${data.id}`}>{data.categoryName}</Link></li>
                                                )
                                            }) : null}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-2 col-6 order-4 order-sm-3">
                                    <div className="foot-box">
                                        <h3 className="foot-head">Auction</h3>
                                        <ul>
                                            <li><Link to="/auction/listing?section=current">Current</Link></li>
                                            <li><Link to="/auction/listing?section=upcoming">Upcoming</Link></li>
                                            
                                            <li><Link to="/auction/listing?section=past">Past</Link></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-md-2 col-6 order-5 order-sm-5">
                                    <div className="foot-box">
                                        <h3 className="foot-head">Get Atrum App</h3>
                                        <ul>
                                            <li><a href="https://www.apple.com/in/app-store/" target="_blank">iOS App</a></li>
                                            <li><a href="https://play.google.com/" target="_blank">Android App</a></li>
                                           
                                        </ul>
                                    </div>
                                </div>

                            </>
                            : null}
                    </div>
                    <div className="row mt-1 mt-sm-5">
                        <div className="col-md-12 text-center">
                            <ul className="foot-list">

                                <li className="d-inline-block d-sm-none"><Link to="/aboutus">About Us</Link></li>
                                <li className="d-inline-block d-sm-none"><Link to="/contact">Contact Us</Link></li>
                                
                                <li><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></li>
                                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                
                                <li><Link to="/shipping-policy">Shipping</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-3 mt-sm-3 pb-3">
                        <div className="col-md-10 text-center">
                            <p className="copyright">© Copyright Reserved. Atrum 2021</p>
                        </div>
                        <div className="col-md-2 text-right">
                            <ul className="social-list">
                                <li><a href="https://m.facebook.com/profile.php?id=100074522262832" target="_blank"><i className="fa fa-facebook" /></a></li>
                                
                                <li><a href="https://twitter.com/atrum_sa?s=11" target="_blank"><i className="fa fa-twitter" /></a></li>
                                <li><a href="https://www.instagram.com/atrum.sa/" target="_blank"><i className="fa fa-instagram" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="foot-menu">
                    <ul>
                        <li><Link to="/"><img src="/assets/images/homeblack.png" /></Link></li>
                        <li><Link to="/cart"><img src="/assets/images/Cart icon_Black.png" /></Link></li>
                        {!name ?
                            <li><Link to="/login"><img src="/assets/images/user.png" /></Link></li>
                            :
                            <li><Link to="/dashboard"><img src="/assets/images/user.png" /></Link></li>
                        }

                    </ul>
                </div>
            </footer>

        </>
    )

}

export default Footer