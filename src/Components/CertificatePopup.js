import React from "react";
import * as utils from '../Utils';

const styles = {
    productName: {
        "fontSize": "26px",
        "letterSpacing": "2.3px",
        "padding": "5px 0px",
    }
}

const CertificatePopup = (props) => {

    
    return (
        <>
            {props.productById && props.productById.user ?
                <div className="certificate-popup maxwidth780">
                    <div className="modal" id="certificate" data-backdrop="static" data-keyboard="false">
                        <div className="modal-dialog">
                            
                            <div className="modal-content" style={{
                                padding: "0px",
                                margin: "0px",
                                height: "0px",
                                background: "none"
                            }}>
                                <div className="col-lg-12 col-md-12 col-12 authenticity mx-auto my-0 my-sm-4 pt-2 pb-3 px-1">
                                    <div onClick={e => window.hideBtModal('certificate')} data-dismiss="modal" className="certifcatepopupNewCLose"
                                    >X</div>
                                    <h3 className="text-center font-family-fajole  mt-3">
                                        CERTIFICATE OF AUTHENTICITY
                                    </h3>

                                    <div className="row gx-0 mx-0">
                                        <div className="col-lg-4 col-md-3 d-lg-block d-md-block d-none mt-4"></div>
                                        <div className="col-lg-8 col-md-9 col-12 mt-4 font-family-titilium">
                                            <div>
                                                <img
                                                    style={{ maxHeight: "300px", maxWidth: "100%" }}
                                                    src={(props.productById) ? props.productById.productImage : ''}
                                                    alt="art"
                                                />
                                            </div>
                                            <div className="authenticity-body">
                                                <p className="mt-2 upper font-size-12 line-height-18 upper">
                                                    Artist
                                                </p>
                                                <p className="mb-3 line-height-18 font-bold  upper">
                                                    {(props.productById) ? props.productById.user.name : ''}
                                                </p>

                                                <p className="line-height-18 upper font-size-12">Artwork</p>
                                                <p className="line-height-18 upper font-bold mb-2 fs-22 imnotbumbertxt" style={styles.productName}>
                                                    {(props.productById) ? props.productById.productName : ''}
                                                </p>
                                                <p className="line-height-18 text-justify mb-3">
                                                    {(props.productById) ? props.productById.productDescription : ''}
                                                </p>

                                                <p className="line-height-18 upper font-size-12">Medium</p>
                                                <p className="line-height-18 upper fs-16 ">
                                                    {(props.productById) ? props.productById.medium : ''}
                                                </p>

                                                <div className="row gx-0 mx-0 mt-2 ">
                                                    <div className="col-6 px-0 my-2">
                                                        <p className="line-height-18 upper font-size-12">dimension</p>
                                                        <p className="line-height-18 fs-16 ">
                                                            {props.productById.length}cm x {props.productById.height}cm
                                                        </p>
                                                    </div>
                                                    <div className="col-6 px-0 my-2">
                                                        <p className="line-height-18 upper font-size-12">Edition</p>
                                                        <p className="line-height-18 upper fs-16 ">{props.productById.edition}</p>
                                                    </div>
                                                    <div className="col-6 px-0 my-2">
                                                        <p className="line-height-18 upper font-size-12">
                                                            DATE OF PRODUCTION
                                                        </p>
                                                        <p className="line-height-18 upper fs-16 ">
                                                            {utils.ddmmyyyy(props.productById.dateOfProduction)}
                                                        </p>
                                                    </div>
                                                    <div className="col-6 px-0 my-2">
                                                        <p className="line-height-18 upper font-size-12">
                                                            DATE OF PURCHASE
                                                        </p>
                                                        <p className="line-height-18 upper fs-16 ">
                                                            {utils.ddmmyyyy(new Date())}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="authenticity-footer font-family-titilium col-12 col-sm-1 pl-1 mt-sm-5"></div>
                                        <div className="authenticity-footer font-family-titilium col-12 col-sm-2 pl-3 pl-sm-1 mt-2 mt-sm-5 pr-0">
                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} className="certfilogonew mb-2" src={`/assets/images/atrum-logo.png`} alt="logo" />
                                            <p className="line-height-23  font-size-12">atrumart.com</p>
                                            <p className="line-height-23 font-size-12">+966 53833833</p>
                                            <p className="line-height-23  font-size-12">Anas Ibn Malik Rd, Al Malqa, Riyadh 13521</p>
                                        </div>
                                        <div className="authenticity-footer font-family-titilium col-12 col-sm-1 pl-1 mt-sm-5"></div>
                                        <div className="authenticity-footer font-family-titilium col-12 col-sm-8 mt-2 mt-sm-5">
                                            <div className="row gx-0 mx-0">
                                                <div className="col-6 col-sm-5 px-0">
                                                    <p className="upper font-size-12">AUTHORIZED SIGNATURE</p>
                                                    <p className="upper fs-16 font-bold mb-2">
                                                        Co-Founders Atrum
                                                    </p>
                                                    <img
                                                        style={{ maxWidth: "100%" }}
                                                        src="/assets/images/signature.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-1 col-sm-2 px-0"></div>
                                                <div className="col-5 col-sm-5 px-0">
                                                    <p className=" upper font-size-12 mb-2">ARTIST'S SIGNATURE</p>
                                                    <img
                                                        style={{ maxWidth: "100px" }}
                                                        src={(props.productById) ? props.productById.user.signature : ''}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    )

}

export default CertificatePopup