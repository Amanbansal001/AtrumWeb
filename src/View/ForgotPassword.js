import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { _post, _list } from "../Store/action/crud";

const ForgotPassword = (props) => {

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [roleType, setroleType] = useState(`USER`);
    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [backendErr, setbackendErr] = useState(``);

    const signup = () => {

        setbackendErr(``);
        if (!email) { setemail(false); return; }
        if (!emailRegex.test(email)) { setbackendErr(`Email is invalid`); return; }

        props._post(`auth/reset`, {
            email: email,
        }, res => {
            props.history.push({
                pathname: '/reset/password',
                state: {
                    email: email
                }
            })
        }, err => {
            setbackendErr(err.response.data.errorMessage);
        })
    }

    return (
        <>
            <section className="signup-sec">
                <div className="container-fluid">
                    <div className="signup-box">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="signup-text">
                                    <div className="signup-head">
                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/atrum-logo-old.png" className="img-fluid" />
                                        <h4>Forgot Password</h4>

                                    </div>
                                    <div className="signup-form">
                                        <div className={`mt-5"`}>

                                            <input type="text" placeholder="Email Address" maxLength={50} onChange={e => setemail(e.target.value)} />
                                            {email === false ? <div className="message">Email is Required, Please Provide One</div> : null}

                                            <div className="text-center mt-5">
                                                <div className={`text-danger mb-3`}>{backendErr}</div>

                                                <input type="submit" defaultValue="Send Reset Link" onClick={signup} />


                                                <p className="mt-4 mt-sm-0">Already a Member? <Link to="/login">Sign In</Link></p>
                                                <p className="mt-2">
                                                    By Clicking ’Sign Up’ You Confirm You Have Read, <br />Understood And Agreed To The Artum
                                                    <br /><Link to="/terms-and-conditions">Terms &amp; Conditions</Link> And <Link to="/privacy-policy">Privacy Policy</Link>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="sigin-sideimg">
                                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/atrum-red-bg.jpg" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
)(ForgotPassword);