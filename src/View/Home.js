import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { isMobile } from "../Utils";
import { getProfile } from "../Utils/token";
import { BASE_URL } from "../Utils/url";

const Home = (props) => {

    const [category, setcategory] = useState([]);
    const [faturedArtist, setfaturedArtist] = useState([]);
    const [featuredArt, setfeaturedArt] = useState([]);
    const [latestArt, setlatestArt] = useState([]);
    const [artistProfile, setartistProfile] = useState([]);
    const [banners, setbanners] = useState();
    const [start, setstart] = useState(0);
    const [end, setend] = useState(3);


    useEffect(() => {
        fetchBanner();
        fetchCategory();
        fetchfeaturedArtist();
        fetchfeaturedArt();
        fetchlatestArt();
        fetchartistProfile();
        window.window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    const viewMore = (e) => {
        e.preventDefault();

        setend(end + 3);
    }

    const fetchBanner = () => {
        props._list('banner', ``, res => {

            if (isMobile()) {
                res.data.fetch = res.data.fetch.filter(e => e.type == "MOBILE");
            } else {
                res.data.fetch = res.data.fetch.filter(e => e.type == "WEB");
            }

            setbanners(res.data.fetch);

            setTimeout(() => {
                window.touchStart();
            }, 1000)
        })
    }

    const fetchCategory = () => {
        props._list('categorys', ``, res => {
            setcategory(res.data.fetch);
        })
    }

    const fetchfeaturedArtist = () => {
        props._list('trendingArtists', ``, res => {
            res.data.fetch = res.data.fetch.map(e => ({ ...e, like: false }))
            res.data.fetch = _.uniqBy(res.data.fetch, 'userId');
            setfaturedArtist(res.data.fetch);
        })
    }

    const fetchfeaturedArt = () => {
        props._list('trendingArtworks', ``, res => {
            res.data.fetch = _.uniqBy(res.data.fetch, 'productId');
            setfeaturedArt(res.data.fetch);
        })
    }

    const fetchlatestArt = () => {
        props._list('products/all?sortBy=desc&active=1&isStock=1', ``, res => {
            res.data.fetch = res.data.fetch.map(e => ({ ...e, like: (e.wishlist) ? true : false }))
            setlatestArt(res.data.fetch);
        })
    }

    const fetchartistProfile = () => {
        props._list('users', `?&status=1&isWonderRoom=0&roleType=Artist`, res => {
            setartistProfile(res.data.fetch);
        })
    }

    const profileSection = (id) => {
        props.history.push(`/profile/artist/${id}`)
    }

    const productSection = (id) => {
        props.history.push(`product/${id}`)
    }

    const like = (e, data) => {
        e.preventDefault();

        const profile = getProfile();
        if (!profile) { alert(`Kindly login to continue`); return; }
        props._post(`wishlists`, {
            productId: data.id,
            userId: (profile) ? profile.id : 0
        }, res => {
            const temp = latestArt;
            const findIdx = temp.findIndex(e => e.id === data.id);
            if (findIdx > -1) {
                if (temp[findIdx].like) {
                    temp[findIdx].like = false;
                } else {
                    temp[findIdx].like = true;
                }

                setlatestArt([...temp]);
            }
        }, err => {

        })


    }

    const nftPage = (e) => {
        e.preventDefault();

        props.history.push('/nft');

    }


    return (
        <>
            <AtrumLayout {...props} homePage={true} >
                <section className="banner-sec">
                    <div id="demo" className="carousel slide" data-ride="carousel">

                        <ul className="carousel-indicators">
                            {banners && banners.length > 0 ? banners.map((data, idx) => {
                                return (
                                    <li key={idx} data-target="#demo" data-slide-to={idx} className={(idx == 0) ? 'active' : ''} />
                                )
                            }) : null}

                        </ul>

                        <div className="carousel-inner">
                            {banners && banners.length > 0 ? banners.map((data, idx) => {
                                return (
                                    <div key={idx} className={`carousel-item ${(idx == 0) ? 'active' : ''}`}>
                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={BASE_URL.API + data.url} alt="" className="img-fluid" style={{ textAlign: 'center' }} />
                                        <div className="carousel-caption mobcaptionnewinside">
                                            <h3>{data.heading}</h3>
                                            <p>{data.text}</p>
                                            <Link className="banner-btn" to={`/product/listing`}>Explore</Link>
                                        </div>
                                    </div>
                                )
                            }) : null}

                        </div>
                    </div>
                </section>
                <section className="category-sec border-line">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head">Browse by Category</h3>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <ul className="category-list">
                                    {category && category.length > 0 ? category.map((data, idx) => {
                                        return (
                                            <li key={idx}><Link to={`/product/listing?category=${data.id}`}>{data.categoryName}</Link></li>
                                        )
                                    }) : null}
                                </ul>
                            </div>
                        </div>

                        <div className="row mt-2 mt-sm-3">
                            <div className="col-md-12 text-center mt-2">
                                <Link to="/artwork" className="view-all">View All</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {isMobile() ?
                    <section className="bg-sec" style={{ backgroundImage: `url('/assets/images/wonder-room-mob.png')` }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="bg-text ptmobnewbanner">

                                        <Link className="bg-btn" to={`/wonder-room`}>Browse Works</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    : null}

                <section className="featured-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head">Featured Artists</h3>
                            </div>
                        </div>
                        <div className="row mt-5 flex-wrapinher">
                            {faturedArtist && faturedArtist.length > 0 ? faturedArtist.slice(0, 4).map((data, idx) => {

                                return (
                                    <div className="col-md-3 col-5" key={idx} onClick={() => profileSection(data.user.id)}>
                                        <div className="feature-box hover">
                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.user.profilePic} alt={data.user.profilePic} className="img-fluid" />
                                            <p>{data.user.name} <span>{data.user.nationality}</span></p>
                                        </div>
                                    </div>
                                )
                            }) : null}

                        </div>
                        <div className="row mt-2 mt-sm-3 mb-sm-3">
                            <div className="col-md-12 text-center">
                                <Link to="/artist/listing" className="view-all">View All</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {isMobile() ?
                    <></>

                    : null}



                <section className="artwork-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head">Featured Artworks</h3>
                            </div>
                        </div>
                        <div className="row mt-3 mt-sm-5 flex-wrapinher">
                            {featuredArt && featuredArt.length > 0 ? featuredArt.slice(start, end).map((data, idx) => {

                                return (
                                    <div key={idx} className="col-md-4 col-5" onClick={() => productSection(data.productId)}>
                                        <div className="artwork-box">
                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.arts.productImage} alt={data.arts.productName} className="img-fluid" />
                                            <p>{data.arts.productName}</p>
                                        </div>
                                    </div>
                                )

                            }) : null}


                        </div>
                        
                        <div className="row mt-2 mt-sm-3">
                            <div className="col-md-12 text-center">
                                <Link to="/artwork" className="view-all" >View All</Link>
                            </div>
                        </div>
                        
                    </div>
                </section>
                

                <section className="bg-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="bg-text">
                                    <h3>Atrum Auctions <span>Bid on Art by Emerging <br />&amp; Established Artists</span></h3>
                                    <Link className="bg-btn" to={`/auction/listing`}>Browse Works</Link>
                                </div>
                            </div>
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
)(Home);