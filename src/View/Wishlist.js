import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

const Wishlist = (props) => {

    const [products, setproducts] = useState([]);
    const [artistProfile, setartistProfile] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchartistProfile();
    }, [])

    const fetchProducts = () => {
        props._list('products/all', `?active=1&isStock=1`, res => {
            res.data.fetch = res.data.fetch.map(e => ({ ...e, like: (e.wishlist) ? true : false }))
            res.data.fetch = res.data.fetch.filter(e => e.like === true);
            res.data.fetch = _.uniqBy(res.data.fetch, 'id');
            setproducts(res.data.fetch);
        })
    }

    const fetchartistProfile = () => {

        props._list(`users?status=1&roleType=Artist`, ``, res => {

            res.data.fetch = res.data.fetch.filter(e => e.follow != null);
            setartistProfile(res.data.fetch);
        })
    }

    const profileSection = (id) => {
        props.history.push(`/profile/artist/${id}`)
    }

    const productSection = (id) => {
        props.history.push(`/product/${id}`)
    }

    const addToCart = (data) => {

        let product = localStorage.getItem("cart");
        if (product) {
            product = JSON.parse(product);
            let prod = data;
            prod = { ...prod, isAuction: false };
            product.push(prod);
            localStorage.setItem("cart", JSON.stringify(product));
        } else {
            product = [];
            let prod = data;;
            prod = { ...prod, isAuction: true };
            product.push(prod);
            localStorage.setItem("cart", JSON.stringify(product));
        }
        props.history.push('/cart');
    }

    return (
        <>
            <AtrumLayout {...props}>
                <section className="checkout-headsec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head d-none d-sm-block">My Account</h3>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="checkout-sec">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 d-none d-sm-block">
                                <div className="filter">
                                    <div className="filter-box">
                                        <ul className="filter-list">
                                            <li><Link to="/dashboard">Dashboard</Link></li>
                                            <li><Link to="/profile">My Profile</Link></li>

                                            <li><Link to="/saved/address">My Address</Link></li>

                                            <li className={`active`}><Link to="/wishlist">My Wishlist</Link></li>
                                            <li><Link to="/order/history">My Order History</Link></li>
                                            <li><Link to="/bid/history">My Bid History</Link></li>
                                            <li><Link to="/logout"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/logout.png" style={{ marginRight: "10px" }} /> Sign out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="checkout-box with-order">
                                    <div className=" ">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3 className="main-head d-none d-sm-block">My Wishlist</h3>
                                                <p className="artsavedmobtxt">Artworks saved</p>


                                                <div className="row mt-3 mt-sm-5">
                                                    {products && products.length > 0 ? products.map((data, idx) => {
                                                        return (
                                                            <Link to={`/product/${data.id}`} >
                                                                <div key={idx} className="col-md-4 col-6">
                                                                    <div className="feature-box">
                                                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.productImage} className="img-fluid" />
                                                                        <p>{data.productName} <span>{data.publishYear}</span></p>

                                                                        <h5 className="cost mobcostnew">US$ {data.price}</h5>
                                                                        <div className="col-md-12 mb-4">

                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    }) : <div className={`text-center col-md-12 productnofoundmobile`}><h1>No product found</h1></div>}

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <h3 className="main-head">Artists Followed</h3>
                                            <div className=" ">

                                                <div className="row mt-3 mt-sm-5">
                                                    {artistProfile && artistProfile.length > 0 ? artistProfile.map((data, idx) => {
                                                        return (

                                                            <div className="col-md-4 col-8 hover mb-3" key={idx}>
                                                                <div className="feature-box">
                                                                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.profilePic} alt={data.name} className="img-fluid" />
                                                                    <p>{data.name} <span>{data.nationality}</span></p>
                                                                </div>

                                                                <div className="col-md-12 text-center">
                                                                    <Link to={`/profile/artist/${data.id}`} className="view-all">View Profile</Link>
                                                                </div>
                                                            </div>
                                                        )
                                                    }) : null}

                                                </div>

                                            </div>
                                        </div>
                                    </div>

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
)(Wishlist);