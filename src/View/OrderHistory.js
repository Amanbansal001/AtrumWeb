import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import queryString from 'query-string';
import { mmddyyyy, showModal } from "../Utils";
import PaymentSuccess from "../Components/PaymentSuccess";
import { getProfile } from "../Utils/token";


const P_STATUS = {
    "PENDING FOR SHIPPING CHARGES": "1",
    "PENDING FOR PAYMENT": "2",
    "CONFIRMED": "3",
    "ACCEPTED": "4",
    "SHIPPED": "5",
    "DELIVERED": "6",
    "PENDING FOR PAYMENT ABOVE LIMIT": 7
}

const OrderHistory = (props) => {

    const propsQuery = queryString.parse(props.location.search);
    const [pid, setpid] = useState();
    const [orders, setorders] = useState();
    const [modalCall, setmodalCall] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, [])

    useEffect(() => {

        if (propsQuery.id) {

            props._list(`orders`, `?cartId=${propsQuery.id}`, res => {
                if (res.data.fetch.length > 0) {
                    
                    props._post(`orders`, {
                        isUpdate: 1,
                        cartId: propsQuery.id,
                        orderStatus: 'CONFIRMED'
                    }, res => {
                        setmodalCall(true)
                        setpid(propsQuery.id)
                        fetchOrder();
                        localStorage.removeItem("cart")
                        window.showBtModal(`paymentsuccess`);
                    })
                    
                }
            });


        }
    }, [propsQuery.id])

    const fetchOrder = () => {
        props._list(`userCarts?userId=${getProfile().id}&sortBy=desc`, ``, res => {
            setorders(res.data.fetch);
        })
    }

    const generateOrderId = (e) => {
        return `ORD${String(e.order.id).padStart(6, '0')}`
    }

    return (
        <>
            <AtrumLayout {...props}>
                <section className="checkout-headsec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head d-none d-sm-block">Order History</h3>
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
                                            <li className="active"><Link to="/order/history">My Order History</Link></li>
                                            <li><Link to="/bid/history">My Bid History</Link></li>
                                            <li><Link to="/logout"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/logout.png" style={{ marginRight: "10px" }} /> Sign out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="checkout-box with-order">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="main-head">My Order History</h3>
                                            <div className="summery-box">
                                                <table>
                                                    <tbody>
                                                        {orders && orders.length > 0 ? orders.map((data, idx) => {
                                                            return (
                                                                <tr key={idx}>
                                                                    <td>{idx + 1}.</td>
                                                                    <td><img style={{ width: `50px` }} src={data.arts.productImage} /></td>
                                                                    <td><h5>{data.user.name} <br />({generateOrderId(data)})</h5></td>
                                                                    <td>Ordered on <br />{mmddyyyy(data.createdAt)}</td>
                                                                    {data.deliveryDate ?
                                                                        <td>Delivered on <br />{mmddyyyy(data.deliveryDate)}</td>
                                                                        : <td>Delivery yet to be confirmed</td>}
                                                                    <td>GrandTotal <br />$ {data.order.grandTotal}</td>

                                                                    <td>Vat <br />$ {data.vat}</td>
                                                                    <td>Shipping <br />$ {data.shippingAmount}</td>
                                                                    <td colSpan="2">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <a className="btn-btn cursor-pointer">{data.orderStatus}</a>
                                                                            </div>

                                                                        </div>
                                                                    </td>
                                                                </tr>
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
                <PaymentSuccess {...props} id={propsQuery.id} modalCall={modalCall} />
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
)(OrderHistory);