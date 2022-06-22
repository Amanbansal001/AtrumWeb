import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { HYPERPAY_URL } from "../Utils/constants";
import { BASE_URL } from "../Utils/url";
import { getProfile, parseJwtAndSave, setToken } from "../Utils/token";
import queryString from 'query-string';

const Payment = (props) => {

    const propsQuery = queryString.parse(props.location.search);
    const [carts, setcarts] = useState();
    const [total, settotal] = useState(0.00);


    useEffect(() => {
        localStorage.setItem("webview",(propsQuery && propsQuery.header==0)?"1":"0");
        isValidScreen();
    }, [])

    const getCart = () => {
        let product = localStorage.getItem("cart");
        if (product) {
            product = JSON.parse(product);
            let t = 0;
            product.forEach(element => {
                t += element.price;
            });
            product = product.map(e => ({ ...e, qty: 1 }));
            setcarts(product);
            settotal(t);

            localStorage.removeItem("cart");
        } else {
            props.history.push('/');
        }
    }

    const isValidScreen=()=>{

        if(propsQuery && propsQuery.access_token){
            setToken(propsQuery.access_token);
            parseJwtAndSave(propsQuery.access_token);

            attachCheckoutScript(props.match.params.cartId);

        }else{
            if(!props.match.params || !props.match.params.cartId){
                props.history.push('/');
            }else{
                getCart();
                attachCheckoutScript(props.match.params.cartId);
            }
        }

        
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

    const paymentCallC=()=>{
        window.paymentCallC();
    }

    const paymentCallF=()=>{
        window.paymentCallF();
    }


    return (
        <>
            <AtrumLayout {...props} propsQuery={propsQuery}>
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

                                            <div className="subtotal-box border-0">
                                            {propsQuery && propsQuery.header==0?
                                            <>
                                             <form action={`${BASE_URL.PURL}/order/redirect`} class="paymentWidgets" data-brands="VISA MASTER MADA APPLEPAY"></form>
                                           
                                            </>
                                            : <form action={`${BASE_URL.PURL}/order/history`} class="paymentWidgets" data-brands="VISA MASTER MADA APPLEPAY"></form>
                                            }
                                               
                                            </div>

                                            {propsQuery && propsQuery.header==0?
                                            <>
                                             
                                            <div class=" mt-3">
                                                <a class="view-all" href="atrumart://payment-finish">Cancel</a>
                                            </div>
                                           
                                            </>
                                            :<div class=" mt-3">
                                            <a class="view-all" href="atrumart://payment-finish">Cancel</a>
                                            </div>}
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
)(Payment);