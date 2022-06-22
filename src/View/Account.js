import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list,_put } from "../Store/action/crud";
import { getProfile, logout } from "../Utils/token";

const Aboutus = (props) => {

    const profile = getProfile()

    const deleteAccount=(e)=>{
        e.preventDefault();
        if (window.confirm("This will delete your account ?")) {
            props._put(`users/${profile.id}`,{
                id:profile.id,
                status:0
            },res=>{
                logout(props);
            })
        }
        
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
                                            <li className="active"><Link to="/dashboard">Dashboard</Link></li>
                                            <li><Link to="/profile">My Profile</Link></li>
                                            
                                            <li><Link to="/saved/address">My Address</Link></li>
                                           
                                            <li><Link to="/wishlist">My Wishlist</Link></li>
                                            <li><Link to="/order/history">My Order History</Link></li>
                                            <li><Link to="/bid/history">My Bid History</Link></li>
                                            <li><Link to="/logout"><img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/logout.png"  style={{marginRight:"10px"}} /> Sign out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="checkout-box with-order">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h3 className="main-head mobprodileiconnew"><img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/user.png" /> Welcome, {props.profile.name}</h3>
                                        </div>
                                        <div className="col-md-4 d-none d-sm-block">
                                            <a className="view-all follow" onClick={deleteAccount}>Delete Account</a>
                                        </div>
                                    </div>
                                    <div className="row mt-3 my-sm-5">
                                        <div className="col-md-4 col-6">
                                            <Link to="/profile">
                                                <div className="acc-box">
                                                    <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/accout-user.png" />
                                                    <h4>My Profile</h4>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-6">
                                            <Link to="/order/history">
                                                <div className="acc-box">
                                                    <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/shopping-bag.png" />
                                                    <h4>My Orders</h4>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-6">
                                            <Link to="/saved/address">
                                                <div className="acc-box">
                                                    <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/address.png" />
                                                    <h4>My Address</h4>
                                                </div>
                                            </Link>
                                        </div>
                                        
                                        <div className="col-md-4 col-6">
                                            <Link to="/wishlist">
                                                <div className="acc-box">
                                                    <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/wishlist.png" />
                                                    <h4>My Wishlist</h4>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-6">
                                            <Link to="/bid/history">
                                                <div className="acc-box">
                                                    <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/bid.png" />
                                                    <h4>My Bids</h4>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-6 d-block d-sm-none">
                                            <a  onClick={deleteAccount}>
                                                <div className="acc-box">
                                                    <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/credit-card.png" />
                                                    <h4>Delete Account</h4>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-md-4 col-6 d-block d-sm-none" >
                                            <Link to="/logout">
                                                <div className="acc-box">
                                                    <img src="/assets/images/logout.png" style={{width: '28px', height: '28px'}} />
                                                    <h4>Sign out</h4>
                                                </div>
                                            </Link>
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
        state: state,
        profile:getProfile()
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        _post,
        _list,
        _put
    }, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Aboutus);