import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

const CheckoutPayment = (props) => {
    return (
        <>
            <AtrumLayout {...props}>
                <section className="checkout-headsec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head d-none d-sm-block">Confirm Your Order</h3>
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
                                            <li className="active"><a href="#">My Order</a></li>
                                            <li><a href="#">My Address</a></li>
                                           
                                            <li><a href="#">My Order History</a></li>
                                            <li><a href="#">My Bid History</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="checkout-box">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="main-head">My Order Summary</h3>
                                            <div className="summery-box">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><h5>Melancholia, 2014 <span>by Dimitris Merantzas</span></h5></td>
                                                            <td><h3>$ 2,000</h3></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Melancholia, 2014 <span>by Dimitris Merantzas</span></h5></td>
                                                            <td><h3>$ 2,000</h3></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h5>Melancholia, 2014 <span>by Dimitris Merantzas</span></h5></td>
                                                            <td><h3>$ 2,000</h3></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="subtotal-box">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Subtotal</td>
                                                            <td>$ 6,000</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Shipping Charges</td>
                                                            <td>$ 200</td>
                                                        </tr>
                                                        <tr>
                                                            <td>VAT</td>
                                                            <td>$ 60</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Discount</td>
                                                            <td>$ 250</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Total</td>
                                                            <td>$ 6,010</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="payment-box">
                                                <h4 className="inner-head">Select Payment Method</h4>
                                                <h4 className="inner-head">Pay with Card:</h4>
                                                <table>
                                                    <tbody><tr>
                                                        <td>Omar Shaikh</td>
                                                        <td>Visa</td>
                                                        <td>XXXX-XXXX-XXXX-0119</td>
                                                        <td>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <a href="#" className="btn-black">Select</a>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <a href="#" className="btn-btn">Edit</a>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <a href="#" className="btn-btn">Remove</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                        <tr>
                                                            <td>Omar Shaikh</td>
                                                            <td>Visa</td>
                                                            <td>XXXX-XXXX-XXXX-0119</td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <a href="#" className="btn-black">Select</a>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <a href="#" className="btn-btn">Edit</a>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <a href="#" className="btn-btn">Remove</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Omar Shaikh</td>
                                                            <td>Visa</td>
                                                            <td>XXXX-XXXX-XXXX-0119</td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <a href="#" className="btn-black">Select</a>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <a href="#" className="btn-btn">Edit</a>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <a href="#" className="btn-btn">Remove</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody></table>
                                                <div className="checkout-formbox">
                                                    <h4 className="inner-head">Add Payment Method</h4>
                                                    <form action="#" method="post">
                                                        <div className="row">
                                                            <div className="col-md-10">
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <label>Name</label>
                                                                    </div>
                                                                    <div className="col-md-10 form-group">
                                                                        <input type="text" placeholder className="form-control" />
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <label>Card Number</label>
                                                                    </div>
                                                                    <div className="col-md-10 form-group">
                                                                        <input type="text" placeholder className="form-control" />
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <label />
                                                                    </div>
                                                                    <div className="col-md-5 form-group">
                                                                        <label>mm/yy</label>
                                                                        <input type="text" placeholder="name" className="form-control" />
                                                                    </div>
                                                                    <div className="col-md-5 form-group">
                                                                        <label>CVV</label>
                                                                        <input type="text" placeholder="name" className="form-control" />
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <label />
                                                                    </div>
                                                                    <div className="col-md-5 form-group">
                                                                        <a href="#" className="btn-btn">Cancel</a>
                                                                    </div>
                                                                    <div className="col-md-5 form-group">
                                                                        <a href="#" className="btn-black">Save</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h4 className="inner-head mt-3">Billing Address:</h4>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label>Bill To:</label>
                                                            </div>
                                                            <div className="col-md-9 form-group mbn">
                                                                <input type="text" placeholder="address 1" className="form-control mb-3" />
                                                                <input type="text" placeholder="address 2" className="form-control mb-3" />
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-3">
                                                                                <label>City:</label>
                                                                            </div>
                                                                            <div className="col-md-9 form-group">
                                                                                <select className="form-control">
                                                                                    <option>New Jersey</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-3">
                                                                                <label>State:</label>
                                                                            </div>
                                                                            <div className="col-md-9 form-group">
                                                                                <select className="form-control">
                                                                                    <option />
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-3">
                                                                                <label>Country:</label>
                                                                            </div>
                                                                            <div className="col-md-9 form-group">
                                                                                <select className="form-control">
                                                                                    <option>USA</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-3">
                                                                                <label>Pin/Zip:</label>
                                                                            </div>
                                                                            <div className="col-md-9 form-group">
                                                                                <select className="form-control">
                                                                                    <option>08844</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-4">
                                                            <div className="col-md-12">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <a href="#" className="btn-btn">Return to Cart</a>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <input type="text" defaultValue="Confirm Payment" className="btn-black" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
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
)(CheckoutPayment);