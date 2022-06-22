import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { _post, _list } from "../Store/action/crud";

const ResetPassword = (props) => {
   
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [roleType,setroleType]=useState(`USER`);
    const [firstName,setfirstName]=useState();
    const [lastName,setlastName]=useState();
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const [cpassword,setcpassword]=useState();
    const [otp,setotp]=useState();
    const [backendErr,setbackendErr]=useState(``);
    const [backendok,setbackendok]=useState(``);
    const [disabled,setdisabled]=useState(false);

    useEffect(()=>{
        isValidScreen();
    },[])

    const reset=()=>{
        setbackendErr(``);
        if(!props.location.state.email){setemail(false);return;}
        if(!emailRegex.test(props.location.state.email)){setbackendErr(`Email is invalid`);return;}
        if (!password) { setpassword(false); return; }
        if(password!=cpassword){
            setbackendErr(`Password & confirm password must be same`);return;
        }


        props._post(`auth/reset/password`,{
            email:props.location.state.email,
            password:password,
            otp:otp
        },res=>{
            setbackendErr(``)
            setdisabled(true);
            setbackendok(`Password changed, you will be redirected in 5 seconds`)
            setTimeout(() => {
                props.history.push({
                    pathname: `/login`,
                    state: { email: null }
                });
            }, 4500);
        },err=>{
            setbackendErr(err.response.data.errorMessage);
        })
    }


    const isValidScreen=()=>{
        if(!props.location.state || !props.location.state.email){
            props.history.push('/login');
        }
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
                                        <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/atrum-logo-old.png" className="img-fluid" />
                                        <h4>Reset Password</h4>
                                        
                                    </div>
                                    <div className="signup-form">
                                        <div className={`mt-5"`}>
                                           
                                            <input type="password" placeholder="Check OTP in email" maxLength={5} onChange={e=>setotp(e.target.value)} disabled={disabled}/>
                                            {password===false?<div className="message">Password is Required, Please Provide One</div>:null}


                                            <input type="password" placeholder="Password" maxLength={50} onChange={e=>setpassword(e.target.value)} disabled={disabled}/>
                                            {password===false?<div className="message">Password is Required, Please Provide One</div>:null}

                                            <input type="password" placeholder="Confirm Password" maxLength={50} onChange={e=>setcpassword(e.target.value)} disabled={disabled}/>
                                            {password===false?<div className="message">Password is Required, Please Provide One</div>:null}
                                            
                                            <div className="text-center mt-5">
                                            <div className={`text-danger mb-3`}>{backendErr}</div>
                                            <div className={`text-success mb-3`}>{backendok}</div>
                                           
                                                <input type="submit" defaultValue="Send Reset Link" onClick={reset}/>
                                            
                                                <p>Already a Member? <Link to="/login">Sign In</Link></p>
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
                                    <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/atrum-red-bg.jpg" className="img-fluid" />
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
)(ResetPassword);