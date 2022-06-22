import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { HYPERPAY_URL } from "../Utils/constants";
import { getProfile, isLogin } from "../Utils/token";
import { BASE_URL } from "../Utils/url";

const CheckoutOrder = (props) => {

    const [carts, setcarts] = useState();
    const [total, settotal] = useState(0.00);
    const [ship, setship] = useState();
    const [bill, setbill] = useState();

    useEffect(() => {
        isValidScreen();
    }, [])

    const getCart = () => {


        props._list(`userCarts`, `?cartId=${props.match.params.cartId}`, res => {
            let product = res.data.fetch;
            if (product) {
                ;
                let t = 0;
                let shippingAmt = 0;
                let vat = 0;
                product.forEach(element => {
                    t += element.price * element.qty;
                    shippingAmt += parseFloat(element.shippingAmt);

                    vat = element.vat;
                });

                t = ((t + (parseFloat(vat) * t) / 100) + shippingAmt)
                setcarts(product);
                settotal(t);
                setship(res.data.fetch[0].order.ship)
                setbill(res.data.fetch[0].order.bill)

                localStorage.removeItem("cart");
                attachCheckoutScript(props.match.params.cartId);
            } else {
                props.history.push('/');
            }
        }, err => {
            props.history.push('/');
        })


    }

    const isValidScreen = () => {

        if(!isLogin()){
            props.history.push('/');    
        }

        if (!props.match.params || !props.match.params.cartId) {
            props.history.push('/');
        } else {
       
            getCart();
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


    return (
        <>
            <AtrumLayout {...props}>
                <section className="checkout-headsec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head">Make Payment</h3>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="cart-sec">
                    {carts && carts.length > 0 ?
                        <div className="container">
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="cart-left">
                                        <h3 className="cart-head">Cart Summary</h3>
                                        <div className="add-cartbox">

                                            {carts && carts.length > 0 ? carts.map((data, idx) => {
                                                return (
                                                    <div key={idx} className="row mt-4">
                                                        <div className="col-md-4">
                                                            <div className="add-productimg">
                                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.arts.productImage} className="img-fluid" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="add-productdetails mobilecartdescrptxt">
                                                                <h3 className="main-head">{data.arts.productName}, {data.arts.publishYear}</h3>
                                                                <h4 className="sub-head">{data.arts.edition}</h4>
                                                                <p>Shipped from {data.user.nationality}, {data.user.city}</p>
                                                               
                                                                <p className="cost">USD$ {(data.order.grandTotal)}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            }) : <>No Item(s) in cart</>}



                                            <div className="row mt-5">
                                            <h3>Shipping Address</h3>
                                            </div>
                                            <div className="row ml-1">
                                            
                                                {ship ?
                                                    <>
                                                        
                                                        <p>{ship.name}</p>
                                                        <p>{ship.addressLine1},{ship.addressLine2},{ship.city},{ship.state},{ship.country},{ship.zipCode}</p>
                                                    </>
                                                    : null}
                                            </div>
                                            
                                            <div className="row mt-5">
                                                <h3>Billing Address</h3>
                                            </div>
                                            <div className="row ml-1">
                                                {bill ?
                                                    <div className="row">
                                                        
                                                        <p>{bill.name}</p>
                                                        <p>{bill.addressLine1},{bill.addressLine2},{bill.city},{bill.state},{bill.country},{bill.zipCode}</p>
                                                    </div>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mt-5">
                                        {isLogin()?
                                        <form action={`${BASE_URL.PURL}/order/history`} className="paymentWidgets" data-brands="VISA MASTER MADA APPLEPAY"></form>
                                        :
                                        <form action={`${BASE_URL.PURL}/order/redirect`} className="paymentWidgets" data-brands="VISA MASTER MADA APPLEPAY"></form>
                                        }
                                    </div>
                                </div>


                            </div>
                        </div>
                        : null}

                
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
)(CheckoutOrder);