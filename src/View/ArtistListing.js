import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { getProfile } from "../Utils/token";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import _ from "lodash";

const ArtistListing = (props) => {

    const profile = getProfile();
    const [latestArt, setlatestArt] = useState([]);
    const [products, setproducts] = useState([]);
    const [faturedArtist, setfaturedArtist] = useState([]);

    const [start, setstart] = useState(0);
    const [end, setend] = useState(4);

    useEffect(() => {
        fetchAPI();
    }, [])

    const viewMore = (e) => {
        e.preventDefault();
        setend(end + 4);
    }


    const fetchAPI = () => {
        fetchlatestArt();
        fetchProducts();
        fetchfeaturedArtist();
    }

    const fetchlatestArt = () => {
        props._list('products/all?sortBy=desc&active=1&isStock=1', ``, res => {
            setlatestArt(res.data.fetch);
        })
    }

    const fetchProducts = () => {
        props._list('products/all', `?active=1&isStock=1`, res => {
            setproducts(res.data.fetch);
        })
    }


    const fetchfeaturedArtist = () => {
        props._list('users', `?roleType=Artist&status=1&isWonderRoom=0`, res => {
            res.data.fetch = res.data.fetch.map(e => ({ ...e, followText: (e.follow)?"Followed":"Follow" }))
            res.data.fetch = _.orderBy(res.data.fetch, [user => user.name.toLowerCase()], ['asc']);
            setfaturedArtist(res.data.fetch);
        })
    }


    const follow = (artistId, e, idx) => {
        e.preventDefault();
        if (!profile) { alert(`Kindly login to continue`); return; }
        props._post(`userFollows`, {
            artistId: artistId,
            userId: (profile) ? profile.id : 0
        }, res => {
            const temp = faturedArtist;
            const findIndex = temp.findIndex(e => e.id === artistId);
            if (temp[findIndex].followText == "Follow") {
                temp[findIndex].followText = "Followed";
            } else {
                temp[findIndex].followText = "Follow";
            }
            setfaturedArtist([...temp])
        })
    }


    return (
        <>
            <AtrumLayout {...props}>
                <section className="artist-listing-page">
                    
                    <section className="featured-artist-sec">
                        <div className="container">
                            <div className="row d-none d-sm-block">
                                <div className="col-md-12 text-center">
                                    <h3 className="main-head">Artist Listing</h3>
                                </div>
                            </div>
                            <div className="row mt-1 mt-sm-5"> 

                                    {faturedArtist && faturedArtist.length > 0 ? faturedArtist.map((data, idx) => {

                                        return ( 
                                            <div className="col-md-6 col-12" key={idx}>
                                                <div className="profile-artist">
                                                    <div className="profile-img" onClick={() => { props.history.push(`/profile/artist/${data.id}`) }}>
                                                        <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src={data.profilePic} className="img-fluid" />
                                                    </div>
                                                    <div className="profile-text">
                                                        <h4>{data.name} <span>{data.nationality}</span></h4>
                                                        <a href="#" className="btn-profile" onClick={(e) => follow(data.id, e, idx)}>{data.followText}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : null}

                            </div>
                            
                        </div>
                    </section>

                    <section className="featured-sec with-artist-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h3 className="main-head">More like In-Demand Artists</h3>
                                </div>
                            </div>
                            <div className="row mt-4 flex-wrapinher ">
                                {faturedArtist && faturedArtist.length > 0 ? faturedArtist.slice(0, 4).map((data, idx) => {
                                    return (

                                        <div className="col-md-3 col-5 hover" key={idx} onClick={() => { props.history.push(`/profile/artist/${data.id}`) }}>
                                            <div className="feature-box">
                                                <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src={data.profilePic} alt={data.name} className="img-fluid" />
                                                <p>{data.name} <span>{data.nationality}</span></p>
                                            </div>
                                        </div>


                                    )
                                }) : null}

                            </div>
                            
                        </div>
                    </section>

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
)(ArtistListing);