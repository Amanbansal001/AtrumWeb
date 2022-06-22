import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { mmddyyyy } from "../Utils";
import { getProfile } from "../Utils/token";

const BidsHistory = (props) => {

    const [bidHistory, setbidHistory] = useState();

    useEffect(() => {
        fetchbidHistory();
    }, [])

    const fetchbidHistory = () => {
        props._list(`productBids?userId=${getProfile().id}`, ``, res => {
            setbidHistory(res.data.fetch);
        }, err => {

        })
    }

    return (
        <>
            <AtrumLayout {...props}>
                <section className="checkout-headsec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head d-none d-sm-block">My Bidding</h3>
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
                                            
                                            <li><Link to="/wishlist">My Wishlist</Link></li>
                                            <li><Link to="/order/history">My Order History</Link></li>
                                            <li className="active"><Link to="/bid/history">My Bid History</Link></li>
                                            <li><Link to="/logout"><img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/logout.png" style={{ marginRight: "10px" }} /> Sign out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="checkout-box with-order">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="main-head">My Bid History</h3>
                                            <div className="summery-box">
                                                <table>
                                                    <tbody>
                                                        {bidHistory && bidHistory.length > 0 ? bidHistory.map((data, idx) => {
                                                            return (
                                                                <>
                                                                    <tr key={idx}>
                                                                        <td>{idx + 1}.</td>
                                                                        <td><h5>{data.arts.productName}, {data.arts.publishYear} <span>by {data.name}</span></h5></td>
                                                                        <td>Ordered on {mmddyyyy(data.createdAt)}</td>
                                                                        <td><h3>$ {data.arts.price}</h3></td>
                                                                        <td><strong>{data.bidStatus || 'Pending'}</strong></td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        }) : null}


                                                    </tbody>
                                                </table>
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
)(BidsHistory);