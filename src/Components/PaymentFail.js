import React, { useEffect, useState } from "react";

const PaymentFail = (props) => {

    const [cart,setcart] = useState();
    const [total,settotal] = useState();

    useEffect(()=>{
        let product = JSON.parse(localStorage.getItem("cart"));
        setcart(product);
        let t = 0;
        product.forEach(element => {
            t += element.price;
        });
        settotal(t);
    },[props.id])

    return (
        <>
            <div className="certificate-popup">
                <div className="modal" id="paymentsuccess">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h3>Oops! Something went wrong<button type="button" className="close" data-dismiss="modal"><img src="/assets/images/cancel.png" /></button></h3>
                                <p>Thank you for placing the order with us. Unfortunately, the payment was unsuccessful. Please retry</p>
                                <hr/>
                                <div>
                                    <div className="summery-box">
                                        <table>
                                            <tbody>
                                                {cart && cart.length>0?cart.map((data,idx)=>{
                                                    return(
                                                        <tr key={idx}>
                                                            <td><a href="#"><img src={data.productImage} /></a></td>
                                                            <td><h5>{data.productName}</h5></td>
                                                            
                                                            <td><h3>$ {data.price}</h3></td>
                                                        </tr>
                                                    )
                                                }):null}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <hr/>
                                    <div className="subtotal-box">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Subtotal</td>
                                                    <td>$ {total}</td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping Charges</td>
                                                    <td>$ 0</td>
                                                </tr>
                                                <tr>
                                                    <td>VAT</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>$ {total}</td>
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

export default PaymentFail