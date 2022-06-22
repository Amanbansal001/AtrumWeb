import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { _post, _list, _put } from "../Store/action/crud";
import { logout, logoutRedirect, setProfile, setToken } from "../Utils/token";
import queryString from 'query-string';

const WebView = (props) => {

    const propsQuery = queryString.parse(props.location.search);

    useEffect(() => {

        props._post(`auth/login`, {
            email: propsQuery.email,
            password: propsQuery.password
        }, res => {
            if (res.data.auth.roleType == "USER" || res.data.auth.roleType == "User") {
                setToken(res.data.auth.token);
                setProfile(res.data.auth);
                setTimeout(() => {
                    props.history.push(`/`);
                }, 0);
            } else {
                props.history.push(`/`);
            }
        }, err => {
            props.history.push(`/`);
        })
    }, [])


    return (
        <>
            Logging in ...
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
)(WebView);