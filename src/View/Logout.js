import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { _post, _list,_put } from "../Store/action/crud";
import { logout, logoutRedirect } from "../Utils/token";

const SavedCard = (props) => {

    useEffect(()=>{
        setTimeout(() => {
            logoutRedirect(props); 
        }, 1200);
        
    },[])
    
    
    return (
        <>
          Logging out.....
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