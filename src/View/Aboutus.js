import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

const Aboutus = (props) => {

    return (
        <>
            <AtrumLayout {...props}>
                <div>
                    <section className="ab-atrum-sec">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="ab-atrum-head pb-3 pt-sm-5 pb-sm-3">
                                       
                                        <img src="/assets/images/about-atrum1.jpg" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                
                                    <div className="ab-left text-justify anybodyabouttxt">
                                        <p>Atrum is a virtual exhibition platform dedicated to bringing artful living to enrich the creative experiences of everyday life. We are committed to supporting emerging artists in Saudi Arabia and beyond, enhancing collective knowledge within the creative world, and bridging the gap between the collectors and the artists who consistently inspire us to lead more art-full lives.</p>
                                        <p>Through our interconnected website and app, Atrum presents diverse audiences with the chance to purchase the works of artists from every corner of the world.</p>
                                        <p>We believe in a world where art is easily, conveniently and democratically available to anyone who might be interested in transforming their lives into more interesting, joyful, and unique journeys. For us, the ability to access and acquire art is critical to the fulfillment of this desire, which is why we have emphasized our online presence and the virtual user experience. We also happen to be the first Saudi Arabian platform to introduce NFTs.</p>
                                        <p>Whether online or through our live programming, Atrum is keen on providing just the right balance between the digital and the tangible. We have leveraged our expertise and extensive networks to bring together an outstanding line-up of creators, designers, interior designers, gallerists, artists and educators.</p>
                                        <p className="text-center"><strong>We are proudly partnered with:</strong></p>
                                        <div className="row justify-content-center">
                                            <div className="col-md-6 text-center">
                                                <img src="/assets/images/ksa-logo.png" className="partnerlogo" />
                                                <p className="mt-2 mt-sm-4 constxt text-justify">
                                                    Constantine KSA are Fine Art Logistics providers who operate out of Riyadh, Jeddah and Dammam. Family owned for four generations, Constantine KSA offer fine art handling and installation services for private collectors, museums and galleries in the Kingdom and worldwide.
                                                    Constantine KSA services include domestic and international transport; airline supervision and customs; packaging and case-making; installation and fabrication; climate and temperature-controlled storage; conservation and fine-art Insurance.
                                                </p>
                                            </div>
                                            <div className="col-md-2 text-center"><img src="/assets/images/dhl-logo.png" className="dhlpartnerlogo" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </section>
                   
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
)(Aboutus);