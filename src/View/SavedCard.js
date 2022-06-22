import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list, _put } from "../Store/action/crud";
import { getProfile } from "../Utils/token";

const SavedCard = (props) => {

    const [card, setcard] = useState([]);
    const [name, setname] = useState();
    const [cardType, setcardType] = useState(`Visa`);
    const [cardNumber, setcardNumber] = useState();
    const [expiryDate, setexpiryDate] = useState();
    const [pkId, setpkId] = useState();
    const [cvv, setcvv] = useState();

    const [backendErr, setbackendErr] = useState(``);

    useEffect(() => {
        fetchCard();
    }, [])

    const fetchCard = () => {
        props._list(`orderPaymentMethods?userId=${getProfile().id}`, ``, res => {
            setcard(res.data.fetch);
        })
    }

    const saveCard = () => {
        if (pkId) {
            updateCard();
        } else {
            newCard();
        }
    }

    const newCard = () => {
        setbackendErr(``);
        if (!name || !cardNumber || !cardType || !expiryDate || !cvv) {
            setbackendErr(`Please complete form to continue`);
            return;
        }

        props._post('orderPaymentMethods', {
            userId: (getProfile()) ? getProfile().id : 0,
            isDefault: 0,
            name: name,
            cardType: cardType,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
        }, res => {
            setpkId(``)
            fetchCard();
        })
    }

    const updateCard = () => {
        setbackendErr(``);
        if (!name || !cardNumber || !cardType || !expiryDate || !cvv) {
            setbackendErr(`Please complete form to continue`);
            return;
        }

        props._put(`orderPaymentMethods/${pkId}`, {
            userId: (getProfile()) ? getProfile().id : 0,
            isDefault: 0,
            name: name,
            cardType: cardType,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            id: pkId
        }, res => {
            setpkId(``)
            fetchCard();
        })
    }

    const delCard = (data) => {

        props._put(`orderPaymentMethods/${data.id}`, {
            userId: (getProfile()) ? getProfile().id : 0,
            type: `DELETE`,
            id: data.id
        }, res => {
            setpkId(``)
            fetchCard();
        })
    }

    const defCard = (data) => {

        props._put(`orderPaymentMethods/${data.id}`, {
            userId: (getProfile()) ? getProfile().id : 0,
            isDefault: 1,
            id: data.id
        }, res => {
            setpkId(``)
            fetchCard();
        })
    }

    const edit = (data) => {

        setpkId(data.id)
        setname(data.name)
        setcardType(data.cardType)
        setcardNumber(data.cardNumber)
        setexpiryDate(data.expiryDate)
        setcvv(data.cvv)
    }

    return (
        <>
            <AtrumLayout {...props}>
                <section className="checkout-headsec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head">Confirm Your Order</h3>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="checkout-sec">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="filter">
                                    <div className="filter-box">
                                        <ul className="filter-list">
                                            <li><Link to="/dashboard">Dashboard</Link></li>
                                            <li><Link to="/profile">My Profile</Link></li>
                                            
                                            <li><Link to="/saved/address">My Address</Link></li>
                                            <li className={`active`}><Link to="/saved/card">My Saved Cards</Link></li>
                                            <li><Link to="/wishlist">My Wishlist</Link></li>
                                            <li><Link to="/order/history">My Order History</Link></li>
                                            <li><Link to="/bid/history">My Bid History</Link></li>
                                            <li><Link to="/logout"><img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/logout.png"  style={{marginRight:"10px"}} /> Sign out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="checkout-box">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h3 className="main-head">My Saved Card</h3>
                                            <div className="checkout-formbox">
                                                <form action="#" method="post">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label>Name</label>
                                                        </div>
                                                        <div className="col-md-9 form-group">
                                                            <input type="text" placeholder className="form-control" value={name} onChange={(e) => setname(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label>Card Number</label>
                                                        </div>
                                                        <div className="col-md-9 form-group">
                                                            <input type="text" placeholder className="form-control" value={cardNumber} onChange={(e) => setcardNumber(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-3" />
                                                        <div className="col-md-9">
                                                            <div className="row">
                                                                <div className="col-md-6 form-group">
                                                                    <label>mm/yy<label>
                                                                        <input type="text" placeholder className="form-control" value={expiryDate} onChange={(e) => setexpiryDate(e.target.value)} />
                                                                    </label></label></div>
                                                                <div className="col-md-6 form-group">
                                                                    <label>CVV<label>
                                                                        <input type="text" placeholder className="form-control" value={cvv} onChange={(e) => setcvv(e.target.value)} />
                                                                    </label></label></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`text-danger text-center mb-3`}>{backendErr}</div>
                                                    <div className="row">
                                                        <div className="col-md-3" />
                                                        <div className="col-md-9">
                                                            <div className="row">
                                                                <div className="col-md-5">
                                                                    <a className="btn-btn hover" onClick={() => edit({
                                                                        id: ``,
                                                                        name: ``,
                                                                        cardNumber: ``,
                                                                        expiryDate: ``,
                                                                        cardType: `Visa`,
                                                                        cvv: ``
                                                                    })}>Cancel</a>
                                                                </div>
                                                                <div className="col-md-2" />
                                                                <div className="col-md-5">
                                                                    <a className="btn-black hover" onClick={saveCard}>Save</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="saved-shipaddress">
                                                <h3 className="inner-head">Saved Payment Methods</h3>
                                                <div className="row mt-5">

                                                    {card && card.length > 0 ? card.map((data, idx) => {
                                                        return (

                                                            <div key={idx} className="col-md-6">
                                                                <div className="address-card">
                                                                    <h4 className="address-cardhead">{data.card}
                                                                        {data.isDefault === 1 ?
                                                                            <span>Default</span>
                                                                            : <span className="setdefault" onClick={() => { defCard(data) }}>Set as Default</span>
                                                                        }
                                                                    </h4>
                                                                    <p className="address-box mt-4">{data.cardNumber}<br /> {data.cardType}</p>
                                                                    <div className="card-btnbox">
                                                                        <div className="row mt-4">
                                                                            <div className="col-md-5">
                                                                                <a className="btn-btn hover" onClick={() => { edit(data) }}>Edit</a>
                                                                            </div>
                                                                            <div className="col-md-2" />
                                                                            <div className="col-md-5" onClick={() => { delCard(data) }}>
                                                                                <a className="btn-black hover">Remove</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
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
        _put
    }, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SavedCard);