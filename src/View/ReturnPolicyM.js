import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

const ReturnPolicyM = (props) => {

    const [content,setcontent]=useState(``)

    useEffect(()=>{
        props._list('content', ``, res => {
            setcontent(res.data.fetch.find(e => e.type === "RP").content)
        })
    },[])

    return (
        <>
             <section className="leagal-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="leagal-box">
                                    <h3 className="main-head text-center">RETURN POLICY</h3>
                                    <div dangerouslySetInnerHTML={{__html: content}}></div>
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
)(ReturnPolicyM);