import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import queryString from 'query-string';
import { getProfile } from "../Utils/token";
import { auctionDate } from "../Utils";

const AuctionListing = (props) => {

    const profile = getProfile();

    const [auctionc, setauctionc] = useState([]);
    const [auctionu, setauctionu] = useState([]);
    const [auctionp, setauctionp] = useState([]);

    const [startc, setstartc] = useState(0);
    const [endc, setendc] = useState(4);

    const [startu, setstartu] = useState(0);
    const [endu, setendu] = useState(4);

    const [startp, setstartp] = useState(0);
    const [endp, setendp] = useState(4);
    const [config, setconfig] = useState({
        banner: `/assets/images/auction-bg.png`,
        currentH: `Rago: Post War & Contemporary Art`,
        pastH: `Benefit Auction 2021`,
        upcomingH: `LA Auction 2021`
    })

    const propsQuery = queryString.parse(props.location.search);

    useEffect(() => {
        fetchConfig();
        current();
    }, [])

    useEffect(() => {
        current();
    }, [propsQuery.section])


    const fetchConfig = () => {

        let res = JSON.parse(localStorage.getItem("config"));

        if (!res) {
            props._list('config', ``, resconf => {
                let res = resconf.data.fetch;

                setConfigVal(res);
            })
        } else {
            setConfigVal(res);

        }
    }

    const setConfigVal = (res) => {
        let banner = res.find(e => e.col === "AUCTION_BANNER").val;
        let currentH = res.find(e => e.col === "CURRENT_AUCTION_HEAD").val;
        let pastH = res.find(e => e.col === "PAST_AUCTION_HEAD").val;
        let upcomingH = res.find(e => e.col === "UPCOMING_AUCTION_HEAD").val;

        setconfig({ banner: banner, currentH: currentH, pastH: pastH, upcomingH: upcomingH });
    }

    const auctionLanding = (auctionId,id) => {
        props.history.push(`/auction/${auctionId}/${id}`);
    }

    const current = () => {
        props._list('auction?sortBy=desc', ``, res => {
            res.data.fetch.current = res.data.fetch.current.map(e => ({ ...e, like: (e.wishlist) ? true : false }))
            res.data.fetch.upcoming = res.data.fetch.upcoming.map(e => ({ ...e, like: (e.wishlist) ? true : false }))
            res.data.fetch.past = res.data.fetch.past.map(e => ({ ...e, like: (e.wishlist) ? true : false }))
            setauctionc(res.data.fetch.current);
            setauctionu(res.data.fetch.upcoming);
            setauctionp(res.data.fetch.past);

            setTimeout(() => {
                let scroll = document.getElementById(propsQuery.section);
                if (scroll) {
                    scroll.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        })
    }

    const viewMorep = (e) => {
        e.preventDefault();
        setendp(endp + 4);
    }

    const viewMorec = (e) => {
        e.preventDefault();
        setendc(endc + 4);
    }

    const viewMoreu = (e) => {
        e.preventDefault();
        setendu(endu + 4);
    }


    const like = (e, data) => {
        e.preventDefault();

        const profile = getProfile();
        if (!profile) { alert(`Kindly login to continue`); return; }
        props._post(`wishlists`, {
            productId: data.id,
            userId: (profile) ? profile.id : 0
        }, res => {
            let temp = auctionc;
            temp.forEach((e,idx1) => {
                e.auction.forEach((f,idx)=>{
                  
                    if(f.id==data.id){
                        if (temp[idx1].auction[idx].like) {
                            temp[idx1].auction[idx].like = false;
                        } else {
                            temp[idx1].auction[idx].like = true;
                        }
                    }
                })
            });

            setauctionc([...temp]);
        }, err => {

        })


    }

    return (
        <>
            <AtrumLayout {...props}>
                 
                <section className="hide">
                   
                    <div className="listing-img">
                        <img src={config.banner} className="img-fluid hover d-none d-sm-block" />
                        
                    </div>
                    <div className="over-icon hide">
                        <ul>
                            <li><a href="#" /></li>
                            <li><a href="#" /></li>
                            <li><a href="#" /></li>
                        </ul>
                    </div>
                </section>
                <section className="mid-text mobnewauctionmargin">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-center wondermobtxt">
                            <p>Bid on the works you love. We feature premium artworks including modern, contemporary, and street art, so you can find works
                                by your favorite artists—and discover new ones—all in one place.</p>
                        </div>
                    </div>
                </section>
                <section className="current-sec" id="current" name="current">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head mb-4">Current Auctions</h3>
                            </div>
                        </div>
                    </div>
                    <div className="inner-bg auctionlist">
                        <div className="container">
                            
                            {auctionc && auctionc.length > 0 ? auctionc.map((data, idx1) => {
                                return (
                                    <>
                                   
                                    <div className="row mt-3" key={idx1}>
                                        <div className="col-md-12 text-left">
                                            <h3>
                                                {data.name}
                                                <span>Live {auctionDate(data.startDate)}</span>
                                            </h3>
                                        </div>

                                       

                                        {data.auction && data.auction.length > 0 ? data.auction.map((auction, idx) => {
                                            return (

                                                <div className="col-md-3 col-6" key={idx}>
                                                    <div className="current-box">
                                                        <div className="current-img">
                                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={auction.product.productImage} className="img-fluid hover" onClick={() => auctionLanding(auction.id,auction.product.id)} />
                                                            <div className="like-box">
                                                                <a href="#" onClick={(e) => { like(e, auction) }}>

                                                                    {!auction.like ?
                                                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/heart-transparent.png" className="unlike" />
                                                                        :
                                                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/heart-black.png" className="like" />
                                                                    }
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <p className="current-title">{auction.product.productName} <span>{auction.product.publishYear}</span></p>
                                                        <div className="pricebids">
                                                            <ul>
                                                                <li><p><span className="price">$ {auction.price}</span></p>({auction.bids && auction.bids.length > 0 ? auction.bids.length : 0} Bids)</li>
                                                                
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : null}

                                    </div>
                                    </>
                                )
                            }) : null}



                            {endc < auctionc.length ?
                                <div className="row mt-5">
                                    <div className="col-md-12 text-center">
                                        <a href="#" className="view-all" onClick={viewMorec}>View More</a>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                </section>
                <section className="current-sec" id="upcoming" name="upcoming">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head mb-4">Upcoming Auctions</h3>
                            </div>
                        </div>
                    </div>
                    <div className="inner-bg auctionlist">
                        <div className="container">
                            
                           
                                {auctionu && auctionu.length > 0 ? auctionu.map((auction, idx1) => {
                                    return (
                                        <>
                                        
                                        <div className="row mt-3" key={idx1}>
                                            <div className="col-md-12 text-left">
                                                <h3>
                                                    {auction.name}
                                                </h3>
                                                <span>Live {auctionDate(auction.startDate)}</span>
                                            </div>
                                           
                                            {auction.auction && auction.auction.length > 0 ? auction.auction.map((data, idx) => {
                                                return (

                                                    <div className="col-md-3 col-6" key={idx}>
                                                        <div className="current-box">
                                                            <div className="current-img" >
                                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.product.productImage} className="img-fluid hover" />
                                                                <div className="like-box">
                                                                    <a href="#" onClick={(e) => { like(e, data) }}>

                                                                        {!data.like ?
                                                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/heart-transparent.png" className="unlike" />
                                                                            :
                                                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/heart-black.png" className="like" />
                                                                        }
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <p className="current-title">{data.product.productName} <span>{data.product.publishYear}</span></p>
                                                            <div className="pricebids">
                                                                <ul>
                                                                    <li><span className="price">$ {data.price}</span></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : null}

                                        </div>
                                        </>
                                    )
                                }) : null}


                                {endu < auctionu.length ?
                                    <div className="row mt-5">
                                        <div className="col-md-12 text-center">
                                            <a href="#" className="view-all" onClick={viewMoreu}>View More</a>
                                        </div>
                                    </div>
                                    : null}
                            </div>
                        </div>
                   
                </section>
                <section className="current-sec" id="past" name="past">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head mb-4">Past Auctions</h3>
                            </div>
                        </div>
                    </div>
                    <div className="inner-bg">
                        <div className="container">
                           
                           
                                {auctionp && auctionp.length > 0 ? auctionp.map((auction, idx1) => {
                                    return (

                                        <>
                                         
                                        <div className="row mt-3" key={idx1}>
                                            <div className="col-md-12 col-12 text-left">
                                                <h3>
                                                    {auction.name}
                                                </h3>
                                                <span>Ends {auctionDate(auction.expiryDate)}</span>
                                            </div> 
                                           

                                            {auction.auction && auction.auction.length > 0 ? auction.auction.map((data, idx) => {
                                                return (

                                                    <div className="col-md-3 col-6" key={idx}>
                                                        <div className="current-box">
                                                            <div className="current-img">
                                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.product.productImage} className="img-fluid hover" />
                                                                
                                                            </div>
                                                            <p className="current-title">{data.product.productName} <span>{data.product.publishYear}</span></p>

                                                            <div className="pricebids">
                                                                <ul>
                                                                    <li><span className="closee">Closed</span></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : null}

                                        </div>
                                        </>
                                    )
                                }) : null}

                            
                            {endp < auctionp.length ?
                                <div className="row mt-5">
                                    <div className="col-md-12 text-center">
                                        <a href="#" className="view-all" onClick={viewMorep}>View More</a>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                </section>

            </AtrumLayout>
        </>
    );
}

function mapStateToProps(state, props) {
    return {
        showLogin: true,
        state: state
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        _post,
        _list,
    }, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuctionListing);