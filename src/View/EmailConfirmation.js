import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { _post, _list, _put } from "../Store/action/crud";
import { logout, logoutRedirect, setProfile, setToken } from "../Utils/token";
import queryString from 'query-string';
import { Link } from "react-router-dom";

const EmailConfirmation = (props) => {


  const [confirm, setconfirm] = useState(false);
  const propsQuery = queryString.parse(props.location.search);

  useEffect(() => {

    props._put(`users/${propsQuery.verify}`, {
      id: atob(propsQuery.verify),
      status: 1,
    }, res => {
      setconfirm(true);
    }, err => {

    })
  }, [])


  return (
    <>

      <section className="signup-sec withlogin">
        <div className="container-fluid">
          <div className="signup-box">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="signup-text">
                  <div className="signup-head">
                    <Link to={'/'}>
                      <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/atrum-logo-old.png" className="img-fluid" />
                    </Link>

                    <h3 className="mt-5 mobconfirmmsgtxt">{confirm ? `Your Email has been successfully Confirm Now` : `Your Email Not-Confirm Now`}</h3>

                    <p>Sign in your Atrum account using your<br />registered email</p>

                    <p className="mt-4 mt-sm-0"><Link to="/login" className="linktoconfirm">Sign In</Link></p>
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
    _put
  }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailConfirmation);