import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { getProfile, getToken } from "../Utils/token";
import { ddmmyyyy, isMobile, mobileMenu } from "../Utils";
import queryString from 'query-string';


const cartIconPre = {
    border: 'none',
    padding: `0px`,
    marginRight: "14px",
}

const Header = (props) => {

    const profile = getProfile();
    const propsQuery = queryString.parse(props.location.search);
    const location = useLocation();
    const [name, setname] = useState()
    const [search, setsearch] = useState()
    const [country, setcountry] = useState()
    const [state, setstate] = useState()
    const [city, setcity] = useState()
    const [notifications, setNotifications] = useState()
    const [configlogo, setconfiglogo] = useState(`/assets/images/atrum-logo.png`)
    const audio = new Audio('/assets/audio/notification.wav');

    useEffect(() => {

        if (location.pathname) {

            mobileMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (profile) {
                setname(profile.name)
            } else {
                setname(``);
            }

            setTimeout(() => {
                document.querySelectorAll(`nav li a`).forEach(e => {
                    e.classList.remove(`active`);
                })
                const path = document.querySelector(`nav li a[href='${location.pathname}']`)
                if (path) {
                    path.classList.add(`active`);
                }
            }, 700)
        }

    }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

    const logout = () => {
        localStorage.clear();
        props.history.push('/logout');
    }

    const fetchConfigLogo = () => {

        props._list('config', ``, res => {
            localStorage.setItem("config", JSON.stringify(res.data.fetch));
            setconfiglogo(res.data.fetch.find(e => e.col === "SITE_LOGO").val);
            setSiteColor(res.data.fetch.find(e => e.col === "SITE_COLOR").val)
        })
    }

    const setSiteColor = (color) => {
        var r = document.querySelector(':root');
        r.style.setProperty('--main-primary-color', color);
    }

    const fetchCountry = () => {
        let d = localStorage.getItem("country");
        if (d) {
            setcountry(JSON.parse(d));
            return;
        }
        props._list('country', ``, res => {
            localStorage.setItem("country", JSON.stringify(res.data.fetch))
            setcountry(res.data.fetch);
        })
    }

    const fetchState = () => {
        let d = localStorage.getItem("state");
        if (d) {
            setstate(JSON.parse(d));
            return;
        }
        props._list('state', ``, res => {
            localStorage.setItem("state", JSON.stringify(res.data.fetch))
            setstate(res.data.fetch);
        })
    }

    const fetchCity = () => {
        let d = localStorage.getItem("city");
        if (d) {
            setcity(JSON.parse(d));
            return;
        }
        props._list('city', ``, res => {
            localStorage.setItem("city", JSON.stringify(res.data.fetch))
            setcity(res.data.fetch);
        })
    }

    const fetchNotifications = () => {
        if (!profile) {
            return;
        }
        props._list(`notifications`, `?userId=${profile.id}&sortBy=desc`, res => {
            setNotifications(res.data.fetch);
            if (res.data.fetch && res.data.fetch.length > 0) {
                const latestId = res.data.fetch[0].id;
                const prevNotificationId = localStorage.getItem("prevNotificationId") || 0;
                if (prevNotificationId < latestId) {
                    notify();
                    localStorage.setItem("prevNotificationId", latestId);
                }
            }
        })
    }


    const artworkSearch = () => {
        if (!search) { return };
        props.history.push(`/artwork?search=${encodeURI(search)}`);
    }

    const notify = () => {

        document.querySelector(`.notify`).classList.add(`shake`);
        setTimeout(() => {
            document.querySelector(`.notify`).classList.remove(`shake`);
        }, 3000)

        audio.play();
    }

    useEffect(() => {
        mobileMenu();
        fetchConfigLogo();
        fetchCountry();
        fetchState();
        fetchNotifications();
        if (propsQuery.search) {
            setsearch(propsQuery.search);
        } else {
            setsearch('');
        }
    }, [])

    useEffect(() => {
        setsearch(propsQuery.search);
    }, [propsQuery.search])


    if (props.propsQuery && props.propsQuery.header == 0) {
        return <></>
    }

    if (isMobile() && (!location.pathname.includes('/home') && location.pathname != '/')) {
        return <header className={`header ${props.homePage ? '' : 'inner-page innermobpage'}`}>
            <div className="container-fluid back d-block d-sm-none" onClick={() => window.history.back()}>
                <div className="row align-items-center">
                    <div className="col-md-2 col-2 order-1 order-sm-1 pl-10p">
                        <div className="only-mob menu-icon">
                            <img src="/assets/images/back.svg" style={{ width: '25px' }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-8 order-2">
                        <div className="pageinner-head">{props.route.params ? props.route.params.heading : ''}</div>
                    </div>
                </div>
            </div>
        </header>
    }

    return (
        <>
            <header className={`header ${props.homePage ? '' : 'inner-page'}`}>
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-md-2 col-8 order-1 order-sm-1 prmobonlunone mobdisplayflexead">
                            <div className="only-mob menu-icon">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/menubarmob.svg" className="icon" />
                            </div>

                            {!name ?
                                <div className="d-inline-block d-sm-none header-topmob-menu">
                                    <h4>Hey, Guest User!</h4>
                                    <p>What do you want to explore today?</p>
                                </div>
                                :
                                <div className="d-inline-block d-sm-none header-topmob-menu">
                                    <h4>Hey, {name}</h4>
                                    <p>What do you want to explore today?</p>
                                </div>
                            }

                            <Link to="/" className="logo d-sm-block d-none">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={configlogo} className="img-fluid" />
                            </Link>
                            <ul className="mobile-menu only-mob">
                                <li className="back"><h4><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/back.svg" /> Menu</h4></li>
                                <li><Link to="/artwork"> Artworks</Link></li>
                                <li><Link to="/artist/listing"> Artists</Link></li>
                                <li><Link to="/auction/listing"> Auctions</Link></li>

                                <li className="wonderhovernew"><Link to="/wonder-room"> Wonder Room</Link></li>

                            </ul>
                        </div>
                        <div className="col-md-6 order-3 order-sm-2 no-pad">
                            <div className="row">
                                <div className="col-md-12 only-desk">
                                    <nav className="navbar navbar-expand-md navbar-dark">
                                        <ul id="top-menu" className="navbar-nav mr-auto">
                                            <li className="nav-item ">
                                                <Link className="nav-link" to="/artwork">Artworks</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/artist/listing">Artists</Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link className="nav-link" to="/auction/listing">Auctions</Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link className="nav-link" to="/nft"> NFTs</Link>
                                            </li>
                                            <li className="nav-item wonderhovernew">
                                                <Link className="nav-link" to="/wonder-room"> Wonder Room</Link>
                                            </li>

                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-md-11">
                                    <div className="search-bar">
                                        <div className="form-inline" >
                                            <input id="search" className="form-control mr-sm-0 search" type="search" placeholder="Search " aria-label="Search"
                                                value={search}
                                                onChange={e => setsearch(e.target.value)}
                                                onKeyPress={event => {
                                                    if (event.key === 'Enter') {
                                                        artworkSearch()
                                                    }
                                                }}
                                            />
                                            <button className="btn btn-serach my-2 my-sm-0" type="submit" onClick={artworkSearch}><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/search.svg" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-4 order-2 order-sm-2 no-pad">
                            <div className="row justify-content-end">

                                <div className="col-md-8 col-12 plmobonlunone">

                                    {!name ?
                                        <ul className="user-list">

                                            <>
                                                {!isMobile() ?
                                                    <li className="mobcarticonmargin"><Link to="/cart" style={cartIconPre}><img style={{ height: "30px" }} onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/Cart icon_Black.png" /></Link></li>
                                                    :
                                                    <></>}

                                                <li className="d-none mobusericon"><Link to="/login"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/user.png" /></Link></li>
                                                <li className="d-none d-sm-inline-block"><Link to="/signup">signup</Link></li>
                                                <li className="d-none d-sm-inline-block"><Link to="/login">login</Link></li>

                                            </>
                                        </ul>
                                        :
                                        <ul className="afteruser-list">
                                            <li className={`${notifications && notifications.length==0?``:`with-submenu2 submenupositionrelative`}`}>
                                                <a href="#">
                                                    <img className="notify" onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/bell.png" />

                                                </a>
                                                <ul>
                                                    {notifications && notifications.length > 0 ? notifications.map((data, idx) => {
                                                        return (
                                                            <li>

                                                                <div className="row">
                                                                    <div className="col-8">
                                                                        <b>{data.title}</b>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        {ddmmyyyy(data.createdAt)}
                                                                    </div>
                                                                </div>
                                                                <div>{data.message} {data.orderId ? `#ORD${String(data.orderId).padStart(6, '0')}` : null}</div>
                                                                <hr />
                                                            </li>
                                                        )
                                                    }) : null}

                                                </ul>
                                            </li>

                                            <li><Link to="/enquiry"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/email.png" /></Link></li>
                                            {!isMobile() ?
                                                <>
                                                    <li><Link to="/cart"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/Cart icon_Black.png" /></Link></li>

                                                    <li className="with-submenu submenupositionrelative">
                                                        <a href="#"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/user.png" /></a>
                                                        <ul>
                                                            <li className="text-capitalize"><Link to="/profile"><i className="fa fa-user"></i> {name}</Link></li>
                                                            <li><Link to="/wishlist"><i className="fa fa-bookmark"></i> My Saves & Follows</Link></li>
                                                            <li><Link to="/order/history"><i className="fa fa-shopping-bag"></i> My Orders History</Link></li>
                                                            <li><Link to="/saved/address"><i className="fa fa-file-text"></i> My Addresses</Link></li>
                                                            <li><Link to="/bid/history"><i className="fa fa-gavel"></i> My Bids</Link></li>
                                                            <li><a href="#" onClick={logout}><i className="fa fa-logout"></i> Logout</a></li>
                                                        </ul>
                                                    </li>
                                                </>
                                                : null}
                                        </ul>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>

        </>
    )

}

export default Header