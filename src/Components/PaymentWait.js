import React, { useEffect, useState } from "react";

const PaymentWait = (props) => {

    const [carts, setcarts] = useState();

    useEffect(() => {
        setcarts(props.carts)
    }, [props.carts])


    return (
        <>

            <div className="certificate-popup paymentpopupnewweb">
                <div className="modal" id="paymentwait" data-backdrop="static" data-keyboard="false" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h3>Thanks!<button type="button" className="close" data-dismiss="modal" onClick={e => props.history.push('/')}><img src="/assets/images/cancel.png" /></button></h3>
                                <p>We will calculate shipping charges and get back to you within 48 hours.
                                </p>
                                <hr />
                                <div>
                                    <div className="summery-box">
                                        <table>
                                            <tbody>
                                                {carts && carts.length > 0 ? carts.map((data, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td><a href="#"><img src={data.productImage} /></a></td>
                                                            <td><h5>{data.productName}</h5></td>

                                                            <td><h3>$ {data.price * data.qty}</h3></td>
                                                        </tr>
                                                    )
                                                }) : null}

                                            </tbody>
                                        </table>
                                    </div>
                                    <hr />
                                    <div className="subtotal-box">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Subtotal</td>
                                                    <td>$ {props.total}</td>
                                                </tr>
                                                <tr>
                                                    <td>VAT ({props.vat}%)</td>
                                                    <td>$ {(props.total * props.vat) / 100}</td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping Charges</td>
                                                    <td>{(props.shippingAmt==0)?`Yet to be calculated`:`$ `+props.shippingAmt}</td>
                                                </tr>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>$ {(props.total + (parseFloat(props.vat) * props.total) / 100) + props.shippingAmt}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">

                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={e => props.history.push('/')}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PaymentWait