import React, { useEffect, useState } from "react";
import { getToken, gotoDashboard, setProfile, setToken } from "../Utils/token";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { login, _otp } from "../Store/action/login";
import { _post, _list } from "../Store/action/crud";
import { Link } from "react-router-dom";

let element = null;

const Login = (props) => {

  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [backendErr, setbackendErr] = useState(``);

  useEffect(() => {
    onLoadGoogleCallback();
  }, [document.getElementById('googleSignIn')])

  const loginAPI = () => {
    setbackendErr(``)
    props._post(`auth/login`, {
      email: email,
      password: password
    }, res => {
      if (res.data.auth.roleType == "USER" || res.data.auth.roleType == "User") {
        setToken(res.data.auth.token);
        setProfile(res.data.auth);
        setTimeout(() => {
          props.history.push(`/`);
        }, 0);
      } else {
        setbackendErr(`User not found`)

      }
    }, err => {
      setbackendErr(err.response.data.errorMessage);
    })
  }

  const fbLogin = () => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        // Get and display the user profile data
        getFbUserData();
      } else {
        
        setbackendErr(`User cancelled login or did not fully authorize`);
      }
    }, { scope: 'email' });
  }

  // Fetch the user profile data from facebook
  const getFbUserData = () => {
    window.FB.api('/me', { locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture' },
      function (response) {
       
        if (response.error) {
          setbackendErr(response.error.message);
          return;
        }

        props._post(`auth/login`, {
          email: response.email,
          password: "facebook.response"
        }, res => {
          setToken(res.data.auth.token);
          setProfile(res.data.auth);
          setTimeout(() => {
            props.history.push(`/`);
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
         
          props._post(`auth/login`, {
            email: googleUser.getBasicProfile().getEmail(),
            password: "googleUser.getBasicProfile().getEmail()"
          }, res => {
            setToken(res.data.auth.token);
            setProfile(res.data.auth);
            setTimeout(() => {
              props.history.push(`/`);
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


  return (
    <>
      <section className="signup-sec withlogin">
        <div className="container-fluid">
          <div className="signup-box">
            <div className="row">
              <div className="col-md-6">
                <div className="signup-text">
                  <div className="signup-head">
                    <Link to={'/'}>
                      <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/atrum-logo-old.png" className="img-fluid" />
                    </Link>
                    <h4>Sign up to Atrum</h4>
                    <ul className="social-signup">
                      <li><a onClick={fbLogin} className="fbook" href="#"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/fb.png" /></a></li>
                      <li><a onClick={onLoadGoogleCallback} id="googleSignIn" className="gbook g-signin2" href="#"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/google.png" /></a></li>
                    </ul>
                    <p>or sign in into your Atrum account using your email</p>
                  </div>
                  <div className="signup-form mt-0 mt-sm-4">
                    <div>
                      <input type="text" placeholder="Email Address" onChange={e => setemail(e.target.value)} />
                      <input type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />

                      <div className={`text-danger mb-3`}>{backendErr}</div>

                      <div className="text-center mt-4 mt-sm-5">
                        <input type="submit" defaultValue="Login" onClick={loginAPI} />
                        <p className="mt-4 mt-sm-0">Don't have an account, yet? <Link to="/signup">Signup here</Link></p>
                        <p>Forgot Password ? <Link to="/forgot/password">Reset here</Link></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="sigin-sideimg">
                  <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/login-img.png" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


function mapStateToProps(state, props) {
  return {
    showLogin: true,
    state: state
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    login,
    _post,
    _list,
    _otp
  }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

