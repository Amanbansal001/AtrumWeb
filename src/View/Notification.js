import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

const Notification = (props) => {
    return (
        <>
            <AtrumLayout {...props}>
                <section className="notification-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="notification-box">
                                    <h3 className="main-head text-center">Notifications</h3>
                                    <div className="not-box mt-3">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h4 className="mb-3">Trending Artists on Atrum</h4>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="not-inner">
                                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/n1.png" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="not-inner">
                                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/n2.png" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="not-inner">
                                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/n3.png" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="not-inner">
                                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/n4.png" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="not-box">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h4 className="mb-4">5 Artists on Our Radar This October <span>By Atrum Editorial</span></h4>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="not-inner">
                                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/n1.png" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="not-inner">
                                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/n2.png" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="not-inner">
                                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/n3.png" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="not-inner">
                                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/n4.png" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            </div>
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
)(Notification);