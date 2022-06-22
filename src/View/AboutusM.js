import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

const AboutusM = (props) => {

    return (
        <>
            <div>
                <section className="ab-atrum-sec">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="ab-atrum-head">
                                    <h5>Introduction</h5>
                                    <img src="/assets/images/about-atrum1.jpg" className="img-fluid" />
                                </div>
                            </div>
                            <div className="col-md-12 mt-5">
                                <h3 className="main-head">ABOUT ATRUM</h3>
                                <div className="text-center mt-5 mb-5"><img src="/assets/images/about-atrum2.jpg" className="img-fluid" /></div>
                            </div>
                            <div className="col-md-12 mt-5">
                                <h6>Atrum is an online platform with an interconnected website and app dedicated to championing and selling the work of artists
                                    from Saudi Arabia and beyond.</h6>
                            </div>
                            <div className="col-md-6">
                                <div className="ab-left">
                                    <p>Atrum’s parent company is the Riyadh-based VOX, a familiar name in the Saudi Arabian art world, dedicated to exploring
                                        social issues through the power of interactive art. </p>
                                    <p>We have leveraged our expertise and network of collectors, dealers, galleries and artists, to launch a virtual exhibition
                                        platform—the first of it’s kind in Saudi Arabia.</p>
                                    <p>The Covid-19 outbreak saw the closure of physical spaces, and cancelation of in-person</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="ab-left">
                                    <p>events and exhibitions. A new version of the virtual world has become a part of daily life, and continues to evolve
                                        beyond this pandemic. </p>
                                    <p>We are excited about the prospect of our platform in this developing environment.</p>
                                    <p>Atrum will give buyers—both from Saudi Arabia and the international community—easy access to aquire art from the comfort
                                        of one’s home.</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="ab-img">
                                    <img src="/assets/images/about-atrum3.jpg" className="img-fluid" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="ab-right">
                                    <h3>WHAT TO EXPECT</h3>
                                    <p className="mb-4">At Atrum we make the sale process very easy for the artists. We manage pick-up and delivery, handle communications
                                        with buyers, providing an e!cient and stress-free experience.</p>
                                    <p>There are no delivery costs or additional fees. We have partnered with Constantine KSA, a globally renowned specialist
                                        firm dedicated to the international transportation, packaging and delivery of art.</p>
                                    <h4>We ensure aquisitions reach the buyer in perfect condition.</h4>
                                    <h3>ABOUT CONSTANTINE KSA</h3>
                                    <p className="mb-4">Constantine KSA are Fine Art Logistics providers who operate out of Riyadh, Jeddah and Dammam. Family owned for four
                                        generations, Constantine KSA o"er fine art handling and installation services for private collectors, museums and galleries
                                        in the Kingdom and worldwide.</p>
                                    <p>Constantine KSA services include domestic and international transport; airline supervision and customs; packaging and
                                        case-making; installation and fabrication; climate and temperature-controlled storage; conservation and fine-art Insurance.</p>
                                </div>
                            </div>
                            <div className="col-md-12 mt-5 mb-5">
                                <h3 className="main-head">IN ACTION</h3>
                                <div className="last-ab">
                                    <p>Atrum is the <span>first online gallery</span> in Saudi Arabia.</p>
                                    <p>Atrum manages a carefully <span>curated selection of artwork</span> and a <span>live online auction</span> feature.
                                        When an auction begins, buyers can place their bids on each artwork using a timer countdown.</p>
                                    <p>Artists have dedicated profiles with an <span>inventory</span> of available work. Collectors can <span>follow</span> artists
                                        for updates on new consignments, and <span>browse</span> with <span>seamless online aquisitions.</span></p>
                                    <p>Atrum works on a <span>35% commission</span> basis, and manages transportation with a high-end fine art delivery service, with no
                                        costs whatsoever to the artist.</p>
                                    <ul>
                                        <li>Questions? <span>app@atrumart.com</span></li>
                                        <li>Instagram <span>atrum.sa</span></li>
                                        <li>Twitter <span>atrum_sa</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ab-lastimg">
                    <img src="/assets/images/about-atrum4.jpg" className="img-fluid" />
                </section>
            </div>
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
)(AboutusM);