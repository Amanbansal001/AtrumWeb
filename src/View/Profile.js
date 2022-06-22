import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list, _put } from "../Store/action/crud";
import { getProfile } from "../Utils/token";
import validator from 'validator'

const initialState = {
    saveText: `Save Changes`,
    saveTextUpdate: `Saved`,
    saveTextPwd: `Change Password`,
    saveTextPwdUpdate: `Saved`
}

const SavedCard = (props) => {

    const [fname, setfname] = useState();
    const [lname, setlname] = useState();
    const [email, setemail] = useState();
    const [mobile, setmobile] = useState();
    const [saveText, setsaveText] = useState(initialState.saveText);
    const [saveTextPwd, setsaveTextPwd] = useState(initialState.saveTextPwd);

    const [password, setpassword] = useState(``);
    const [cpassword, setcpassword] = useState(``);

    const [backendErr, setbackendErr] = useState(``);
    const [backendErrPwd, setbackendErrPwd] = useState(``);

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = () => {
        props._list(`users/${getProfile().id}?status=1`, ``, res => {
            
            const fullname = res.data.fetch.name.split(" ");
            setemail(res.data.fetch.email);
            if(res.data.fetch.phone && res.data.fetch.phone>0){
                setmobile(res.data.fetch.phone);
            }
            setfname(fullname[0]);
            if (fullname.length > 1) {
                setlname(fullname[1])
            }else{
                setlname(``);
            }
        })
    }

    const updateUser = (event) => {
        event.preventDefault();
        props._put(`users/${getProfile().id}`, {
            email: email,
            phone: mobile,
            name: fname + " " + lname,
            id: getProfile().id
        }, res => {
            alert(`Profile saved`);
            setsaveText(initialState.saveTextUpdate);
            fetchUser();
        })
    }

    const updatePassword = (event) => {
        event.preventDefault();
        setbackendErrPwd(``)
        if(password!==cpassword){
            setbackendErrPwd(`New Password & Confirm Password must be same`);
            return;
        }

        if(!password){
            setbackendErrPwd(`New Password cannot be empty`);
            return;
        }

        props._put(`users/${getProfile().id}`, {
            password:password,
            id: getProfile().id
        }, res => {
            alert(`Profile saved`);
            setpassword(``)
            setcpassword(``);
            setsaveTextPwd(initialState.saveTextPwdUpdate);
            fetchUser();
        })
    }

    return (
        <>
            <AtrumLayout {...props}>
                <section className="checkout-headsec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head d-none d-sm-block">My Profile</h3>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="checkout-sec">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 d-none d-sm-block">
                                <div className="filter">
                                    <div className="filter-box">
                                        <ul className="filter-list">
                                            <li><Link to="/dashboard">Dashboard</Link></li>
                                            <li className={`active`}><Link to="/profile">My Profile</Link></li>
                                           
                                            <li><Link to="/saved/address">My Address</Link></li>
                                           
                                            <li><Link to="/wishlist">My Wishlist</Link></li>
                                            <li><Link to="/order/history">My Order History</Link></li>
                                            <li><Link to="/bid/history">My Bid History</Link></li>
                                            <li><Link to="/logout"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/logout.png" style={{ marginRight: "10px" }} /> Sign out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="checkout-box profile-min-heightmob">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="main-head d-none d-sm-block">My Profile</h3>
                                            <div className="checkout-formbox">
                                                <form onSubmit={updateUser}>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <label>First Name:</label>
                                                        </div>
                                                        <div className="col-md-4 form-group">
                                                            <input type="text" placeholder className="form-control" pattern="[A-Za-z]+" maxLength={50} value={fname} onChange={(e) => setfname(e.target.value)} required/>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Last Name:</label>
                                                        </div>
                                                        <div className="col-md-4 form-group">
                                                            <input type="text" placeholder className="form-control" pattern="[A-Za-z]+" maxLength={50} value={lname} onChange={(e) => setlname(e.target.value)} required/>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <label>Mobile:</label>
                                                        </div>
                                                        <div className="col-md-4 form-group">
                                                            <input type="text" placeholder className="form-control" pattern="[7-9]{1}[0-9]{9}" title="Phone number with 7-9 and remaing 9 digit with 0-9" value={mobile} disabled/>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Email:</label>
                                                        </div>
                                                        <div className="col-md-4 form-group">
                                                            <input type="email" placeholder className="form-control" maxLength={100} value={email} disabled/>
                                                        </div>
                                                    </div>
                                                    <div className={`text-danger text-center mb-3`}>{backendErr}</div>
                                                    <div className="row">
                                                        <div className="col-md-2"></div>
                                                        <div className="col-md-4">
                                                            <div className="row">

                                                                <div className="col-md-12">
                                                                    <button type="submit" className="btn-black hover">{saveText}</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="checkout-formbox">
                                                <form onSubmit={updatePassword}>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <label>New Password:</label>
                                                        </div>
                                                        <div className="col-md-4 form-group">
                                                            <input type="password" placeholder className="form-control" maxLength={50} value={password} onChange={(e) => setpassword(e.target.value)} />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Confirm Password:</label>
                                                        </div>
                                                        <div className="col-md-4 form-group">
                                                            <input type="password" placeholder className="form-control" maxLength={50} value={cpassword} onChange={(e) => setcpassword(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div className={`text-danger text-center mb-3`}>{backendErrPwd}</div>
                                                    <div className="row">
                                                        <div className="col-md-2"></div>
                                                        <div className="col-md-4">
                                                            <div className="row">

                                                                <div className="col-md-12">
                                                                    <button className="btn-black hover">{saveTextPwd}</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
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
        _put
    }, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SavedCard);