import React, { useEffect, useState } from "react";
import queryString from 'query-string';

const PaymentSuccess = (props) => {

    const propsQuery = queryString.parse(props.location.search);
    const [cart, setcart] = useState();
    const [total, settotal] = useState();
    const [vat, setvat] = useState();
    const [shippingAmt, setshippingAmt] = useState()
    const [webView, setwebView] = useState(0)

    useEffect(() => {

        setwebView(localStorage.getItem("webview"));


        if (props.modalCall == true) {

            props._list(`userCarts`, `?cartId=${props.id}`, res => {
                if (res.data.fetch.length > 0) {
                    setcart(res.data.fetch);
                    let t = 0;
                    let st = 0;
                    let product = res.data.fetch;
                    product.forEach(element => {
                        t += element.price * element.qty;
                        st += element.shippingAmount;
                    });

                    settotal(t);
                    setshippingAmt(st);
                    setvat(res.data.fetch[0].order.vat);

                }
            });
        }

    }, [props.id, props.modalCall])


    if (props.modalCall == false) {
        return <></>;
    }

    return (
        <>
            <div className="certificate-popup">
                <div className="modal" id="paymentsuccess">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                {cart && cart[0].orderStatus == "FAILED" ?
                                    <><h3>Order Failed.
                                        {webView == "1" ?
                                            <a href="atrumart://payment-finish">
                                                <button type="button" className="close" data-dismiss="modal"><img src="/assets/images/cancel.png" /></button>
                                            </a>
                                            : <button type="button" className="close" data-dismiss="modal"><img src="/assets/images/cancel.png" /></button>}


                                    </h3>
                                       
                                    </> :
                                    <>
                                        <h3>Order Successfully placed. Thanks!
                                            {webView == "1" ?
                                                <a href="atrumart://payment-finish">
                                                    <button type="button" className="close" data-dismiss="modal"><img src="/assets/images/cancel.png" /></button>
                                                </a>
                                                : <button type="button" className="close" data-dismiss="modal"><img src="/assets/images/cancel.png" /></button>}

                                        </h3>
                                        <p>Thank you for placing the order with us. Payment successfully done. Your order will be shipped soon.</p>
                                    </>}
                                <hr />
                                <div>
                                    <div className="summery-box">
                                        <table>
                                            <tbody>
                                                {cart && cart.length > 0 ? cart.map((data, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td><a href="#"><img src={data.arts.productImage} /></a></td>
                                                            <td><h5>{data.arts.productName}</h5></td>

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
                                                    <td>$ {total}</td>
                                                </tr>
                                                <tr>
                                                    <td>VAT ({vat}%)</td>
                                                    <td>$ {(total * vat) / 100}</td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping Charges</td>
                                                    <td>{(shippingAmt == 0) ? `Yet to be calculated` : `$ ` + shippingAmt}</td>
                                                </tr>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>$ {(total + (parseFloat(vat) * total) / 100) + shippingAmt}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PaymentSuccess