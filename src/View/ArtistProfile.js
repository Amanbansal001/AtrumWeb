import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { useLocation } from "react-router";
import { _post, _list } from "../Store/action/crud";
import { getProfile } from "../Utils/token";
import _ from "lodash";

const ArtistProfile = (props) => {

    const location = useLocation();
    const profile = getProfile();
    const [artistId, setartistId] = useState(parseInt(props.match.params.id));
    const [artistById, setartistById] = useState();
    const [faturedArtist, setfaturedArtist] = useState([]);
    const [relatedArtwork, setrelatedArtwork] = useState([]);
    const [featuredArt, setfeaturedArt] = useState([]);
    const [latestArt, setlatestArt] = useState([]);
    const [artistProfile, setartistProfile] = useState([]);
    const [followText, setfollowText] = useState(`Follow`);
    const [prev, setprev] = useState();
    const [next, setnext] = useState();

    const [startra, setstartra] = useState(0);
    const [endra, setendra] = useState(4);


    useEffect(() => {
        fetchAPI();
    }, [])

    useEffect(() => {

        if (location.pathname) {
            setnext(null)
            setprev(null)
            setfollowText(`Follow`)
            setartistId(parseInt(props.match.params.id))
        }

    }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchAPI();
    }, [artistId])

    const fetchAPI = () => {
        fetchArtistById();
        fetchfeaturedArt();
        fetchfeaturedArtist();
        fetchartistProfile();
        fetchrelatedArtwork();
    }

    const fetchArtistById = () => {
        if (isNaN(artistId)) { return }
        props._list(`users/${artistId}?status=1&roleType=Artist`, ``, res => {
            if (!res.data.fetch) {
                window.history.back();
            }
            if (res.data.fetch.follow) {
                setfollowText(`Followed`)
            }
            setartistById(res.data.fetch)
        })
    }

    const fetchfeaturedArt = () => {
        if (isNaN(artistId)) { return }
        props._list(`products/all?active=1&notInuserId=${artistId}`, ``, res => {
            res.data.fetch = res.data.fetch.filter(e => e.active == 1);
            setfeaturedArt(res.data.fetch);
        })
    }

    const fetchfeaturedArtist = () => {
       
        props._list(`products/all?userIdIn=${artistId}`, ``, res => {
            res.data.fetch = res.data.fetch.filter(e => e.active == 1);
            res.data.fetch = _.uniqBy(res.data.fetch, "id");

            setfaturedArtist(res.data.fetch);
            if (isNaN(artistId)) {
                setartistId(res.data.fetch[0].id)
            }
        })
    }

    const fetchrelatedArtwork = () => {
        props._list(`products/all?userIdIn=${artistId}&active=1`, ``, res => {
            res.data.fetch = res.data.fetch.filter(e => e.active == 1);
            res.data.fetch = _.uniqBy(res.data.fetch, 'id');
            //setrelatedArtwork(res.data.fetch);
        })
    }

    const fetchartistProfile = () => {

        props._list(`users?status=1&notInId=${artistId}&roleType=Artist`, ``, res => {
            res.data.fetch = res.data.fetch.filter(e => e.status == 1);
            //setartistProfile(res.data.fetch);
            if (res.data.fetch && res.data.fetch.length > 0) {
                setnext(artistId + 1)
                if (artistId != 1) {
                    setprev(artistId - 1)
                }
            }
        })
    }

    const profileSection = (id) => {
        props.history.push(`/profile/artist/${id}`)
    }

    const productSection = (id) => {
        props.history.push(`/product/${id}`)
    }

    const follow = () => {
        if (!profile) { alert(`Kindly login to continue`); return; }
        props._post(`userFollows`, {
            artistId: artistId,
            userId: (profile) ? profile.id : 0
        }, res => {
            if (followText == "Follow") {
                setfollowText(`Followed`)
            } else {
                setfollowText(`Follow`)
            }
        })
    }

    const viewMorera = (e) => {
        e.preventDefault();
        setendra(endra + 4);
    }

    return (
        <>
            <AtrumLayout {...props}>
                
                <section className="artistprofile-sec">
                    <div className="container">
                        {artistById ?
                            <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="artist-left">
                                            <div className="row">
                                                <div className="col-md-5 col-6">
                                                    <div className="artist-img">
                                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={artistById.profilePic} className="img-fluid" />
                                                    </div>
                                                </div>
                                                <div className="col-md-7 col-6 artistmaininfopadding">
                                                    <div className="artist-info">
                                                        <h3 className="artist-name">{artistById.name}</h3>
                                                        <p className="artist-add">{artistById.nationality}</p>
                                                        <a href="#" className="follow-artist" onClick={follow}>{followText}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="artist-right">
                                            <h3>Bio</h3>
                                            <p>{artistById.bio}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ul className="top-pagination">
                                        {prev ?
                                            <li><Link to={`/profile/artist/${prev}`}><i className="fa fa-arrow-left" /> Previous</Link></li>
                                            : null}
                                        <li><Link to={`/profile/artist/${next}`}>Next <i className="fa fa-arrow-right" /></Link></li>
                                    </ul>
                                </div>
                            </>
                            : null}
                    </div>
                </section>
                {relatedArtwork && relatedArtwork.length > 0 ?
                    <section className="featured-sec with-bg artist-work">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h3 className="main-head">Related Artworks By the Artist</h3>
                                </div>
                            </div>
                            <div className="row mt-5 flex-wrapinher">
                                {relatedArtwork && relatedArtwork.length > 0 ? relatedArtwork.slice(0, 4).map((data, idx) => {

                                    return (
                                        <div className="col-md-3 col-5" key={idx} onClick={() => productSection(data.id)}>
                                            <div className="feature-box hover">
                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.productImage} alt={data.productName} className="img-fluid" />
                                                <p>{data.productName}</p>
                                                
                                            </div>
                                        </div>
                                    )
                                }) : null}

                            </div>
                            {relatedArtwork && relatedArtwork.length > 4 ?
                                <div className="row mt-5">
                                    <div className="col-md-12 text-center">
                                        <a href="#" className="view-all">View More</a>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </section>
                    : null}

                {relatedArtwork && relatedArtwork.length > 0 ?
                    <section className="featured-sec product-page">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h3 className="main-head">Artist's Portfolio</h3>
                                </div>
                            </div>
                            <div className="row mt-5 flex-wrapinher">
                                {relatedArtwork && relatedArtwork.length > 0 ? relatedArtwork.slice(0, 4).map((data, idx) => {

                                    return (
                                        <div className="col-md-3 col-5" key={idx} onClick={() => productSection(data.id)}>
                                            <div className="feature-box hover">
                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.productImage} alt={data.productName} className="img-fluid" />
                                                <p>{data.productName}</p>
                                            </div>
                                        </div>
                                    )
                                }) : null}
                            </div>
                            {relatedArtwork && relatedArtwork.length > 4 ?
                                <div className="row mt-5">
                                    <div className="col-md-12 text-center">
                                        <a href="#" className="view-all">View More</a>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </section>
                    : null}

                

                <section className="featured-sec with-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head">Artist Portfolio</h3>
                            </div>
                        </div>
                        <div className="row mt-3 mt-sm-5 flex-wrapinher">
                            {faturedArtist && faturedArtist.length > 0 ? faturedArtist.map((data, idx) => {

                                return (
                                    <div className="col-md-3 col-5" key={idx} onClick={() => productSection(data.id)}>
                                        <div className="feature-box hover">
                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.productImage} alt={data.productName} className="img-fluid" />
                                            <p>{data.productName}</p>
                                            
                                        </div>
                                    </div>
                                )
                            }) : null}
                        </div>
                        {faturedArtist && faturedArtist.length > 4 ?
                            <div className="row mt-0">
                                
                            </div>
                            : null}
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
)(ArtistProfile);