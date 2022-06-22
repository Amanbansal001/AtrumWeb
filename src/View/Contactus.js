import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { getProfile } from "../Utils/token";

const Contactus = (props) => {

    const profile = getProfile();

    const [userId, setuserId] = useState();
    const [from, setfrom] = useState();
    const [category, setcategory] = useState();
    const [message, setmessage] = useState();
    const [contactCategory, setcontactCategory] = useState();
    const [submitted, setsubmitted] = useState(false);
    const [backendErr, setbackendErr] = useState(``);
    const [disabled, setdisabled] = useState(false)

    useEffect(() => {
        fetchContactCategory();
        if (profile) {
            setfrom(profile.email)
            setdisabled(true)
        }
    }, [])

    const sendMessage = (e) => {

        e.preventDefault();
        
        if (!from || !category || !message) {
            setbackendErr(`Please complete form to continue`);
            return;
        }

        props._post(`contactUs`, {
            userId: userId,
            from: from,
            category: category,
            message: message
        }, res => {
            setsubmitted(true)
        })


    }

    const fetchContactCategory = () => {

        props._list('contactUsCategory', ``, res => {
            setcontactCategory(res.data.fetch);
        })
    }

    return (
        <>
            <AtrumLayout {...props}>
                {submitted ?
                    <h1 className="message-sec text-center">
                        Response has been submitted
                    </h1>
                    :
                    <section className="message-sec">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="message-box">
                                        <h3 className="text-center main-head">SEND ATRUM A MESSAGE</h3>
                                        <p className="sub-head text-center mt-3">Please connect with our Art Experts and Support Specialists for any query or concern.
                                            <br />We'd be happy to help.</p>
                                        <div className="row mt-5">
                                            <div className="col-md-10 offset-md-1">
                                                <div>
                                                    <div className="row form-group">
                                                        <div className="col-md-3">
                                                            <label>From:</label>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input type="text" placeholder="Your email" className="form-control" value={from} disabled={disabled} onChange={e => setfrom(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-md-3">
                                                            <label>Category:</label>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <select className="form-control" onChange={e => setcategory(e.target.value)}>
                                                                <option value="">Select A Category</option>
                                                                {contactCategory && contactCategory.length > 0 ? contactCategory.map((data, idx) => {
                                                                    return (
                                                                        <option value={data.categoryName}>{data.categoryName}</option>
                                                                    )
                                                                }) : null}

                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-md-12">
                                                            <label>Your Message*:</label>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <textarea className="form-control" placeholder='' maxLength={400} onChange={e => setmessage(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className={`row`}>
                                                        <div className={`col-md-12 text-danger text-center mb-3`}>{backendErr}</div>
                                                    </div>
                                                    <div className={`row`}>
                                                        <div className="col-md-4 text-left">
                                                            <button class="g-recaptcha btn-black"
                                                                data-sitekey="6LfhwgAeAAAAAN61obfmj54G8Ui1Ej2ywM4CO4fA"
                                                                data-callback='onSubmit'
                                                                data-action='submit' onClick={sendMessage}>Submit</button>
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
                }
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
)(Contactus);