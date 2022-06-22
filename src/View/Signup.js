import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { _post, _list } from "../Store/action/crud";


let element=null;

const Signup = (props) => {

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [roleType, setroleType] = useState(`USER`);
    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
    const [password, setpassword] = useState();
    const [cpassword, setcpassword] = useState();
    const [backendErr, setbackendErr] = useState(``);


    useEffect(() => {
        onLoadGoogleCallback();
    }, [document.getElementById('googleSignIn')])

    const signup = () => {

        setbackendErr(``);
        if (!firstName) { setfirstName(false); return; }
        if (!lastName) { setlastName(false); return; }
        if (!email) { setemail(false); return; }
        if (!phone) { setphone(false); return; }
        if (!password) { setpassword(false); return; }
        if (password!=cpassword) { setcpassword(false); return; }
        if (!emailRegex.test(email)) { setbackendErr(`Email is invalid`); return; }

        props._post(`users`, {

            roleType: roleType,
            name: `${firstName} ${lastName}`,
            email: email,
            password: password,
            phone:phone

        }, res => {
           
            alert(`You have successfully registered.`)
            setTimeout(() => {
                props.history.push(`/login`)
            }, 0);

        }, err => {
            setbackendErr(err.response.data.errorMessage);
        })
    }

    // Fetch the user profile data from facebook
    const getFbUserData = () => {
        window.FB.api('/me', { locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture' },
            function (response) {
              
                props._post(`users`, {

                    roleType: roleType,
                    name: response.first_name+" "+response.last_name,
                    email: response.email,
                    password: "facebook.response"
        
                }, res => {
                    localStorage.setItem("profile", JSON.stringify(res.data.fetch));
                    alert(`You have successfully registered.`)
                    setTimeout(() => {
                        props.history.push(`/`)
                    }, 0);
        
                }, err => {
                    setbackendErr(err.response.data.errorMessage);
                })
          
        });
    }


    const onLoadGoogleCallback = () => {
        var auth2;
        window.gapi.load('auth2', function () {
            auth2 = window.gapi.auth2.init({
                client_id: '83794549678-kglq1tjro1bbrt45jfdn2u2m9ud6rmtg.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile'
            });

            auth2.attachClickHandler(element, {},
                function (googleUser) {
                   
                    props._post(`users`, {

                        roleType: roleType,
                        name: googleUser.getBasicProfile().getName(),
                        email: googleUser.getBasicProfile().getEmail(),
                        password: `googleUser.getBasicProfile().getEmail()`
            
                    }, res => {
                        localStorage.setItem("profile", JSON.stringify(res.data.fetch));
                        alert(`You have successfully registered.`)
                        setTimeout(() => {
                            props.history.push(`/`)
                        }, 0);
            
                    }, err => {
                        setbackendErr(err.response.data.errorMessage);
                    })
                }, function (error) {
                    
                }
            );
        });

        element = document.getElementById('googleSignIn');
    }

    const handleFirstName = e => {
        const { value } = e.target;
       
        setfirstName(value);
    }

    const handleLastName = e => {
        const { value } = e.target;
       
        setlastName(value);
    }

    const handlePhone = e => {
        const { value } = e.target;
        
        setphone(value);
    }

    const handleEmail = e => {
        const { value } = e.target;
       
        setemail(value);
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
                                        <h4>Sign up to Atrum</h4>
                                        <ul className="social-signup">
                                            <li><a onClick={getFbUserData} className="fbook" href="#"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/fb.png" /></a></li>
                                            <li><a onClick={onLoadGoogleCallback} id="googleSignIn"  className="gbook" href="#"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/google.png" /></a></li>
                                    </ul>
                                    <p>Or Create an Artum Account With Your Email</p>
                                </div>
                                <div className="signup-form">
                                    <div>
                                        <input type="text" placeholder="First Name" maxLength={50} onKeyPress={(event) => {if (!/^[A-Za-z]+$/.test(event.key)) {event.preventDefault();}}} onChange={e => handleFirstName(e)} />
                                        {firstName === false ? <div className="message">First Name is Required, Please Provide One</div> : null}
                                        <input type="text" placeholder="Last Name"  maxLength={50} onKeyPress={(event) => {if (!/^[A-Za-z]+$/.test(event.key)) {event.preventDefault();}}}  onChange={e => handleLastName(e)} />
                                        {lastName === false ? <div className="message">Last Name is Required, Please Provide One</div> : null}
                                        <input type="email" placeholder="Email Address"  maxLength={100} onChange={e => handleEmail(e)} />
                                        {email === false ? <div className="message">Email is Required, Please Provide One</div> : null}
                                        <input type="text" placeholder="Phone Number" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}   onChange={e => handlePhone(e)} />
                                        {phone === false ? <div className="message">Phone Number is Required, Please Provide One</div> : null}
                                        <input type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />
                                        {password === false ? <div className="message">Password is Required, Please Provide One</div> : null}
                                        <input type="password" placeholder="Confirm Password" onChange={e => setcpassword(e.target.value)} />
                                        {cpassword === false ? <div className="message">Password & confirm Password is same</div> : null}
                                        <div className="text-center mt-3">
                                            <div className={`text-danger mb-3`}>{backendErr}</div>
                                            
                                            <input type="submit" value="signup" onClick={signup} />
                                            
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
)(Signup);