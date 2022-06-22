import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { getProfile } from "../Utils/token";
import queryString from 'query-string';
import { HYPERPAY_URL } from "../Utils/constants";
import { BASE_URL } from "../Utils/url";

const PaymentM = (props) => {

    const [carts, setcarts] = useState();
    const [total, settotal] = useState(0.00);
    const propsQuery = queryString.parse(props.location.search);

    useEffect(() => {
        isValidScreen();
    }, [])

    const isValidScreen = () => {
        attachCheckoutScript(propsQuery.id);
    }


    const attachCheckoutScript = (checkoutId) => {
       
        const scriptId = document.getElementById("checkoutFormScript");
        if (scriptId) {
            scriptId.remove();
        }

        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.id = `checkoutFormScript`;
        s.src = `${HYPERPAY_URL}/v1/paymentWidgets.js?checkoutId=${checkoutId}`;

        window.document.body.appendChild(s);

    }


    return (
        <>

            <section className="checkout-headsec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3 className="main-head">Make Payment</h3>
                        </div>
                    </div>
                </div>
            </section>
            <section className="checkout-sec">
                <div className="container-fluid">
                    <div className="row">
                        
                        <div className="col-md-12">
                            <div className="checkout-box">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3 className="main-head">Payment (Step 3)</h3>

                                        <div className="subtotal-box">
                                            <form action={`${BASE_URL.PURL}/order/history`} class="paymentWidgets" data-brands="VISA MASTER AMEX APPLEPAY"></form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
)(PaymentM);