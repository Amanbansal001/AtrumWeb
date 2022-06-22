import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { showModal } from "../Utils";
import { getProfile } from "../Utils/token";
import { BASE_URL } from "../Utils/url";

const CartLanding = (props) => {

    const profile = getProfile();
    const [carts, setcarts] = useState();
    const [total, settotal] = useState(0.00);

    useEffect(() => {


        props._list('products/all', `?active=1&isStock=1`, res => {
            let apiProducts =res.data.fetch;
            let product = localStorage.getItem("cart");
            if (product) {
                product = JSON.parse(product);
                let t = 0;
                let p = [];
                product.forEach(element => {
                    let f = apiProducts.find(e=>e.id==element.id);
                  
                    if(f){
                        t += f.price;
                        if(!element.isAuction){
                            element.price = f.price;
                        }
                        p.push(element);
                    }
                });
                p = p.map(e=>({...e,qty:(e.qty)?e.qty:1}));
                setcarts(p);
                localStorage.setItem("cart",JSON.stringify(p));
                settotal(t);
            } else {
                setcarts([]);
            }
        })
        
    }, [])

    const removeFromCart = (idx) => {
        let product = carts;
        product.splice(idx, 1);
        setcarts([...product]);
        localStorage.setItem("cart", JSON.stringify(product));
    }

    const addQty=(idx)=>{
        const c = carts;

        if(c[idx].inStock<=c[idx].qty){
            return;
        }

        c[idx].qty+=1;
        setcarts([...c]);
        localStorage.setItem("cart", JSON.stringify(c));
    }

    const removeQty=(idx)=>{
        const c = carts;
        if(c[idx].qty<=1){
            removeFromCart(idx);
            return;
        }
        c[idx].qty-=1;
        setcarts([...c]);
        localStorage.setItem("cart", JSON.stringify(c));
    }

    const getPaymentId = (e) => {

        if(!profile){
            alert(`Kindly Login to continue`);
            return;
        }

        e.preventDefault();
        props.history.push('/order/checkout');
        
    }

    return (
        <>
            <AtrumLayout {...props}>
                <section>
                    {carts && carts.length > 0 ?
                        null
                        : <div className={`col-md-12 text-center mt-5 mb-5 mobminheught50vh`}>
                        <h3 className="cart-head d-none d-sm-block">In Your Cart</h3>
                        <div className="add-cartbox">
                            No Item(s) in cart
                        </div>
                    </div>}
                </section>
                <section className="cart-sec mb-5">
                    {carts && carts.length > 0 ?
                        <div className="container">
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="cart-left">
                                        <h3 className="cart-head d-none d-sm-block">In Your Cart</h3>
                                        <div className="add-cartbox">

                                            {carts && carts.length > 0 ? carts.map((data, idx) => {
                                                return (
                                                    <div key={idx} className="row mt-4">
                                                        <div className="col-md-4">
                                                            <div className="add-productimg">
                                                                <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src={data.productImage} className="img-fluid" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="add-productdetails mobilecartdescrptxt">
                                                                <h3 className="main-head">{data.productName}, {data.publishYear}</h3>
                                                                <h4 className="sub-head">{data.edition}</h4>
                                                                <p>Shipped from {data.user.nationality}, {data.user.city}</p>
                                                                
                                                                <p className="cost">USD$ {data.price}</p>
                                                            </div>
                                                        </div>
                                                        {!data.isAuction?
                                                        <div className="col-md-12">
                                                            <ul className="qua-remove">
                                                                <li>
                                                                    
                                                                </li>
                                                                <li><a href="#" onClick={() => { removeFromCart(idx) }}>Remove from cart</a></li>
                                                            </ul>
                                                        </div>
                                                        :null}
                                                    </div>
                                                )
                                            }) : <>No Item(s) in cart</>}



                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="cart-right">
                                        <div className="cart-summery">
                                            <h3 className="cart-head">Summary</h3>
                                            <div className="summery-box">
                                                <table>
                                                    <tbody>
                                                        {carts && carts.length > 0 ? carts.map((data, idx) => {
                                                            return (
                                                                <tr key={idx}>
                                                                    <td onClick={() => { removeFromCart(idx) }}><a href="#"><img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/cancel.svg" /></a></td>
                                                                    <td><h5>{data.productName}, {data.publishYear} <span>by {data.user.name}</span></h5></td>
                                                                    <td><h3>$ {data.price * data.qty}</h3></td>
                                                                </tr>
                                                            )
                                                        }) : <tr><td>No Item in cart</td></tr>}

                                                    </tbody></table>
                                            </div>
                                            <div className="coupon-applybox">
                                                
                                            </div>
                                            <div className="summery-buttonbox">
                                                <Link to="/product/listing" className="cart-button">Continue Browsing Art</Link>
                                                {carts && carts.length > 0 ?
                                                    <a href="#" className="cart-button second" onClick={getPaymentId}>Proceed to Checkout</a>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        : null}

                    <form action={`${BASE_URL.PURL}/order/history`} class="paymentWidgets" data-brands="VISA MASTER MADA APPLEPAY"></form>
                </section>

                <div className="">
                    <div className="modal" id="checkoutFormModal">
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ background: "transparent", border: "none" }}>
                                <div className="modal-body">
                                    <div id="checkoutForm"></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
)(CartLanding);